import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure expiration is checked, set true to ignore
      secretOrKey: jwtConstants.secret, // Use your secret key here
    });
  }

  // The validate method is called after the JWT is verified and decoded.
  // Adjust the 'payload' properties based on how your JWT is structured.
  async validate(payload: any) {
    return { userId: payload.id, name: payload.name, email: payload.email }; // Modify based on your JWT payload
  }
}
