import { calculatePreAssessment } from './loan-util';

describe('calculatePreAssessment', () => {
  it('should return 20 for default values', () => {
    const balanceSheet = [];
    const loanAmount = 10000;

    const result = calculatePreAssessment(balanceSheet, loanAmount);

    expect(result).toBe(20);
  });

  it('should return 60 if there is profit in the last 12 months', () => {
    const balanceSheet:any = [
      { profitOrLoss: 1000, assetsValue: 5000 },
      { profitOrLoss: 2000, assetsValue: 6000 },
    ];
    const loanAmount = 10000;

    const result = calculatePreAssessment(balanceSheet, loanAmount);

    expect(result).toBe(60);
  });

  it('should return 100 if average assets value is greater than loan amount', () => {
    const balanceSheet:any = [
      { profitOrLoss: -1000, assetsValue: 15000 },
      { profitOrLoss: -2000, assetsValue: 16000 },
    ];
    const loanAmount = 10000;

    const result = calculatePreAssessment(balanceSheet, loanAmount);

    expect(result).toBe(100);
  });

  it('should return 20 if there is no profit in the last 12 months and average assets value is less than or equal to loan amount', () => {
    const balanceSheet:any = [
      { profitOrLoss: -1000, assetsValue: 8000 },
      { profitOrLoss: -2000, assetsValue: 9000 },
    ];
    const loanAmount = 10000;

    const result = calculatePreAssessment(balanceSheet, loanAmount);

    expect(result).toBe(20);
  });

  it('should handle an empty balance sheet', () => {
    const balanceSheet:any = [];
    const loanAmount = 10000;

    const result = calculatePreAssessment(balanceSheet, loanAmount);

    expect(result).toBe(20);
  });
});
