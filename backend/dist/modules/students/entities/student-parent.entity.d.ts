import { BaseEntity } from '../../../common/entities/base.entity';
import { Student } from './student.entity';
import { User } from '../../users/entities/user.entity';
export declare class StudentParent extends BaseEntity {
    studentId: string;
    parentId: string;
    relationshipType: string;
    isPrimaryContact: boolean;
    isEmergencyContact: boolean;
    canPickup: boolean;
    student: Student;
    parent: User;
}
