import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { School } from '../schools/entities/school.entity';
import { UserSchoolRole } from '../users/entities/user-school-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission, Permission, School, UserSchoolRole])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, TypeOrmModule],
})
export class RolesModule {}