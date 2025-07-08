import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * Crée les rôles par défaut pour une école donnée.
   * @param schoolId L'identifiant de l'école
   * @returns La liste des rôles créés
   */
  async createDefaultRolesForSchool(schoolId: string): Promise<Role[]> {
    const defaultRoles = [
      { name: 'admin', description: 'Administrateur de l\'école' },
      { name: 'director', description: 'Directeur de l\'école' },
      { name: 'teacher', description: 'Enseignant' },
      { name: 'student', description: 'Élève' },
      { name: 'parent', description: 'Parent d\'élève' },
      { name: 'accountant', description: 'Comptable' },
      { name: 'staff', description: 'Personnel' },
    ];

    // On vérifie les rôles déjà existants pour cette école
    const existingRoles = await this.roleRepository.find({ where: { schoolId } });
    const existingNames = existingRoles.map(r => r.name);

    const rolesToCreate = defaultRoles.filter(role => !existingNames.includes(role.name));
    const newRoles = rolesToCreate.map(role => {
      const entity = this.roleRepository.create({
        ...role,
        schoolId,
        isSystemRole: false,
        isActive: true,
      });
      return entity;
    });

    if (newRoles.length > 0) {
      await this.roleRepository.save(newRoles);
    }

    // Retourne tous les rôles de l'école (anciens + nouveaux)
    return this.roleRepository.find({ where: { schoolId } });
  }
} 