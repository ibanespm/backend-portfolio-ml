import * as dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);  // Verifica que la variable esté cargada correctamente

export const jwtConstants = {
  secret: "process.env.JWT_SECRET_KEY",
//  secret: process.env.JWT_SECRET_KEY,
  
};
