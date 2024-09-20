import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { CourtController } from './controllers/court.controller';
import { CourtService } from './services/court.service';
import { EventsService } from './services/events.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import * as EntityEvent from './entities/event.entity';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  controllers: [EventsController, CourtController],
  providers: [CourtService, EventsService],
  imports: [AuthModule, UsersModule, TypeOrmModule.forFeature([Court, EntityEvent.Event]), TeamsModule],
  exports: [TypeOrmModule.forFeature([Court, EntityEvent.Event])],
})
export class EventsModule {}
