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
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'testForm', component: TestFormsComponent},
  {path: 'firstForm', component: LogInComponent},
  {path: 'registrationForm', component: RegistrationFormComponent},
  {path: '**', redirectTo: 'main'}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegistrationFormComponent,
    LogInFormComponent,
    TestFormsComponent,
    RegFormComponent,
    MainComponent,
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
