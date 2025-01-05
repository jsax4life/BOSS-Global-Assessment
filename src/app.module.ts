import { Module } from '@nestjs/common';
import {  ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './users/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ResetToken } from './users/entities/reset-token.entity';


@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 5,
    }]),
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'registration.sqlite',
    entities: [User, ResetToken],
    synchronize: true,
  
  }), 
 
  AuthModule, UsersModule
],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
