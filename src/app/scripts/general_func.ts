import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TimeSpan } from './TimeSpan';

@Injectable({
    providedIn: 'root'
})
export class GeneralFunc {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    ShowMessage(message: string, Is_ok: boolean) {
        const config = new MatSnackBarConfig();
        config.duration = 10000;
        config.verticalPosition = 'top';
        if (Is_ok) {
            config.panelClass = ['alert-success'];

        }
        else {
            config.panelClass = ['alert-danger'];

        }
        this.snackBar.open(message, 'X', config);
    }

    ConvertSecondsToRealTime(second: number) {
        let DiffHours:string
        let Among1:string;
        let DiffMinutes:string;
        let Among2:string;;
        let DiffSeconds:string;
        const span = TimeSpan.fromSeconds(second);
        DiffHours = span.hours > 0 ? (span.hours.toString() + " ساعت  ") : "";
        Among1 = span.hours > 0 && span.minutes > 0 ? " و " : "";
        DiffMinutes = span.minutes > 0 ? (span.minutes.toString() + "  دقیقه ") : "";
        Among2 = span.minutes > 0 && span.seconds > 0 ? " و " : "";
        DiffSeconds = span.seconds > 0 ? (span.seconds.toString() + "  ثانیه ") : "";
        
        return DiffHours + Among1 + DiffMinutes + Among2 + DiffSeconds;
    }


}


