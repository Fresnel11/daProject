import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { StudentParent } from './entities/student-parent.entity';
import { User } from '@/modules/users/entities/user.entity';
import { School } from '../../modules/schools/entities/school.entity';
import { UserSchoolRole } from '../../modules/users/entities/user-school-role.entity';
import { RolePermission } from '../../modules/roles/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentParent, User, School, UserSchoolRole, RolePermission])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}