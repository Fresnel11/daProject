import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchoolRole } from '../../modules/users/entities/user-school-role.entity';
import { School } from '../../modules/schools/entities/school.entity';
import { SchoolStatus } from '../enums/school-status.enum';

@Injectable()
export class SchoolAccessGuard implements CanActivate {
  constructor(
    @InjectRepository(UserSchoolRole)
    private userSchoolRoleRepository: Repository<UserSchoolRole>,
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const schoolId = request.headers['x-school-id'] || request.body?.schoolId;

    if (!schoolId) {
      throw new BadRequestException('School ID is required');
    }

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Check if school exists and is validated
    const school = await this.schoolRepository.findOne({
      where: { id: schoolId, status: SchoolStatus.VALIDATED },
    });

    if (!school) {
      throw new UnauthorizedException('School not found or not validated');
    }

    // Check if user has active and validated role in this school
    const userSchoolRole = await this.userSchoolRoleRepository.findOne({
      where: {
        userId: user.id,
        schoolId: schoolId,
        isActive: true,
        isValidated: true,
      },
      relations: ['role'],
    });

    if (!userSchoolRole) {
      throw new UnauthorizedException(
        'User does not have access to this school',
      );
    }

    // Add school and role to request for later use
    request.school = school;
    request.userSchoolRole = userSchoolRole;

    return true;
  }
}