import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInService} from '../services/log-in.service';
import {AuthorizationService} from '../services/authorization.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {

  submitted = false;
  user = '';
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

  constructor(private fb: FormBuilder, private _logInService: LogInService, public authorization: AuthorizationService) {
  }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
    if (localStorage.getItem('userName') && localStorage.getItem('userPas')) {
      this.logInForm.patchValue({
        userName: localStorage.getItem('userName'),
        password: localStorage.getItem('userPas'),
      });
      this.onSubmit();
    }
  }

  removeSpaceUserName(): void {
    let tempUserName: string = this.logInForm.controls.userName.value;

    if (tempUserName.search(/\s/) !== -1) {
      tempUserName = tempUserName.replace(/\s/g, '');
      this.logInForm.patchValue({
        userName: tempUserName,
      });
    }
  }

  removeSpacePassword(): void {
    let tempPassword: string = this.logInForm.controls.password.value;

    if (tempPassword.search(/\s/) !== -1) {
      tempPassword = tempPassword.replace(/\s/g, '');
      this.logInForm.patchValue({
        password: tempPassword,
      });
    }
  }

  onSubmit(): any {
    this.logInForm.patchValue({
      password: this.logInForm.controls.password.value.toLowerCase(),
    });
    this._logInService.register(this.logInForm.value)
      .subscribe(
        response => {
          this.statusLogin = response.status;
          if (response.status === 'OK') {
            this.authorization.login = true;
            this.authorization.username = this.logInForm.controls.userName.value;
            this.user = this.logInForm.controls.userName.value;
            localStorage.setItem('userName', this.logInForm.controls.userName.value);
            localStorage.setItem('userPas', this.logInForm.controls.password.value);
            this.logInForm.setValue({
              userName: '',
              password: '',
            });
          } else {
            this.submitted = false;
          }
        },
        error => console.error('Error! ', error)
      );
  }

  exit(): any {
    this.authorization.login = false;
    this.authorization.username = '';
    localStorage.setItem('userName', '');
    localStorage.setItem('userPas', '');
  }
}

