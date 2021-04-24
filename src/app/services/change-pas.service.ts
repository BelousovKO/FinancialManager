import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasService {

  _url = 'http://localhost:8080/users/sendTo/';

  constructor(private _http: HttpClient) {
  }

  sendTo(recipient): any {
    return this._http.get<any>(`${this._url}${recipient}`);
  }
}
