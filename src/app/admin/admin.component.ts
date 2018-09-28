import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MysqlService } from '../mysql.service';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['name', 'occupation', 'edit'];
  dataSource = new BehaviorSubject([]);

  ngOnInit() {
    this.fetchMentors();
  }

  fetchMentors(): void {
    this.mysqlService
      .getMysqlData(this.dataSource)
      .subscribe(
        (mentors: any) => this.dataSource.next(mentors),
        (error) => console.log(error)
      );
  }

  constructor(
    public dialog: MatDialog,
    private mysqlService: MysqlService
  ) { }

  openDialog(value): void {
    const data = {
      id: '',
      name: '',
      occupation: ''
    };

    if (value) {
      data.id = value.id;
      data.name = value.name;
      data.occupation = value.occupation;
    }
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.id === '') {
        this.dataSource.next([...this.dataSource.getValue(), result]);
      } else {
        this.dataSource.value.map(element => {
          if (element.id === result.id) {
            element.name = result.name;
            element.occupation = result.occupation;
          }
        });
      }
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
    private mysqlService: MysqlService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    // console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
