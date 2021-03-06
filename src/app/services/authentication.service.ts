import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  _url = 'http://localhost:8080/users/auth';

  constructor(private _http: HttpClient) {
  }

  auth(userData): any {
    return this._http.post<any>(this._url, userData);
  }
}
