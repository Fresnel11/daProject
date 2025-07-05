import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateSchoolDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  approved: boolean;

  @ApiProperty({ 
    example: 'Missing required documentation', 
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  rejectionReason?: string;
}