import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './jwt.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure expiration is checked, set true to ignore
      secretOrKey: jwtConstants.secret, // Use your secret key here
    });
  }

  // The validate method is called after the JWT is verified and decoded.
  // Adjust the 'payload' properties based on how your JWT is structured.
  validate(email: string, password: string) {
    if (password === '')
      throw new UnauthorizedException('Please provide a password');
    return this.AuthService.validateUser(email, password);
  }
}
