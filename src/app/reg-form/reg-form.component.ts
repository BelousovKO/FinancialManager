import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from '../shared/user-name.validator';
import {PasswordValidator} from '../shared/password.validator';
import {RegistrationService} from '../services/registration.service';
import {CheckNameService} from '../services/check-name.service';
import {AuthorizationService} from '../services/authorization.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {
  submitted = false;
  nameIsTaken = false;

  registrationForm: FormGroup;

  get userName(): any {
    return this.registrationForm.get('userName');
  }

  get userNameMinLength(): any {
    return this.userName.errors?.minlength;
  }

  get userNameMaxLength(): any {
    return this.userName.errors?.maxlength;
  }

  get forbiddenName(): any {
    return this.userName.errors?.forbiddenName;
  }

  get email(): any {
    return this.registrationForm.get('email');
  }

  get emailMaxLength(): any {
    return this.email.errors?.maxlength;
  }

  get emailInvalid(): any {
    return this.email.errors?.email;
  }

  get password(): any {
    return this.registrationForm.get('password');
  }

  get passwordMaxLength(): any {
    return this.password.errors?.maxlength;
  }

  get passwordMinLength(): any {
    return this.password.errors?.minlength;
  }

  get consent(): any {
    return this.registrationForm.get('consent');
  }

  constructor(private fb: FormBuilder,
              private _registrationService: RegistrationService,
              private _checkNameService: CheckNameService,
              public authorization: AuthorizationService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), forbiddenNameValidator]],
      email: ['', [Validators.required, Validators.maxLength(40), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required],
      consent: [false, Validators.required],
    }, {validator: PasswordValidator});
  }

  checkName(userName): void {
    this._checkNameService.checking(userName)
      .subscribe(
        response => {
          console.log('Success! ', response);
          if (response.status === 'CANCEL') {
            this.nameIsTaken = true;
          }
        },
        error => console.error('Error! ', error)
      );
  }

  onSubmit(): any {
    this.submitted = true;
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => { if (response.status === 'OK'){
          this.authorization.login = true;
          this.authorization.reg = false;
          this.authorization.username = this.registrationForm.controls.userName.value;
          localStorage.setItem('userName', this.registrationForm.controls.userName.value);
          localStorage.setItem('userPas', this.registrationForm.controls.password.value);
        }},
        error => console.error('Error! ', error)
      );
  }
}
