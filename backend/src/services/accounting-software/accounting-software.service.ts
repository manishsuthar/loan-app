import { Injectable } from '@nestjs/common';
import { mockBalanceSheet } from '../../constants';
import { BalanceSheet } from '../../type/BalanceSheet';

@Injectable()
export class AccountingSoftwareService {

    requestBalanceSheet():Promise<BalanceSheet[]>{
        return new Promise((resolve,reject)=>{
            const randomNumber = Math.floor(Math.random() * 11);
            resolve(mockBalanceSheet[randomNumber]);
        })
    } 

}
