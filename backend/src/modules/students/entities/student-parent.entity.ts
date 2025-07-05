import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Student } from './student.entity';
import { User } from '../../users/entities/user.entity';

@Entity('student_parents')
@Index(['studentId', 'parentId'], { unique: true })
export class StudentParent extends BaseEntity {
  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'parent_id' })
  parentId: string;

  @Column({ name: 'relationship_type' })
  relationshipType: string; // 'father', 'mother', 'guardian', etc.

  @Column({ name: 'is_primary_contact', default: false })
  isPrimaryContact: boolean;

  @Column({ name: 'is_emergency_contact', default: false })
  isEmergencyContact: boolean;

  @Column({ name: 'can_pickup', default: true })
  canPickup: boolean;

  // Relations
  @ManyToOne(() => Student, (student) => student.parentRelations)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => User, (user) => user.studentRelations)
  @JoinColumn({ name: 'parent_id' })
  parent: User;
}