import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePasService} from '../services/change-pas.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  submitted = false;
  nameIsTaken = false;
  emailIsTaken = false;
  responseReceived = false;
  recovery: FormGroup;
  serverError = false;


  constructor(private fb: FormBuilder,
              public authorization: AuthorizationService,
              public _changePas: ChangePasService) {
  }

  get email(): any {
    return this.recovery.get('email');
  }

  ngOnInit(): void {
    this.recovery = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
    });
  }

  removeSpaceUserName(): void {
    let tempUserName: string = this.recovery.controls.userName.value;
    this.submitted = false;
    this.responseReceived = false;
    if (tempUserName.search(/\s/) !== -1) {
      tempUserName = tempUserName.replace(/\s/g, '');
      this.recovery.patchValue({
        userName: tempUserName,
      });
    }
    if (tempUserName.length > 0) {
      this.recovery.patchValue({
        email: '',
      });
    }
  }

  removeValueEmail(): void {
    let tempEmail: string = this.recovery.controls.email.value;
    this.submitted = false;
    this.responseReceived = false;
    if (tempEmail.search(/\s/) !== -1) {
      tempEmail = tempEmail.replace(/\s/g, '');
      this.recovery.patchValue({
        email: tempEmail,
      });
    }
    if (tempEmail.length > 0) {
      this.recovery.patchValue({
        userName: '',
      });
    }
  }

  checkValidEmail(): boolean {
    const tempEmail: string = this.recovery.controls.email.value;
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(tempEmail).toLowerCase());
  }

  disabledSubmit(): boolean {
    return ((this.recovery.controls.userName.value.length < 3 &&
      this.recovery.controls.email.value.length < 3) ||
      this.recovery.controls.userName.value.length > 20 ||
      this.recovery.controls.email.value.length > 40 ||
      this.recovery.controls.email.value.length > 0 && !this.checkValidEmail() ||
      (this.recovery.controls.email.value.length > 0 &&
        this.recovery.controls.userName.value.length > 0));
  }

  onSubmit(): any {
    if (this.recovery.controls.userName.value.length > 2) {
      this._changePas.sendTo(this.recovery.controls.userName.value)
        .subscribe(
          response => {
            this.resp(response);
          },
          error => {
            // console.error('Error! ', error);
            this.serverError = true;
          }
        );
    } else {
      this._changePas.sendTo(this.recovery.controls.email.value)
        .subscribe(
          response => {
            this.resp(response);
          },
          error => {
            // console.error('Error! ', error);
            this.serverError = true;
          }
        );
    }
    this.submitted = true;
  }

  resp(response): void {
    this.emailIsTaken = response.status === 'OK';
    this.responseReceived = true;
    if (this.emailIsTaken) {
      setTimeout(() => { this.authorization.recovery = false; }, 3000);
    }
  }
}
