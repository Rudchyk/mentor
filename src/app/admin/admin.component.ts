import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MysqlService } from '../mysql.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'occupation', 'edit'];
  dataSource = new BehaviorSubject([]);

  saveState = false;

  ngOnInit() {
    this.fetchMentors();
  }

  fetchMentors(): void {
    this.mysqlService
      .getMysqlData()
      .subscribe(
        (mentors: any) => {
          const sortMentors = mentors.sort(function(a, b) {
            return a.id - b.id  ||  a.name.localeCompare(b.name);
          });
          this.dataSource.next(sortMentors);
        },
        (error) => console.log(error)
      );
  }

  saveData(): void {
    this.mysqlService
      .postMysqlData(this.dataSource.value)
      .subscribe(
        () => {
          this.saveState = false;
          this.router.navigate(['/admin']);
        },
        (error) => console.log(error)
      );
  }

  constructor(
    public dialog: MatDialog,
    private mysqlService: MysqlService,
    private router: Router
  ) { }

  openDialog(value): void {
    let data;

    if (value) {
      data = {
        id: value.id,
        name: value.name,
        occupation: value.occupation,
        new: false
      };
    } else {
      data = {
        id: `${this.dataSource.value.length + 1}`,
        name: '',
        occupation: '',
        new: true
      };
    }
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result.new) {
        this.dataSource.next([...this.dataSource.getValue(), result]);
        this.saveState = true;
      } else {
        this.dataSource.value.map(element => {
          if (element.id === result.id) {
            element.name = result.name;
            element.occupation = result.occupation;
            this.saveState = true;
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
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
