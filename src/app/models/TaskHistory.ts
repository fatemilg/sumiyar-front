export class TaskHistory {

    IDTaskHistory: number;
    IDTask: number;
    EstimateTime: number;
    EstimateWage: number;
    CreateDate: Date;

    IDIndustry: number;


    TaskHistory() {
        this.EstimateTime = 0;
        this.EstimateWage = 0;
    }
}
