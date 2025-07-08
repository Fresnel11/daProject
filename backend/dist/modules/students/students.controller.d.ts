import { StudentsService } from './students.service';
import { School } from '../../modules/schools/entities/school.entity';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(school: School): Promise<import("./entities/student.entity").Student[]>;
}
