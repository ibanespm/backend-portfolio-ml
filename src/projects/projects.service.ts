import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/projects.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, owner } = createProjectDto;

    // Verificar si ya existe un proyecto con el mismo nombre
    const projectExists = await this.projectModel.findOne({ name }).exec();
    if (projectExists) {
      throw new HttpException('Project already exists', HttpStatus.BAD_REQUEST);
    }

    // Crear y guardar el nuevo proyecto
    const newProject = new this.projectModel(createProjectDto);
    const projectCreated = await newProject.save();

    // Poblar los detalles del owner antes de devolver
    return this.projectModel
      .findById(projectCreated._id)
      .populate('owner', 'name email') // Poblar solo los campos requeridos
      .exec();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<Project> {
    // Verify if the id is a valid ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId format');
    }

    // Search for the project by its ID and populate the 'owner' field
    const projectFind = await this.projectModel
      .findById(id)
      .populate('owner', 'name email') // Populate 'owner' with 'name' and 'email'
      .exec(); // Executes the query and returns a promise with the result

    // If no project is found, throw an exception
    if (!projectFind) {
      throw new NotFoundException('Project not found');
    }

    return projectFind;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();

    if (!updatedProject) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return updatedProject;
  }

  remove(id: string) {
    const projectDeleted = await this.projectModel.findByIdAndDelete(id);

    if (!projectDeleted){
      throw new NotFoundException(`Project not foud, not deleted`)
    }
  }
}
// async findAll(): Promise<User[]> {
//   return this.userModel.find().exec();
