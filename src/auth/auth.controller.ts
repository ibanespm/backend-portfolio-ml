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
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

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

  // 🟡 Redirección a Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Esta ruta redirige automáticamente a Google
  }

  // 🟢 Redirección después de login con Google
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.validateOAuthUser(req.user as any);

    const authResponse = await this.authService.generateAuthResponse(user);

    // Puedes redirigir a tu frontend con el token como parámetro (opcional)
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:8080';
    const redirectURL = `${frontendURL}/auth/callback?token=${authResponse.access_token}`;

    return res.redirect(redirectURL);
  }
}
