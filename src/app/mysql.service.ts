import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  mentors: ArrayBuffer;

  private getMysqlDataURL = 'http://rudchyk.pp.ua/angular/get_data.php';
  private postMysqlDataURL = 'http://rudchyk.pp.ua/angular/post_data.php';

  constructor(
    private http: HttpClient
  ) { }

  public addMysqlData(name: string, occupation: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .post(
        this.postMysqlDataURL,
        {
          id: '',
          name,
          occupation
        },
        {
          headers
        }
      )
      .subscribe(res => {
        console.log(res.toString());
      });
  }

  public getMysqlData(data) {
    return this.http.get(this.getMysqlDataURL, data);
  }

}
