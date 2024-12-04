import { Injectable } from '@nestjs/common';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Advice, AdviceDocument } from './schemas/advice.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdviceService {
  constructor(
    @InjectModel(Advice.name)
    private readonly adviceModel: Model<AdviceDocument>,
  ) {}

  async create(createAdviceDto: CreateAdviceDto): Promise<Advice> {
    // return `This action adds a new advice`;
    const newAdvice = await this.adviceModel.create(createAdviceDto);
    return newAdvice.save();
  }

  findAll() {
    return `This action returns all advice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} advice`;
  }

  update(id: number, updateAdviceDto: UpdateAdviceDto) {
    return `This action updates a #${id} advice`;
  }

  remove(id: number) {
    return `This action removes a #${id} advice`;
  }
}
