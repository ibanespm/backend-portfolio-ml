import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create_comment_project.dto';
// import { UpdateCommentDto } from './dto/update-comment-project.dto';
import { Project, ProjectDocument } from '../projects/schemas/projects.schema';
import { User, UserDocument } from '../users/schemas/users.schema';
import { CommentDocument } from './schemas/comment_project.schema';

@Injectable()
export class CommentProjectService {
  constructor(
    @InjectModel('CommentProject') // Asegúrate de usar el nombre de la clase, no un string
    private readonly commentModel: Model<CommentDocument>,

    @InjectModel(Project.name) // Igual aquí
    private readonly projectModel: Model<ProjectDocument>,

    @InjectModel(User.name) // Y aquí
    private readonly userModel: Model<UserDocument>,
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

    // Verifica el comentario padre solo si está presente
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
      parentComment: parentCommentId || null,
      likes: 0,
    });

    return newComment.save();
  }

  async findByProject(projectId: string): Promise<CommentDocument[]> {
    return this.commentModel
      .find({ project: projectId }) // Busca los comentarios por el ID del proyecto
      .populate('user', 'name email') // Opcional: incluye información del usuario
      .exec();
  }

  // // Método para obtener un comentario por ID
  // async findOne(id: string): Promise<Comment> {
  //   return this.commentModel.findById(id).exec();
  // }

  // // Método para actualizar un comentario por ID
  async editComment(
    commentId: string,
    userId: string,
    updateCommentDto: { text: string },
  ): Promise<CommentDocument> {
    // Busca el comentario
    const comment = await this.commentModel.findById(commentId).exec();

    // Verifica si existe
    if (!comment) {
      throw new Error(`El comentario con ID ${commentId} no existe.`);
    }

    // Verifica que el usuario sea el propietario del comentario
    if (comment.user.toString() !== userId) {
      throw new HttpException(
        'No tienes permiso para editar este comentario',
        HttpStatus.FORBIDDEN,
      );
    }

    // Actualiza el texto del comentario
    comment.text = updateCommentDto.text;

    // Guarda los cambios
    return comment.save();
  }

  async toggleLike(
    commentId: string,
    userId: string,
  ): Promise<{ message: string; status: number }> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new Error('El comentario no existe.');
    }

    // Busca si el userId ya existe en la lista likedBy
    const likedByIndex = comment.likedBy.indexOf(userId);

    if (likedByIndex === -1) {
      // Si el usuario no ha dado *like*, lo agregamos
      comment.likedBy.push(userId);
      comment.likes += 1;
      await comment.save();
      return { message: 'Like agregado correctamente', status: 200 };
    } else {
      // Si el usuario ya ha dado *like*, lo quitamos
      comment.likedBy.splice(likedByIndex, 1);
      comment.likes -= 1;
      await comment.save();
      return { message: 'Like eliminado correctamente', status: 200 };
    }
  }

  // Método para eliminar un comentario por ID
  async remove(id: string): Promise<{ message: string; status: number }> {
    const commentRemoved = await this.commentModel.findByIdAndDelete(id).exec();
    console.log(commentRemoved);
    if (!commentRemoved) {
      throw new HttpException(
        `El comentario con ID ${id} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Comentario eliminado correctamente',
      status: 200,
    };
  }
}
