import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/projects.schema';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, JwtAuthGuard],
  exports: [
    MongooseModule, // Exporta el MongooseModule para compartir modelos
  ],
})
export class ProjectsModule {}
