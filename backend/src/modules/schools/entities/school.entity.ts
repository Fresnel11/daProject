import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SchoolStatus } from '../../../common/enums/school-status.enum';
import { UserSchoolRole } from '../../users/entities/user-school-role.entity';
import { Role } from '../../roles/entities/role.entity';
import { Student } from '../../students/entities/student.entity';
import { SchoolType } from '../../../common/enums/school-type.enum';

@Entity('schools')
// @Index(['email'], { unique: true })
export class School extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl?: string;

  @Column({ type: 'enum', enum: SchoolStatus, default: SchoolStatus.PENDING })
  status: SchoolStatus;

  @Column({ name: 'registration_number', nullable: true })
  registrationNumber?: string;

  @Column({ name: 'tax_number', nullable: true })
  taxNumber?: string;

  @Column({ name: 'director_first_name' })
  directorFirstName: string;

  @Column({ name: 'director_last_name' })
  directorLastName: string;

  @Column({ name: 'director_email' })
  directorEmail: string;

  @Column({ name: 'director_phone' })
  directorPhone: string;

  @Column({ name: 'validated_at', type: 'timestamp', nullable: true })
  validatedAt?: Date;

  @Column({ name: 'validated_by', nullable: true })
  validatedBy?: string;

  @Column({ name: 'rejection_reason', nullable: true })
  rejectionReason?: string;

  @Column({ type: 'enum', enum: SchoolType })
  schoolType: SchoolType;

  @Column()
  estimatedEnrollment: string;

  // Relations
  @OneToMany(() => UserSchoolRole, (userSchoolRole) => userSchoolRole.school)
  userRoles: UserSchoolRole[];

  @OneToMany(() => Role, (role) => role.school)
  roles: Role[];

  @OneToMany(() => Student, (student) => student.school)
  students: Student[];

  // Computed properties
  get directorFullName(): string {
    return `${this.directorFirstName} ${this.directorLastName}`;
  }
}