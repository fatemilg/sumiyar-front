export class Action {
  IDAction: number;
  IDContract: number;
  IDTask: number;
  IDPersonel: number;
  Count: number;
  StartDate: Date;
  EndDate: Date;
  Description: string;
  PassedTime: string;

  Personels: Array<number>;
}
