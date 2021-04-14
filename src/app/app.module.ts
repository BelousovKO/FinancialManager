import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LogInComponent} from './log-in/log-in.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { TestFormsComponent } from './test-forms/test-forms.component';
import { RegFormComponent } from './reg-form/reg-form.component';

const appRoutes: Routes = [
  {path: 'loginForm', component: LogInFormComponent},
  {path: 'testForm', component: TestFormsComponent},
  {path: 'firstForm', component: LogInComponent},
  {path: 'regForm', component: RegFormComponent},
  {path: 'registrationForm', component: RegistrationFormComponent},
  {path: '**', redirectTo: 'loginForm'}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegistrationFormComponent,
    LogInFormComponent,
    TestFormsComponent,
    RegFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
