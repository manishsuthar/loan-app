import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from './loan.controller';
import { LoanService } from '../../services/loan/loan.service';
import { AppModule } from '../../app.module';

describe('LoanController', () => {
  let controller: LoanController;
  let loanService: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule],
      controllers: [LoanController],
      providers: [LoanService],
    }).compile();

    controller = module.get<LoanController>(LoanController);
    loanService = module.get<LoanService>(LoanService);
  });

  describe('initiateApplication', () => {
    it('should create an application successfully', async () => {
      jest.spyOn(loanService, 'initiateApp').mockResolvedValue({status:'INIT'} as any);

      const result = await controller.initiateApplication();

      expect(result.message).toBe('Application created successfully');
      expect(result.success).toBe(true);
      expect(result.application).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should handle initiation failure', async () => {
      jest.spyOn(loanService, 'initiateApp').mockRejectedValue(new Error('Initiation failed'));

      const result = await controller.initiateApplication();

      expect(result.message).toBe('Failed to Init Application');
      expect(result.success).toBe(false);
      expect(result.application).toBeNull();
      expect(result.error).toBeDefined();
    });
  });

  describe('getBalanceSheet', () => {
    it('should retrieve balance sheet successfully', async () => {
      jest.spyOn(loanService, 'getBalanceSheet').mockResolvedValue([{
        "year": 2020,
        "month": 1,
        "profitOrLoss": 1,
        "assetsValue": 1
    }]);

      const result = await controller.getBalanceSheet('someId');

      expect(result.message).toBe('Balance Sheet Successfully Recivied');
      expect(result.success).toBe(true);
      expect(result.balanceSheet).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should handle retrieval failure', async () => {
      jest.spyOn(loanService, 'getBalanceSheet').mockRejectedValue(new Error('Failed to retrieve balance sheet'));

      const result = await controller.getBalanceSheet('someId');

      expect(result.message).toBe('Failed to Get Balance Sheet');
      expect(result.success).toBe(false);
      expect(result.balanceSheet).toBeNull();
      expect(result.error).toBeDefined();
    });
  });

  describe('submitApplication', () => {
    it('should submit application successfully', async () => {
      const applicationData = { 
      "id": "65acc79a2673434808c09f72",
      "name": "Manish",
      "businessName": "XYZ",
      "yearEstablished": "2001",
      "loanAmount": "200000000",
      "balanceSheet": [] 
    } as any;
      jest.spyOn(loanService, 'submitApplication').mockResolvedValue({ 
        "approved": true,
        "amount": 120000000
     });

      const result = await controller.submitApplication(applicationData);

      expect(result.message).toBe('Application Successfully Submitted');
      expect(result.success).toBe(true);
      expect(result.outcome).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should handle submission failure', async () => {
      const applicationData = { } as any;
      jest.spyOn(loanService, 'submitApplication').mockRejectedValue(new Error('Submission failed'));

      const result = await controller.submitApplication(applicationData);

      expect(result.message).toBe('Failed to Submit Application');
      expect(result.success).toBe(false);
      expect(result.outcome).toBeNull();
      expect(result.error).toBeDefined();
    });
  });
});
