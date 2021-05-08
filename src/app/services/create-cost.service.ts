import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateCostService {


  _url = 'http://localhost:8080/costs/new';

  constructor(private _http: HttpClient) {
  }

  create(body): any {
    return this._http.post<any>(this._url, body);
  }
}
