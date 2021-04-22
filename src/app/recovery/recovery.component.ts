import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInService} from '../services/log-in.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  submitted = false;
  statusLogin = '';
  notEmpty = false;

  recovery: FormGroup;


  constructor(private fb: FormBuilder,
              private _logInService: LogInService,
              public authorization: AuthorizationService,
              public _authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    this.recovery = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
    });
  }

  removeSpaceUserName(): void {
    let tempUserName: string = this.recovery.controls.userName.value;

    if (tempUserName.search(/\s/) !== -1) {
      tempUserName = tempUserName.replace(/\s/g, '');
      this.recovery.patchValue({
        userName: tempUserName,
      });
    }
  }

  removeSpaceEmail(): void {
    let tempEmail: string = this.recovery.controls.email.value;

    if (tempEmail.search(/\s/) !== -1) {
      tempEmail = tempEmail.replace(/\s/g, '');
      this.recovery.patchValue({
        email: tempEmail,
      });
    }
  }

  onSubmit(): any {
    this._logInService.register(this.recovery.value)
      .subscribe(
        response => {
          this.statusLogin = response.status;
          if (response.status === 'OK') {
            this.authorization.login = true;
            this.authorization.username = this.recovery.controls.userName.value;
            localStorage.setItem('token', response.token);
          }
          this.recovery.setValue({
            userName: '',
            password: '',
          });
        },
        error => console.error('Error! ', error)
      );
  }
}
