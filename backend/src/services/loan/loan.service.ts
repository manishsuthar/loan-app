import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationModel } from '../../models/application.model';
import { BalanceSheet } from '../../type/BalanceSheet';
import { AccountingSoftwareService } from '../accounting-software/accounting-software.service';
import { ApplicationRequest } from '../../type/ApplicationRequest';
import { calculatePreAssessment } from './loan-util';
import { DecisionEngineService } from '../decision-engine/decision-engine.service';

@Injectable()
export class LoanService {

    constructor(@InjectModel(Application.name) private readonly applicationModel: Model<Application>,
        private readonly accountingSoftwareService: AccountingSoftwareService,
        private readonly decisionEngineService: DecisionEngineService
    ) { }

    async initiateApp(): Promise<Application> {
        const initApplication = new this.applicationModel({ name: '', status: 'INIT' });
        return initApplication.save();
    }

    async getBalanceSheet(id: string): Promise<BalanceSheet[]> {
        await this.applicationModel.findByIdAndUpdate(id, { status: 'REVIEW' }).exec();
        return this.accountingSoftwareService.requestBalanceSheet();
    }

    async submitApplication(applicationData: ApplicationRequest): Promise<any> {
        const balanceSheet = applicationData.balanceSheet;
        const preAssessment = calculatePreAssessment(balanceSheet,applicationData.loanAmount);
        const profitOrLoss = balanceSheet.reduce((acc, month) => acc + month.profitOrLoss, 0);
        const updateApplication = {
            status: 'SUBMIT',
            name: applicationData.name,
            businessName: applicationData.businessName,
            profitOrLoss: profitOrLoss,
            preAssessment: preAssessment,
            yearEstablished: applicationData.yearEstablished,
            loanAmount: applicationData.loanAmount,
        }
        await this.applicationModel.findByIdAndUpdate(applicationData.id, updateApplication).exec();
        return this.decisionEngineService.requestDecision(updateApplication);
    }
}
