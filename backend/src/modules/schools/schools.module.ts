import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { School } from './entities/school.entity';
import { User } from '@/modules/users/entities/user.entity';
import { UserSchoolRole } from '../../modules/users/entities/user-school-role.entity';
import { Role } from '../../modules/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, User, UserSchoolRole, Role])],
  controllers: [SchoolsController],
  providers: [SchoolsService],
  exports: [SchoolsService],
})
export class SchoolsModule {}