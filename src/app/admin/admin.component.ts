import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  displayedColumns: string[] = ['name', 'occupation', 'edit'];
  mentors = [
    {
      name: 'Yoda',
      occupation: 'Jedi Master'
    },
    {
      name: 'Splinter',
      occupation: 'Highly skilled master of ninjutsu'
    },
    {
      name: 'Professor X',
      occupation: 'Master of mental-manipulation'
    }
  ];
  dataSource = this.mentors;

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(name, occupation): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '500px',
      data: {
        name,
        occupation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.html',
  styleUrls: ['./dialog-overview.css']
})
export class DialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
