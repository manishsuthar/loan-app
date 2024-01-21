import { Test, TestingModule } from '@nestjs/testing';
import { AccountingSoftwareService } from './accounting-software.service';
import { mockBalanceSheet } from '../../constants';

describe('AccountingSoftwareService', () => {
  let service: AccountingSoftwareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountingSoftwareService],
    }).compile();

    service = module.get<AccountingSoftwareService>(AccountingSoftwareService);
  });

  it('should return a valid balance sheet', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    const result = await service.requestBalanceSheet();
    expect(result).toEqual(mockBalanceSheet[5]);
  });

  it('should handle errors gracefully', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    try {
      await service.requestBalanceSheet();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});
