import { Test, TestingModule } from '@nestjs/testing';
import { CommentProjectController } from './comment-project.controller';
import { CommentProjectService } from './comment-project.service';

describe('CommentProjectController', () => {
  let controller: CommentProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentProjectController],
      providers: [CommentProjectService],
    }).compile();

    controller = module.get<CommentProjectController>(CommentProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});