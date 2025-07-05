import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserSchoolRole } from './entities/user-school-role.entity';
import { Role } from '../../modules/roles/entities/role.entity';
import { School } from '@/modules/schools/entities/school.entity';
import { RolePermission } from '../../modules/roles/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSchoolRole, Role, School, RolePermission])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}