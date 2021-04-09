import {Component, OnInit} from '@angular/core';

interface User {
  name: string;
  email: string;
  phone: number;
  topic: string;
  timePreference: string;
  subscribe: boolean;
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {

  public userModel: User = {
    name: '',
    email: 'd@d.com',
    phone: null,
    topic: '',
    timePreference: 'morning',
    subscribe: true
  };

  topics = ['Angular', 'React', 'Vue'];

  constructor() {
  }

  ngOnInit(): void {
  }


}
