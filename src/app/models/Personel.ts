export class Personel {
  
    IDPersonel:number;
    IDRole:number;
    FName:string;
    LName:string;
    UserName: string;
    Password: string;
    Active: boolean;

    RepeatPassword: string;

    Personel()
    {
      this.FName='';
      this.LName='';
      this.UserName='';
      this.Password='';
      this.RepeatPassword='';

    }
  }
