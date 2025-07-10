import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { ValidateSchoolDto } from './dto/validate-school.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';

@ApiTags('Schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new school' })
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  // Les routes de vérification sont publiques (pas de guard)
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    if (!email) return { exists: false };
    const exists = await this.schoolsService.checkEmailExists(email);
    return { exists };
  }

  @Get('check-phone')
  async checkPhone(@Query('phone') phone: string) {
    if (!phone) return { exists: false };
    const exists = await this.schoolsService.checkPhoneExists(phone);
    return { exists };
  }

  @Get('check-website')
  async checkWebsite(@Query('website') website: string) {
    if (!website) return { exists: false };
    const exists = await this.schoolsService.checkWebsiteExists(website);
    return { exists };
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pending schools for validation (admin only)' })
  findPending() {
    return this.schoolsService.findPendingSchools();
  }

  @Patch(':id/validate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate or reject a school (admin only)' })
  validateSchool(
    @Param('id') id: string,
    @Body() validateSchoolDto: ValidateSchoolDto,
    @CurrentUser() user: User,
  ) {
    return this.schoolsService.validateSchool(id, validateSchoolDto, user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get school by ID' })
  findOne(@Param('id') id: string) {
    return this.schoolsService.findById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all schools (admin only)' })
  findAll() {
    return this.schoolsService.findAll();
  }
}