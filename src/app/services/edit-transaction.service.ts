import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditTransactionService {

  _url = 'http://localhost:8080/costs/edit';

  constructor(private _http: HttpClient) {
  }

  edit(body): any {
    return this._http.post<any>(this._url, body);
  }
}
