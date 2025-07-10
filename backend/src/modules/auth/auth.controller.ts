import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SelectSchoolDto } from './dto/select-school.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('select-school')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Select active school' })
  async selectSchool(
    @CurrentUser() user: User,
    @Body() selectSchoolDto: SelectSchoolDto,
  ) {
    return this.authService.selectSchool(user.id, selectSchoolDto.schoolId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: user.type,
      profilePictureUrl: user.profilePictureUrl,
      isEmailVerified: user.isEmailVerified,
    };
  }

  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    if (!email) {
      return { exists: false };
    }
    const user = await this.userRepository.findOne({ where: { email } });
    return { exists: !!user };
  }

  @Get('check-director-phone')
  async checkDirectorPhone(@Query('phone') phone: string) {
    if (!phone) return { exists: false };
    const user = await this.userRepository.findOne({ where: { phone } });
    return { exists: !!user };
  }
}