import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MysqlService } from '../mysql.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { log } from 'util';

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
  updatedRows: any[] = [];
  addedRows: any[] = [];

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
      return a.id - b.id  ||  a.name.localeCompare(b.name);
    });
    arr.map((element, index) => {
      element.position = index + 1;
    });
  }

  saveData(): void {
    const data = {
      updated: this.updatedRows,
      deleted: this.deletedRows,
      added: this.addedRows
    };
    console.log('sent data: ', data);
    this.mysqlService
      .postMysqlData(data)
      .subscribe(
        (res) => {
          console.log('response from the server:', res);
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
        this.deletedRows.push({
          name: element.name,
          id: element.id
        });
      }
    });
    dataSourceArr.map((item: any, index) => {
      item.position = index + 1;
    });
    this.dataSource.next(dataSourceArr);
    this.saveState = true;
  }

  addMentor(element: any): void {
    const dataSourceArr: any[] = this.dataSource.getValue();
    this.addedRows.push(element);
    element.position = dataSourceArr.length + 1;
    this.dataSource.next([...dataSourceArr, element]);
    this.saveState = true;
  }

  updateMentor(oldData: any, newData: any): void {
    const dataSourceArr: any[] = this.dataSource.getValue(),
      position = oldData.position - 1,
      element = dataSourceArr[position];
    let updated = false;

    if (oldData.name !== newData.name) {
      dataSourceArr[position].name = newData.name;
      updated = true;
    }
    if (oldData.occupation !== newData.occupation) {
      dataSourceArr[position].occupation = newData.occupation;
      updated = true;
    }

    if (updated) {
      if (this.updatedRows.length) {
        const udpatedRowsArr = this.updatedRows.map(item => {
            return item.id;
          }),
          udpatedRowPosition = udpatedRowsArr.indexOf(element.id);
        if (udpatedRowPosition === -1) {
          this.updatedRows.push(element);
        } else {
          this.updatedRows[udpatedRowPosition].name = element.name;
          this.updatedRows[udpatedRowPosition].occupation = element.occupation;
        }
      } else {
        this.updatedRows.push(element);
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

  openDialog(value): void {
    console.log('value', value);
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
        this.updateMentor(value, result);
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
