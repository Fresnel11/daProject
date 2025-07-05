import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findBySchool(schoolId: string) {
    return this.studentRepository.find({
      where: { schoolId, isActive: true },
      relations: ['parentRelations', 'parentRelations.parent'],
      order: { firstName: 'ASC', lastName: 'ASC' },
    });
  }
}