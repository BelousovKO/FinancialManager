import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  _url = 'http://localhost:8080/users/login';

  constructor(private _http: HttpClient) {
  }

  login(userData): any {
    return this._http.post<any>(this._url, userData);
  }
}
