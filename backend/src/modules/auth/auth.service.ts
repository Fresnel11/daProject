import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/modules/users/entities/user.entity';
import { UserSchoolRole } from '../../modules/users/entities/user-school-role.entity';
import { School } from '../../modules/schools/entities/school.entity';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSchoolRole)
    private userSchoolRoleRepository: Repository<UserSchoolRole>,
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user's accessible schools
    const userSchoolRoles = await this.userSchoolRoleRepository.find({
      where: {
        userId: user.id,
        isActive: true,
        isValidated: true,
      },
      relations: ['school', 'role'],
    });

    const accessibleSchools = userSchoolRoles
      .filter((usr) => usr.school.status === 'validated')
      .map((usr) => ({
        id: usr.school.id,
        name: usr.school.name,
        role: {
          id: usr.role.id,
          name: usr.role.name,
        },
      }));

    // Update last login
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      type: user.type,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        profilePictureUrl: user.profilePictureUrl,
      },
      accessibleSchools,
    };
  }

  async selectSchool(userId: string, schoolId: string) {
    const userSchoolRole = await this.userSchoolRoleRepository.findOne({
      where: {
        userId,
        schoolId,
        isActive: true,
        isValidated: true,
      },
      relations: ['school', 'role'],
    });

    if (!userSchoolRole || userSchoolRole.school.status !== 'validated') {
      throw new BadRequestException('Invalid school selection');
    }

    return {
      school: {
        id: userSchoolRole.school.id,
        name: userSchoolRole.school.name,
        logoUrl: userSchoolRole.school.logoUrl,
      },
      role: {
        id: userSchoolRole.role.id,
        name: userSchoolRole.role.name,
      },
    };
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id, isActive: true },
    });
  }
}