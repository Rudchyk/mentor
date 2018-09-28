import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../mysql.service';

@Component({
  selector: 'app-mentors-list',
  templateUrl: './mentors-list.component.html',
  styleUrls: ['./mentors-list.component.css']
})
export class MentorsListComponent implements OnInit {

  mentors: ArrayBuffer;

  constructor(
    private mysqlService: MysqlService
  ) { }

  ngOnInit() {
    this.fetchMentors();
  }

  fetchMentors(): void {
    this.mysqlService
      .getMysqlData()
      .subscribe(
        (mentors: any) => this.mentors = mentors,
        (error) => console.log(error)
      );
  }

}
