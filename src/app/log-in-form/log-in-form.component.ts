import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInService} from '../services/log-in.service';
import {AuthorizationService} from '../services/authorization.service';
import {AuthenticationService} from '../services/authentication.service';
import {UserDataService} from '../services/user-data.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {

  public submitted = false;
  public statusLogin = '';
  public serverError = false;

  public logInForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _logInService: LogInService,
              public authorization: AuthorizationService,
              private _authentication: AuthenticationService,
              public userData: UserDataService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('demo')) {
      setTimeout(() => {
        this.userData.demo = true;
        this.userData.createDemoData();
        return;
      });
    }
    this.logInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
    if (localStorage.getItem('token')) {
      const token = {
        token: ''
      };
      token.token = localStorage.getItem('token');
      this._authentication.auth(token)
        .subscribe(
          response => {
            this.statusLogin = response.status;
            if (response.status === 'OK') {
              this.userData.updateUserData(response);
              this.authorization.login = true;
              this.authorization.username = response.data;
            } else {
              this.submitted = false;
              this.authorization.login = false;
              this.authorization.username = '';
              this.statusLogin = '';
              localStorage.removeItem('token');
            }
          },
          () => this.serverError = true
        );
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
    this.userData.loading = true;
    this.logInForm.patchValue({
      password: this.logInForm.controls.password.value.toLowerCase(),
    });
    this._logInService.login(this.logInForm.value)
      .subscribe(
        response => {
          this.userData.loading = false;
          this.statusLogin = response.status;
          if (response.status === 'OK') {
            this.userData.updateUserData(response);
            this.authorization.login = true;
            this.authorization.username = this.logInForm.controls.userName.value;
            localStorage.setItem('token', response.token);
          }
          this.logInForm.setValue({
            userName: '',
            password: '',
          });
        },
        () => {
          this.userData.loading = false;
          this.serverError = true;
        }
      );
  }
}

