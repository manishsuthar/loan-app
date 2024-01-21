import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Application extends Document {

  @Prop()
  status: 'INIT'|'REVIEW'|'SUBMIT';

  @Prop()
  name: string;

  @Prop()
  businessName: string;

  @Prop()
  yearEstablished: number;

  @Prop()
  profitOrLoss: number;

  @Prop()
  preAssessment: number

  @Prop()
  loanAmount: number
}

export const ApplicationModel = SchemaFactory.createForClass(Application);