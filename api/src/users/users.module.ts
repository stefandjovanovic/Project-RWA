import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerDetails } from './entities/player-details.entity';
import { ManagerDetails } from './entities/manager-details.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PlayerDetails, ManagerDetails])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
