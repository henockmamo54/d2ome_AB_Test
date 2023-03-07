import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://127.0.0.1:5000/';

  checkapi() {
    var response = this.http.get(this.rootURL).subscribe((data) => { console.log(data) });
    console.log(response)
    return response
  }

  load_proteins_rate(sourceA: any, sourceB: any) {
    var url = "http://127.0.0.1:5000/AnalyzedProtiens/" + sourceA + "/" + sourceB;
    var response = this.http.get(url)
    return response
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/user', { user });
  }
}
