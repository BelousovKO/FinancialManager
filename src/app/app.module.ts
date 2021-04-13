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

const appRoutes: Routes = [
  {path: 'testForm', component: TestFormsComponent},
  {path: 'firstForm', component: LogInComponent},
  {path: 'regForm', component: RegistrationFormComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegistrationFormComponent,
    LogInFormComponent,
    TestFormsComponent,
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
