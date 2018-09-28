import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  mentors: ArrayBuffer;

  private mysqlDataURL = 'http://rudchyk.pp.ua/angular/get_data.php';

  constructor(
    private http: HttpClient
  ) { }

  public getMysqlData(data) {
    return this.http.get(this.mysqlDataURL, data);
  }

}
