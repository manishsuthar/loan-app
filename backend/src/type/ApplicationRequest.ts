import { BalanceSheet } from "./BalanceSheet";

export type ApplicationRequest = {
    id: string;
    name: string;
    businessName: string;
    yearEstablished: number;
    loanAmount: number;
    balanceSheet: BalanceSheet[]
}