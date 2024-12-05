import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Advice, AdviceDocument } from './schemas/advice.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdviceService {
  constructor(
    @InjectModel(Advice.name)
    private readonly adviceModel: Model<AdviceDocument>,
  ) {}

  async create(createAdviceDto: CreateAdviceDto): Promise<Advice> {
    // Verificar si ya existe una asesoría idéntica
    const existingAdvice = await this.adviceModel
      .findOne({
        topic: createAdviceDto.topic,
        description: createAdviceDto.description,
        requester: createAdviceDto.requester,
      })
      .exec();

    // Si existe, lanzar una excepción o devolver un mensaje
    if (existingAdvice) {
      throw new BadRequestException(
        `Ya has enviado una solicitud con este tema y descripción.`,
      );
    }

    // Crear una nueva asesoría si no existe
    const newAdvice = new this.adviceModel(createAdviceDto);
    return newAdvice.save();
  }

  //this method will return all the advices
  async findAll(): Promise<Advice[]> {
    return this.adviceModel.find().exec();
  }

  //this method will return a single advice
  async findOne(id: string): Promise<Advice> {
    return this.adviceModel.findById(id).exec();
  }

  //this method will update a advice
  async update(id: string, updateAdviceDto: UpdateAdviceDto): Promise<Advice> {
    try {
      //check if the ID is valid
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
      //update the advice in the database
      const updatedAdvice = await this.adviceModel
        .findByIdAndUpdate(id, updateAdviceDto, { new: true })
        .exec();
      //throw an exception if the advice does not exist
      if (!updatedAdvice) {
        throw new BadRequestException(`Advice with id ${id} not found`);
      }
      return updatedAdvice;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  //this method will remove a advice adn return message is ok deleted
  async remove(id: string): Promise<{ message: string; status: number }> {
    //check if the ID is valid
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    //remove the advice in the database
    const deletedAdvice = await this.adviceModel.findByIdAndDelete(id).exec();
    //throw an exception if the advice does not exist
    if (!deletedAdvice) {
      throw new BadRequestException(`Advice with id ${id} not found`);
    }
    return { message: 'Advice deleted successfully', status: HttpStatus.OK };
  }
}
