import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment-project.dto';
import { UpdateCommentDto } from './dto/update-comment-project.dto';
import { Project, ProjectDocument } from 'src/projects/schemas/projects.schema';
import { UserDocument } from '../../dist/users/schemas/users.schema';
import { User } from 'src/users/schemas/users.schema';
import { CommentDocument } from '../../dist/comment-project/schemas/comment-project.schema';
@Injectable()
export class CommentProjectService {
  constructor(
    @InjectModel('CommentProject')
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, // Inyecta UserModel
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
    const { user, project, parentCommentId, text } = createCommentDto;

    // Verifica que el usuario existe
    const userExists = await this.userModel.findById(user).exec();
    if (!userExists) {
      throw new Error(`El usuario con ID ${user} no existe.`);
    }

    // Verifica que el proyecto existe
    const projectExists = await this.projectModel.findById(project).exec();
    if (!projectExists) {
      throw new Error(`El proyecto con ID ${project} no existe.`);
    }

    // Si es una respuesta, verifica que el comentario principal exista
    if (parentCommentId) {
      const parentCommentExists = await this.commentModel
        .findById(parentCommentId)
        .exec();
      if (!parentCommentExists) {
        throw new Error(
          `El comentario principal con ID ${parentCommentId} no existe.`,
        );
      }
    }

    // Crea el nuevo comentario
    const newComment = new this.commentModel({
      user,
      project,
      text,
      parentCommentId: parentCommentId || null, // Guarda null si no es una respuesta
      likes: 0,
    });

    return newComment.save();
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
