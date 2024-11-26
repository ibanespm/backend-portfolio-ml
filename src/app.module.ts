import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NetworksModule } from './networks/networks.module';
import { AdviceModule } from './advice/advice.module';
import { ProjectsModule } from './projects/projects.module';
import { SearchModule } from './search/search.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [CommonModule, UsersModule, AuthModule, NetworksModule, AdviceModule, ProjectsModule, SearchModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
