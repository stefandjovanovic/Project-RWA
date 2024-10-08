import { forwardRef, Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { CourtController } from './controllers/court.controller';
import { CourtService } from './services/court.service';
import { EventsService } from './services/events.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import {Event} from './entities/event.entity';
import { TeamsModule } from 'src/teams/teams.module';
import { TimeSlot } from './entities/time-slot.entity';

@Module({
  controllers: [EventsController, CourtController],
  providers: [CourtService, EventsService],
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([Court, Event, TimeSlot]),
    forwardRef(() => TeamsModule),
  ],
  exports: [TypeOrmModule.forFeature([Court, Event, TimeSlot])],
})
export class EventsModule {}
