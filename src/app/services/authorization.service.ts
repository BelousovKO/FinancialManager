import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public login = false;
  public reg = false;
  public recovery = false;
  public username = '';

  constructor() { }
}
