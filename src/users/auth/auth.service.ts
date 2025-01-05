import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResetToken } from '../entities/reset-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ResetToken) private readonly resetTokenRepository: Repository<ResetToken>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { name, email, password, role = 'user' } = dto;

    // Check if the email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = this.userRepository.create({ name, email, password: hashedPassword, role });
    return this.userRepository.save(user);
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('User not found');

    // Validate password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT
    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('User not found');

    // Generate a JWT reset token
    const payload = { sub: user.id, email: user.email };
    const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Save the token
    await this.resetTokenRepository.save({
      user_id: user.id,
      token: resetToken,
      expires_at: expiresAt,
    });

     // Send the reset token or link to the user (mock email for now)
     const resetLink = `https://your-frontend-app.com/reset-password?token=${resetToken}`;

    // Send the token to the user (mock email for now)
    console.log(`Password reset token: ${resetLink}`);

    return { message: 'Password reset instructions have been sent to your email' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, newPassword } = dto;

    // Find the reset token and its associated user
    const resetToken = await this.resetTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetToken || resetToken.expires_at < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await this.userRepository.update(resetToken.user_id, { password: hashedPassword });

    // Delete the reset token after successful password reset
    await this.resetTokenRepository.delete(resetToken.id);

    return { message: 'Password has been reset successfully' };
  }
}



