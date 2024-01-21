import { BalanceSheet } from "../../type/BalanceSheet";

export const calculatePreAssessment = (balanceSheet: BalanceSheet[], loanAmount: number) => {
    let profitInLast12Months = false;
    let totalAssetsValue = 0;
    let monthsCounted = 0;

    for (let monthData of balanceSheet) {
        if (monthData.profitOrLoss > 0) {
            profitInLast12Months = true;
        }
        totalAssetsValue += monthData.assetsValue;
        monthsCounted++;
    }

    const averageAssetsValue = monthsCounted > 0 ? totalAssetsValue / monthsCounted : 0;

    let preAssessment = 20; // Default value
    if (profitInLast12Months) {
        preAssessment = 60;
    }
    if (averageAssetsValue > loanAmount) {
        preAssessment = 100;
    }

    return preAssessment;
}