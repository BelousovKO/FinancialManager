import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoDataService {

  public demo: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
}
