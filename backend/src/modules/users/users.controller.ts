import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserSchoolRoleDto } from './dto/update-user-school-role.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { SchoolAccessGuard } from '@/common/guards/school-access.guard';
import { PermissionsGuard } from '@/common/guards/permissions.guard';
import { RequirePermissions } from '@/common/decorators/permissions.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CurrentSchool } from '@/common/decorators/current-school.decorator';
import { User } from './entities/user.entity';
import { School } from '@/modules/schools/entities/school.entity';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, SchoolAccessGuard)
@ApiBearerAuth()
@ApiSecurity('school-id')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermissions('manage_users')
  @ApiOperation({ summary: 'Create a new user in the school' })
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentSchool() school: School,
    @CurrentUser() user: User,
  ) {
    return this.usersService.createUser(createUserDto, school.id, user.id);
  }

  @Post('invite')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('invite_users')
  @ApiOperation({ summary: 'Invite a user to the school' })
  invite(
    @Body() inviteUserDto: InviteUserDto,
    @CurrentSchool() school: School,
    @CurrentUser() user: User,
  ) {
    return this.usersService.inviteUser(inviteUserDto, school.id, user.id);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @RequirePermissions('view_users')
  @ApiOperation({ summary: 'Get all users in the school' })
  findAll(@CurrentSchool() school: School) {
    return this.usersService.getUsersInSchool(school.id);
  }

  @Patch(':userId/role')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('manage_users')
  @ApiOperation({ summary: 'Update user role in the school' })
  updateRole(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateUserSchoolRoleDto,
    @CurrentSchool() school: School,
  ) {
    return this.usersService.updateUserSchoolRole(userId, school.id, updateDto);
  }

  @Delete(':userId')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('manage_users')
  @ApiOperation({ summary: 'Remove user from the school' })
  remove(
    @Param('userId') userId: string,
    @CurrentSchool() school: School,
  ) {
    return this.usersService.removeUserFromSchool(userId, school.id);
  }
}