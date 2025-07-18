import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';

@Module({
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}