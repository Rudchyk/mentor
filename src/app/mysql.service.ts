import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  mentors: ArrayBuffer;

  private mysqlDataURL = 'http://rudchyk.pp.ua/angular/';

  constructor(
    private http: HttpClient
  ) { }

  public postMysqlData(data) {
    return this.http
      .post(
        this.mysqlDataURL + 'post_data.php',
        data
      );
  }

  public getMysqlData() {
    return this.http.get(this.mysqlDataURL + 'get_data.php');
  }

}
