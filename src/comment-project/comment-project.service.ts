import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment-project.dto';
import { Comment, CommentDocument } from './schemas/comment-project.schema';
import { UpdateCommentDto } from './dto/update-comment-project.dto';

@Injectable()
export class CommentProjectService {
  constructor(
    @InjectModel('CommentProject')
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      // Crear una nueva instancia del modelo con los datos proporcionados
      const newComment = new this.commentModel(createCommentDto);

      // Guardar el nuevo comentario en la base de datos
      return await newComment.save();
    } catch (error) {
      // Si ocurre un error, lanzar una excepción HTTP con el mensaje adecuado
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            'No se pudo guardar el comentario. Verifica los datos enviados.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Método para obtener todos los comentarios (deberías implementar la lógica de búsqueda)
  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  // Método para obtener un comentario por ID
  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  // Método para actualizar un comentario por ID
  async update(
    id: string,
    updateCommentProjectDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentProjectDto, { new: true })
      .exec();
  }

  // Método para eliminar un comentario por ID
  async remove(id: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(id).exec();
  }
}
