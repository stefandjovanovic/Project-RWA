import { forwardRef, Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { ChallengesController } from './controllers/challenges.controller';
import { ChallengesService } from './services/challenges.service';
import { Challenge } from './entities/challenge.entity';
import { ChallengeResult } from './entities/challenge-result.entity';
import { TableController } from './controllers/table.controller';
import { TableService } from './services/table.service';

@Module({
  controllers: [TeamController, ChallengesController, TableController],
  providers: [TeamService, ChallengesService, TableService],
  imports: [
    AuthModule,
    UsersModule, 
    forwardRef(() => EventsModule), 
    TypeOrmModule.forFeature([Team, Challenge, ChallengeResult])
  ],
  exports: [TypeOrmModule.forFeature([Team, Challenge, ChallengeResult])],
})
export class TeamsModule {}
