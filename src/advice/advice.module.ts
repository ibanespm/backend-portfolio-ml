import { Module } from '@nestjs/common';
import { AdviceService } from './advice.service';
import { AdviceController } from './advice.controller';
import { MongooseModule } from '@nestjs/mongoose'; // Cambié esta importación
import { Advice, AdviceSchema } from './schemas/advice.schema';

@Module({
  controllers: [AdviceController],
  providers: [AdviceService],
  imports: [
    MongooseModule.forFeature([{ name: Advice.name, schema: AdviceSchema }]),
  ],
})
export class AdviceModule {}
