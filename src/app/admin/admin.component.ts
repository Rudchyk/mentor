import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MysqlService } from '../mysql.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { log } from 'util';

// STATUSES
const STATIC = 0,
  CHANGED = 1,
  NEW = 2,
  REMOVED = 3;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'occupation', 'actions'];
  dataSource = new BehaviorSubject([]);
  saveState = false;
  deletedRows: any[] = [];

  ngOnInit() {
    this.fetchMentors();
  }

  fetchMentors(): void {
    this.mysqlService
      .getMysqlData()
      .subscribe(
        (mentors: any) => {
          this.prepareTheMentors(mentors);
          this.dataSource.next(mentors);
        },
        (error) => console.log(error)
      );
  }

  prepareTheMentors(arr: any): void {
    arr.sort(function(a, b) {
      return a.name - b.name  ||  a.name.localeCompare(b.name);
    });
    arr.map(element => {
      element.status = STATIC;
    });
  }

  saveData(): void {
    const dataSourceArr: any[] = this.dataSource.getValue(),
      sortedDataSource = dataSourceArr.filter(element => {
        return element.status !== STATIC;
      }),
      mysqlData = sortedDataSource.concat(this.deletedRows);
    mysqlData.map(element => {
      if (element.status === NEW) {
        delete element.id;
      }
    });
    this.mysqlService
      .postMysqlData(mysqlData)
      .subscribe(
        (res: any[]) => {
          alert(res.join('\n'));
          console.log('response from the server:', res);
          this.fetchMentors();
          this.deletedRows = [];
          this.saveState = false;
        },
        (error) => console.log(error)
      );
  }

  deleteMentor(element: any): void {
    const dataSourceArr: any[] = this.dataSource.getValue();
    dataSourceArr.forEach((item, index) => {
      if (item === element) {
        dataSourceArr.splice(index, 1);
        if (element.status !== NEW) {
          this.deletedRows.push({
            name: element.name,
            id: element.id,
            status: REMOVED
          });
        }
      }
    });
    this.dataSource.next(dataSourceArr);
    this.saveState = true;
  }

  addMentor(element: any): void {
    const dataSourceArr: any[] = this.dataSource.getValue(),
      date = new Date();
    element.id = date.getTime();
    element.status = NEW;
    this.dataSource.next([...dataSourceArr, element]);
    this.saveState = true;
  }

  updateMentor(oldData: any, newData: any, index: number): void {
    const dataSourceArr: any[] = this.dataSource.getValue(),
      element = dataSourceArr[index];
    let updated = false;

    if (oldData.name !== newData.name) {
      dataSourceArr[index].name = newData.name;
      updated = true;
    }
    if (oldData.occupation !== newData.occupation) {
      dataSourceArr[index].occupation = newData.occupation;
      updated = true;
    }

    if (updated) {
      if (element.status !== NEW) {
        dataSourceArr[index].status = CHANGED;
      }
      this.dataSource.next(dataSourceArr);
      this.saveState = true;
    }
  }

  constructor(
    public dialog: MatDialog,
    private mysqlService: MysqlService,
    private router: Router
  ) { }

  openDialog(value, index): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '500px',
      data: {
        name: value ? value.name : '',
        occupation: value ? value.occupation : ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) {
        return false;
      } else if (!value) {
        this.addMentor(result);
      } else {
        this.updateMentor(value, result, index);
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
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
