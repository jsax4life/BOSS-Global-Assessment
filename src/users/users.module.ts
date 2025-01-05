import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/guards/jwt.strategy';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET || 'defaultSecret',
    signOptions: { expiresIn: '1h' },
  }),
],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard], // Export for use in other modules
})
export class UsersModule {}
