import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@/config/database.config';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { SchoolsModule } from '@/modules/schools/schools.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { PermissionsModule } from '@/modules/permissions/permissions.module';
import { StudentsModule } from '@/modules/students/students.module';
import { ParentsModule } from '@/modules/parents/parents.module';
import { TeachersModule } from '@/modules/teachers/teachers.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UsersModule,
    SchoolsModule,
    RolesModule,
    PermissionsModule,
    StudentsModule,
    ParentsModule,
    TeachersModule,
    NotificationsModule,
  ],
})
export class AppModule {}