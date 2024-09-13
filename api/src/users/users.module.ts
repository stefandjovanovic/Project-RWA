import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerDetails } from './entities/player-details.entity';
import { ManagerDetails } from './entities/manager-details.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PlayerDetails, ManagerDetails],),
    CloudinaryModule,
    EventsModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule.forFeature([PlayerDetails, ManagerDetails])]
})
export class UsersModule {}
