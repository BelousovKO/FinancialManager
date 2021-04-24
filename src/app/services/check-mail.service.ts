import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckMailService {

  _url = 'http://localhost:8080/users/checkMail/';

  constructor(private _http: HttpClient) {
  }

  checking(email): any {
    return this._http.get<any>(`${this._url}${email}`);
  }
}
