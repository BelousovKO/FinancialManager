import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInService} from '../services/log-in.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {

  submitted = false;
  statusLogin = '';

  logInForm: FormGroup;

  get userName(): any {
    return this.logInForm.get('userName');
  }

  get userNameErrorMinlength(): any {
    return this.logInForm.get('userName').errors?.minlength;
  }

  get password(): any {
    return this.logInForm.get('password');
  }

  get passwordErrorMinlength(): any {
    return this.logInForm.get('password').errors?.minlength;
  }

  constructor(private fb: FormBuilder, private _logInService: LogInService) {
  }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): any {
    console.log(this.logInForm.value);
    this._logInService.register(this.logInForm.value)
      .subscribe(
        response => {
          this.statusLogin = response.status;
          response.status === 'OK' ? this.submitted = true : this.submitted = false;
        },
        error => console.error('Error! ', error)
      );
    this.statusLogin === 'OK' ? this.submitted = true : this.submitted = false;
  }
}

