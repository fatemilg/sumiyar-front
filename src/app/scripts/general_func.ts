import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class GeneralFunc {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    ShowMessage(message: string,Is_ok: boolean) {
        const config = new MatSnackBarConfig();
        config.duration = 10000;
        config.verticalPosition= 'top';
        if(Is_ok)
        {
            config.panelClass = ['alert-success'];

        }
        else
        {
            config.panelClass = ['alert-danger'];

        }
        this.snackBar.open(message, 'X', config);
     }


}


