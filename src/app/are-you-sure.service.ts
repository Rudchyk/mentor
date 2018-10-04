import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AreYouSureDialogComponent } from './are-you-sure-dialog/are-you-sure-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AreYouSureService {

  constructor(
    public dialog: MatDialog
  ) { }

  settings() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      width: '250px'
    });

    return dialogRef.afterClosed();
  }

}
