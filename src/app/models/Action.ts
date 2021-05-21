export class Action {
  IDAction: number;
  IDContract: number;
  IDTask: number;
  IDTaskCategory: number;
  IDPersonel: number;
  Count: number;
  StartDate: Date;
  EndDate: Date;
  Description: string;
  PassedTime: string;
  IDSalon: number;
  IDLine: number;
  Personels: Array<number>;
  CalculateExpectationSystemTime:string;
  CalculateDoneWorkTime:string;
}
