import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../email.service';
import { TemplatesModule } from '../../templates/templates.module';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TemplatesModule],
      providers: [EmailService]
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
