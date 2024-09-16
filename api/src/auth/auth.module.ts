import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { SeedService } from './seed.service';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,// 1 week
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
],
  providers: [
    AuthService,
    JwtStrategy,
    SeedService
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController]
})
export class AuthModule {}
