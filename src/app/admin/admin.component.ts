import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MysqlService } from '../mysql.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['name', 'occupation', 'edit'];
  dataSource: ArrayBuffer;

  ngOnInit() {
    this.fetchMentors();
  }

  fetchMentors(): void {
    this.mysqlService
      .getMysqlData(this.dataSource)
      .subscribe(
        (mentors) => this.dataSource = mentors,
        (error) => console.log(error)
      );
  }

  constructor(
    public dialog: MatDialog,
    private mysqlService: MysqlService
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
