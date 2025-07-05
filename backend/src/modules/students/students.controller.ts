import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { SchoolAccessGuard } from '@/common/guards/school-access.guard';
import { PermissionsGuard } from '@/common/guards/permissions.guard';
import { RequirePermissions } from '@/common/decorators/permissions.decorator';
import { CurrentSchool } from '@/common/decorators/current-school.decorator';
import { School } from '@/modules/schools/entities/school.entity';

@ApiTags('Students')
@Controller('students')
@UseGuards(JwtAuthGuard, SchoolAccessGuard)
@ApiBearerAuth()
@ApiSecurity('school-id')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequirePermissions('view_students')
  @ApiOperation({ summary: 'Get all students in the school' })
  findAll(@CurrentSchool() school: School) {
    return this.studentsService.findBySchool(school.id);
  }
}