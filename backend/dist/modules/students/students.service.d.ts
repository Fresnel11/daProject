import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
export declare class StudentsService {
    private studentRepository;
    constructor(studentRepository: Repository<Student>);
    findBySchool(schoolId: string): Promise<Student[]>;
}
