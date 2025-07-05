import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { School } from '../../schools/entities/school.entity';
import { StudentParent } from './student-parent.entity';

@Entity('students')
@Index(['studentId', 'schoolId'], { unique: true })
export class Student extends BaseEntity {
  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'school_id' })
  schoolId: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column({ name: 'class_level', nullable: true })
  classLevel?: string;

  @Column({ nullable: true })
  section?: string;

  @Column({ name: 'enrollment_date', type: 'date' })
  enrollmentDate: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ nullable: true })
  notes?: string;

  // Relations
  @ManyToOne(() => School, (school) => school.students)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToMany(() => StudentParent, (studentParent) => studentParent.student)
  parentRelations: StudentParent[];

  // Computed properties
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}