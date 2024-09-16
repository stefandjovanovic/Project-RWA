import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EventsModule } from './events/events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm.config';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [typeorm]
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
      }),
      AuthModule,
      UsersModule,
      CloudinaryModule, 
      EventsModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
