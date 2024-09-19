import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [AuthModule, UsersModule, EventsModule, TypeOrmModule.forFeature([Team])],
  exports: [TypeOrmModule.forFeature([Team])],
})
export class TeamsModule {}
