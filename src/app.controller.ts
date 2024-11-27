import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(@InjectConnection() private connection: Connection) {}

  @Get('health')
  async checkHealth() {
    try {
      const state = this.connection.readyState;
      return {
        mongodb: state === 1 ? 'conectado' : 'desconectado',
        state: state,
      };
    } catch (error) {
      return {
        mongodb: 'error',
        error: error.message,
      };
    }
  }
}
