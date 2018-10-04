import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MysqlService } from '../mysql.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AreYouSureDialogComponent } from '../are-you-sure-dialog/are-you-sure-dialog.component';

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
    this.checkToSave();
  }

  checkToSave() {
    const dataSourceArr: any[] = this.dataSource.getValue(),
      changedData = dataSourceArr.some(element => {
        return element.status > 0;
      }),
      deletedData = this.deletedRows.length > 0;

    this.saveState = changedData || deletedData;
  }

  addMentor(element: any): void {
    const dataSourceArr: any[] = this.dataSource.getValue(),
      date = new Date();
    element.id = date.getTime();
    element.status = NEW;
    this.dataSource.next([...dataSourceArr, element]);
    this.checkToSave();
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
      this.checkToSave();
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

  openAreYouSureDialog(element: any): void {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The are you sure dialog was closed');
      if (result) {
        this.deleteMentor(element);
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
