import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';
import { School } from '../../schools/entities/school.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('user_school_roles')
@Index(['userId', 'schoolId'], { unique: true })
export class UserSchoolRole extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'school_id' })
  schoolId: string;

  @Column({ name: 'role_id' })
  roleId: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'is_validated', default: false })
  isValidated: boolean;

  @Column({ name: 'invited_by', nullable: true })
  invitedBy?: string;

  @Column({ name: 'invitation_token', nullable: true })
  invitationToken?: string;

  @Column({ name: 'invitation_expires', type: 'timestamp', nullable: true })
  invitationExpires?: Date;

  @Column({ name: 'joined_at', type: 'timestamp', nullable: true })
  joinedAt?: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.schoolRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => School, (school) => school.userRoles)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @ManyToOne(() => Role, (role) => role.userSchoolRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'invited_by' })
  invitedByUser?: User;
}