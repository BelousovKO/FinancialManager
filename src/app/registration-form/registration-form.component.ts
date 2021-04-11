import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {forbiddenNameValidator} from '../shared/user-name.validator';
import {PasswordValidator} from '../shared/password.validator';
import {RegistrationService} from '../services/registration.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup;

  get userName(): any {
    return this.registrationForm.get('userName');
  }

  get email(): any {
    return this.registrationForm.get('email');
  }

  get alternateEmails(): any {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails(): any {
    this.alternateEmails.push(this.fb.control(''));
  }

  /*registrationForm = new FormGroup({
    userName: new FormControl('Vishwas'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });*/

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {
  }


  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: [''],
      }),
      alternateEmails: this.fb.array([])
    }, {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        checkedValue ? email.setValidators(Validators.required) : email.clearValidators();
        email.updateValueAndValidity();
      });
  }
                              /*заполнение части формы*/
  loadApiData(): any {
    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '123456',
      }
    });
  }

                              /*заполнение всех полей*/
  /*loadApiData(): any {
    this.registrationForm.setValue({
      userName: 'Bruce',
      email: 's@s.com',
      subscribe: [true],
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '123456',
      },
      alternateEmails: ''
    });
  }*/

  onSubmit(): any {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success! ', response),
        error => console.error('Error! ', error)
      );
  }
}
