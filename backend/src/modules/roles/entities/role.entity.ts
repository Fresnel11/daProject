import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { School } from '@/modules/schools/entities/school.entity';
import { UserSchoolRole } from '../../../modules/users/entities/user-school-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity('roles')
@Index(['name', 'schoolId'], { unique: true })
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'school_id' })
  schoolId: string;

  @Column({ name: 'is_system_role', default: false })
  isSystemRole: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  // Relations
  @ManyToOne(() => School, (school) => school.roles)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToMany(() => UserSchoolRole, (userSchoolRole) => userSchoolRole.role)
  userSchoolRoles: UserSchoolRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}