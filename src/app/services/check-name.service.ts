import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckNameService {

  _url = 'http://localhost:8080/users/';

  constructor(private _http: HttpClient) {
  }

  checking(userName): any {
    return this._http.get<any>(`${this._url}${userName}`);
  }
}
