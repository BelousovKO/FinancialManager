import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {EnrollmentService} from '../services/enrollment.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {

  topics = ['Angular', 'React', 'Vue'];
  submitted = false;
  errorMsg = '';

  userModel = new User(
    'rob',
    'd@d.com',
    1234567890,
    '',
    'morning',
    true);

  constructor(private _enrolmentService: EnrollmentService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    this._enrolmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success!', data),
        error => this.errorMsg = error.statusText
      );
  }
}
