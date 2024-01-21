import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoanService } from '../../services/loan/loan.service';
import { ApplicationRequest } from '../../type/ApplicationRequest';

@Controller('loan')
export class LoanController {

    constructor(private readonly loanService: LoanService) { }

    @Post('/initiate')
    async initiateApplication() {
        try {
            const createdApplication = await this.loanService.initiateApp();
            return { message: 'Application created successfully', application: createdApplication, success: true };
        } catch (err) {
            return { message: 'Failed to Init Application', application: null, error: err, success: false };
        }
    }

    @Get('/balance-sheet/:id')
    async getBalanceSheet(@Param('id') id: string) {
        try {
            const balanceSheet = await this.loanService.getBalanceSheet(id);
            return { message: 'Balance Sheet Successfully Recivied', balanceSheet: balanceSheet, success: true };
        } catch (err) {
            return { message: 'Failed to Get Balance Sheet', balanceSheet: null, error: err, success: false };
        }
    }

    @Post('/submit')
    async submitApplication(@Body() applicationData: ApplicationRequest) {
        try {
            const decision = await this.loanService.submitApplication(applicationData);
            return { message: 'Application Successfully Submitted', outcome: decision, success: true };
        } catch (err) {
            return { message: 'Failed to Submit Application', outcome: null, error: err, success: false };
        }
    }
}
