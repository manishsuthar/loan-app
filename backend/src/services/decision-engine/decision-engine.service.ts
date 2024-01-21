import { Injectable } from '@nestjs/common';

@Injectable()
export class DecisionEngineService {

    requestDecision(applicationData):Promise<{approved:boolean,amount:number}>{
        return new Promise((resolve,reject)=>{
            resolve({ approved: true, amount: applicationData.preAssessment });
        })
    }
}
