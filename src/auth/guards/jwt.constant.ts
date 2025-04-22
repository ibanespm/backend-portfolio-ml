import * as dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
export const jwtConstants = {
  secret: 'process.env.JWT_SECRET_KEY',
};
