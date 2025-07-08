import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { UserSchoolRole } from './entities/user-school-role.entity';
import { Role } from '../../modules/roles/entities/role.entity';
import { School } from '../../modules/schools/entities/school.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserSchoolRoleDto } from './dto/update-user-school-role.dto';
import { SchoolStatus } from '../../common/enums/school-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSchoolRole)
    private userSchoolRoleRepository: Repository<UserSchoolRole>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async createUser(createUserDto: CreateUserDto, schoolId: string, createdBy: string) {
    // Check if school exists and is validated
    const school = await this.schoolRepository.findOne({
      where: { id: schoolId, status: SchoolStatus.VALIDATED },
    });

    if (!school) {
      throw new NotFoundException('School not found or not validated');
    }

    // Check if role exists in this school
    const role = await this.roleRepository.findOne({
      where: { id: createUserDto.roleId, schoolId },
    });

    if (!role) {
      throw new NotFoundException('Role not found in this school');
    }

    let user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    // Create user if doesn't exist
    if (!user) {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      
      user = this.userRepository.create({
        email: createUserDto.email,
        passwordHash,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        type: createUserDto.type,
        phone: createUserDto.phone,
        dateOfBirth: createUserDto.dateOfBirth,
        isEmailVerified: false,
      });

      user = await this.userRepository.save(user);
    }

    // Check if user already has a role in this school
    const existingRole = await this.userSchoolRoleRepository.findOne({
      where: { userId: user.id, schoolId },
    });

    if (existingRole) {
      throw new ConflictException('User already has a role in this school');
    }

    // Create user-school-role relationship
    const userSchoolRole = this.userSchoolRoleRepository.create({
      userId: user.id,
      schoolId,
      roleId: createUserDto.roleId,
      isActive: true,
      isValidated: true,
      invitedBy: createdBy,
      joinedAt: new Date(),
    });

    await this.userSchoolRoleRepository.save(userSchoolRole);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: user.type,
      role: role.name,
    };
  }

  async inviteUser(inviteUserDto: InviteUserDto, schoolId: string, invitedBy: string) {
    // Check if school exists and is validated
    const school = await this.schoolRepository.findOne({
      where: { id: schoolId, status: SchoolStatus.VALIDATED },
    });

    if (!school) {
      throw new NotFoundException('School not found or not validated');
    }

    // Check if role exists in this school
    const role = await this.roleRepository.findOne({
      where: { id: inviteUserDto.roleId, schoolId },
    });

    if (!role) {
      throw new NotFoundException('Role not found in this school');
    }

    let user = await this.userRepository.findOne({
      where: { email: inviteUserDto.email },
    });

    // Create user if doesn't exist
    if (!user) {
      user = this.userRepository.create({
        email: inviteUserDto.email,
        passwordHash: '', // Will be set when user accepts invitation
        firstName: inviteUserDto.firstName,
        lastName: inviteUserDto.lastName,
        type: inviteUserDto.type,
        phone: inviteUserDto.phone,
        isEmailVerified: false,
        isActive: false, // Will be activated when invitation is accepted
      });

      user = await this.userRepository.save(user);
    }

    // Check if user already has a role in this school
    const existingRole = await this.userSchoolRoleRepository.findOne({
      where: { userId: user.id, schoolId },
    });

    if (existingRole) {
      throw new ConflictException('User already has a role in this school');
    }

    // Generate invitation token
    const invitationToken = uuidv4();
    const invitationExpires = new Date();
    invitationExpires.setDate(invitationExpires.getDate() + 7); // 7 days from now

    // Create user-school-role relationship (not validated yet)
    const userSchoolRole = this.userSchoolRoleRepository.create({
      userId: user.id,
      schoolId,
      roleId: inviteUserDto.roleId,
      isActive: false,
      isValidated: false,
      invitedBy,
      invitationToken,
      invitationExpires,
    });

    await this.userSchoolRoleRepository.save(userSchoolRole);

    // TODO: Send invitation email
    // await this.emailService.sendInvitation(user.email, invitationToken, school.name);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: user.type,
      role: role.name,
      invitationToken,
      message: 'Invitation sent successfully',
    };
  }

  async updateUserSchoolRole(
    userId: string,
    schoolId: string,
    updateDto: UpdateUserSchoolRoleDto,
  ) {
    const userSchoolRole = await this.userSchoolRoleRepository.findOne({
      where: { userId, schoolId },
      relations: ['user', 'role', 'school'],
    });

    if (!userSchoolRole) {
      throw new NotFoundException('User role not found in this school');
    }

    // Update role if provided
    if (updateDto.roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: updateDto.roleId, schoolId },
      });

      if (!role) {
        throw new NotFoundException('Role not found in this school');
      }

      userSchoolRole.roleId = updateDto.roleId;
    }

    // Update status if provided
    if (updateDto.isActive !== undefined) {
      userSchoolRole.isActive = updateDto.isActive;
    }

    if (updateDto.isValidated !== undefined) {
      userSchoolRole.isValidated = updateDto.isValidated;
    }

    await this.userSchoolRoleRepository.save(userSchoolRole);

    return {
      userId: userSchoolRole.userId,
      schoolId: userSchoolRole.schoolId,
      roleId: userSchoolRole.roleId,
      isActive: userSchoolRole.isActive,
      isValidated: userSchoolRole.isValidated,
    };
  }

  async getUsersInSchool(schoolId: string) {
    return this.userSchoolRoleRepository.find({
      where: { schoolId },
      relations: ['user', 'role'],
      order: { createdAt: 'DESC' },
    });
  }

  async removeUserFromSchool(userId: string, schoolId: string) {
    const userSchoolRole = await this.userSchoolRoleRepository.findOne({
      where: { userId, schoolId },
    });

    if (!userSchoolRole) {
      throw new NotFoundException('User role not found in this school');
    }

    await this.userSchoolRoleRepository.remove(userSchoolRole);

    return { message: 'User removed from school successfully' };
  }
}