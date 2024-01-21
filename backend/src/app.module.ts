import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountingSoftwareService } from './services/accounting-software/accounting-software.service';
import { DecisionEngineService } from './services/decision-engine/decision-engine.service';
import { LoanService } from './services/loan/loan.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { LoanController } from './controllers/loan/loan.controller';
import { ApplicationModel } from './models/application.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongodbModule, MongooseModule.forFeature([{ name: 'Application', schema: ApplicationModel }])],
  controllers: [AppController, LoanController],
  providers: [AppService, AccountingSoftwareService, DecisionEngineService, LoanService],
  exports:[MongooseModule,LoanService,DecisionEngineService,AccountingSoftwareService]
})
export class AppModule {}
