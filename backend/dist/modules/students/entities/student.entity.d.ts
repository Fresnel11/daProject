import { BaseEntity } from '../../../common/entities/base.entity';
import { School } from '../../schools/entities/school.entity';
import { StudentParent } from './student-parent.entity';
export declare class Student extends BaseEntity {
    studentId: string;
    schoolId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    classLevel?: string;
    section?: string;
    enrollmentDate: Date;
    isActive: boolean;
    notes?: string;
    school: School;
    parentRelations: StudentParent[];
    get fullName(): string;
}
