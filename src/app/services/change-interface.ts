import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangeInterface {

  _url = 'http://localhost:8080/interface';

  constructor(private _http: HttpClient) {
  }

  change(body): any {
    return this._http.post<any>(this._url, body);
  }
}
