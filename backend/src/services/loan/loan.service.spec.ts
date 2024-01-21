import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from '../../models/application.model';
import { AccountingSoftwareService } from '../accounting-software/accounting-software.service';
import { DecisionEngineService } from '../decision-engine/decision-engine.service';
import { LoanService } from './loan.service';
import { AppModule } from '../../app.module';

describe('LoanService', () => {
  let service: LoanService;
  let applicationModel: Model<Application>;
  let accountingSoftwareService: AccountingSoftwareService;
  let decisionEngineService: DecisionEngineService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule],
      providers: [
        LoanService,
        AccountingSoftwareService,
        DecisionEngineService,
        {
          provide: getModelToken(Application.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
    applicationModel = module.get<Model<Application>>(getModelToken(Application.name));
    accountingSoftwareService = module.get<AccountingSoftwareService>(AccountingSoftwareService);
    decisionEngineService = module.get<DecisionEngineService>(DecisionEngineService);
  });

  describe('initiateApp', () => {
    it('should create a new application with status "INIT"', async () => {
      jest.spyOn(applicationModel.prototype, 'save').mockResolvedValueOnce({ _id: 'mockId', name: '', status: 'INIT' });

      const result = await service.initiateApp();

      expect(result).toEqual({ _id: 'mockId', name: '', status: 'INIT' });
    });
  });

  describe('getBalanceSheet', () => {
    it('should update the application status and request balance sheet from accounting software', async () => {
      jest.spyOn(applicationModel, 'findByIdAndUpdate').mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValueOnce({ _id: 'mockId' }),
      } as any));
      jest.spyOn(accountingSoftwareService, 'requestBalanceSheet').mockResolvedValueOnce([]);

      const applicationId = 'mockId';

      const result = await service.getBalanceSheet(applicationId);

      expect(result).toEqual([]);
    });
  });

  describe('submitApplication', () => {
    it('should submit an application and request decision', async () => {
      jest.spyOn(applicationModel, 'findByIdAndUpdate').mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValueOnce({ _id: 'mockId' }),
      } as any));
      jest.spyOn(decisionEngineService, 'requestDecision').mockResolvedValueOnce({ decision: 'approved' } as any);

      const applicationData = {
        id: 'mockId',
        name: 'Test',
        businessName: 'Test',
        yearEstablished: 2020,
        loanAmount: 10000,
        balanceSheet: [{ month: '1', profitOrLoss: 5000 }],
      } as any;

      const result = await service.submitApplication(applicationData);

      expect(result).toEqual({ decision: 'approved' });
    });
  });
});
