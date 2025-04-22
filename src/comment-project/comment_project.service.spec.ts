import { Test, TestingModule } from '@nestjs/testing';
import { CommentProjectService } from './comment_project.service';

describe('CommentProjectService', () => {
  let service: CommentProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentProjectService],
    }).compile();

    service = module.get<CommentProjectService>(CommentProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
