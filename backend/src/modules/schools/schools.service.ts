import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { School } from './entities/school.entity';
import { User } from '../users/entities/user.entity';
import { UserSchoolRole } from '../users/entities/user-school-role.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { ValidateSchoolDto } from './dto/validate-school.dto';
import { UserType } from '../../common/enums/user-type.enum';
import { SchoolStatus } from '../../common/enums/school-status.enum';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSchoolRole)
    private userSchoolRoleRepository: Repository<UserSchoolRole>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    // Check if school email already exists
    const existingSchool = await this.schoolRepository.findOne({
      where: { email: createSchoolDto.email },
    });

    if (existingSchool) {
      throw new ConflictException('School with this email already exists');
    }

    // Check if director email already exists as a school director
    const existingDirector = await this.schoolRepository.findOne({
      where: { directorEmail: createSchoolDto.directorEmail },
    });

    if (existingDirector) {
      throw new ConflictException('This email is already registered as a director');
    }

    // Create school
    const school = this.schoolRepository.create({
      ...createSchoolDto,
      status: SchoolStatus.PENDING,
    });

    const savedSchool = await this.schoolRepository.save(school);

    // Check if user already exists
    let directorUser = await this.userRepository.findOne({
      where: { email: createSchoolDto.directorEmail },
    });

    // Create user if doesn't exist
    if (!directorUser) {
      const passwordHash = await bcrypt.hash(createSchoolDto.directorPassword, 10);
      
      directorUser = this.userRepository.create({
        email: createSchoolDto.directorEmail,
        passwordHash,
        firstName: createSchoolDto.directorFirstName,
        lastName: createSchoolDto.directorLastName,
        type: UserType.ADMIN,
        phone: createSchoolDto.directorPhone,
        isEmailVerified: false, // Will be verified during school validation
      });

      directorUser = await this.userRepository.save(directorUser);
    }

    // Create default director role
    const directorRole = this.roleRepository.create({
      name: 'Director',
      description: 'School Director with full access',
      schoolId: savedSchool.id,
      isSystemRole: true,
    });

    const savedRole = await this.roleRepository.save(directorRole);

    // Create user-school-role relationship (not validated yet)
    const userSchoolRole = this.userSchoolRoleRepository.create({
      userId: directorUser.id,
      schoolId: savedSchool.id,
      roleId: savedRole.id,
      isActive: false, // Will be activated upon school validation
      isValidated: false,
    });

    await this.userSchoolRoleRepository.save(userSchoolRole);

    return {
      id: savedSchool.id,
      name: savedSchool.name,
      email: savedSchool.email,
      status: savedSchool.status,
      message: 'School registration submitted for validation',
    };
  }

  async validateSchool(schoolId: string, validateSchoolDto: ValidateSchoolDto, validatedBy: string) {
    const school = await this.schoolRepository.findOne({
      where: { id: schoolId },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    if (school.status !== SchoolStatus.PENDING) {
      throw new ConflictException('School is not in pending status');
    }

    if (validateSchoolDto.approved) {
      // Approve school
      school.status = SchoolStatus.VALIDATED;
      school.validatedAt = new Date();
      school.validatedBy = validatedBy;

      // Activate and validate director role
      await this.userSchoolRoleRepository.update(
        { schoolId: school.id },
        { isActive: true, isValidated: true, joinedAt: new Date() }
      );

      // Mark director's email as verified
      const directorUser = await this.userRepository.findOne({
        where: { email: school.directorEmail },
      });

      if (directorUser) {
        await this.userRepository.update(directorUser.id, {
          isEmailVerified: true,
        });
      }

    } else {
      // Reject school
      school.status = SchoolStatus.REJECTED;
      school.rejectionReason = validateSchoolDto.rejectionReason;
    }

    await this.schoolRepository.save(school);

    return {
      id: school.id,
      name: school.name,
      status: school.status,
      message: validateSchoolDto.approved 
        ? 'School validated successfully' 
        : 'School rejected',
    };
  }

  async findPendingSchools() {
    return this.schoolRepository.find({
      where: { status: SchoolStatus.PENDING },
      order: { createdAt: 'ASC' },
    });
  }

  async findById(id: string) {
    const school = await this.schoolRepository.findOne({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return school;
  }

  async findAll() {
    return this.schoolRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}