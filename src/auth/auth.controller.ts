import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🟢 Registro local
  @Post('register')
  register(@Body() registerDto: RegisterAuthDto) {
    return this.authService.register(registerDto);
  }

  // 🟢 Login local
  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }
  // 🟢 Login con Google
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    // El guard redirige a Google automáticamente
  }

  @Get('callback/google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.oAuthLogin(req.user);
      //  res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token.jwt}`);
      res.redirect(`http://localhost:3000/oauth?token=${token.jwt}`);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
