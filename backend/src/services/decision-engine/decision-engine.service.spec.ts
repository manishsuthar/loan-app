import { Test, TestingModule } from '@nestjs/testing';
import { DecisionEngineService } from './decision-engine.service';

describe('DecisionEngineService', () => {
  let service: DecisionEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecisionEngineService],
    }).compile();

    service = module.get<DecisionEngineService>(DecisionEngineService);
  });

  it('should return an approval decision with the preAssessment amount', async () => {
    const applicationData = { preAssessment: 10 };
    const result = await service.requestDecision(applicationData);
    expect(result).toEqual({ approved: true, amount: applicationData.preAssessment });
  });
});
