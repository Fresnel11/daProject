import {
  IsString,
  IsEmail,
  IsOptional,
  IsUrl,
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolType } from '../../../common/enums/school-type.enum';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Springfield Elementary School' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'school@springfield.edu' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123 School Street' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Springfield' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'USA' })
  @IsString()
  country: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  postalCode: string;

  @ApiProperty({ example: 'https://springfield.edu', required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: 'A leading educational institution', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 'REG123456', required: false })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty({ example: 'TAX789012', required: false })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  directorFirstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  directorLastName: string;

  @ApiProperty({ example: 'director@springfield.edu' })
  @IsEmail()
  directorEmail: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  directorPhone: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @MinLength(8)
  directorPassword: string;

  @IsEnum(SchoolType)
  schoolType: SchoolType;

  @IsString()
  @IsNotEmpty()
  estimatedEnrollment: string;
}