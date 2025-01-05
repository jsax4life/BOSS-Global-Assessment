import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ResetToken } from '../entities/reset-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ResetToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Use .env for production
      signOptions: { expiresIn: '1h' }, // Token valid for 1 hour
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
