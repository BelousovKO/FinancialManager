import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from '../shared/user-name.validator';
import {PasswordValidator} from '../shared/password.validator';
import {RegistrationService} from '../services/registration.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {
  submitted = false;

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

  get consent(): any {
    return this.registrationForm.get('consent');
  }

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), forbiddenNameValidator]],
      email: ['', [Validators.required, Validators.maxLength(20), Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      consent: [false, Validators.required],
    }, {validator: PasswordValidator});
  }

  onSubmit(): any {
    this.submitted = true;
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success! ', response),
        error => console.error('Error! ', error)
      );
  }
}
