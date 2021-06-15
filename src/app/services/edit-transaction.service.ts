import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditTransactionService {

  _url = 'http://localhost:8080/transaction/';

  constructor(private _http: HttpClient) {
  }

  create(body): any {
    return this._http.post<any>(`${this._url}new`, body);
  }

  edit(body): any {
    return this._http.post<any>(`${this._url}edit`, body);
  }

  delete(body): any {
    return this._http.post<any>(`${this._url}delete`, body);
  }
}
