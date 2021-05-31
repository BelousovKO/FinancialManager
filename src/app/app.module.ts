import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LogInComponent} from './log-in/log-in.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {LogInFormComponent} from './log-in-form/log-in-form.component';
import {TestFormsComponent} from './test-forms/test-forms.component';
import {RegFormComponent} from './reg-form/reg-form.component';
import {MainComponent} from './main/main.component';
import {RecoveryComponent} from './recovery/recovery.component';
import {PointReplacerPipe} from './pipes/point-replacer.pipe';
import {DonutChartComponent} from './donut-chart/donut-chart.component';
import {MomentPipe} from './pipes/moment.pipe';
import {CostsPageComponent} from './costs-page/costs-page.component';
import {CalendarComponent} from './calendar/calendar.component';
import {ChooseRangeComponent} from './choose-range/choose-range.component';
import {ModalTransactionComponent} from './modal-transaction/modal-transaction.component';
import { HeaderComponent } from './header/header.component';
import { DateControlComponent } from './date-control/date-control.component';
import { ModalDateFilterComponent } from './modal-date-filter/modal-date-filter.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

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
    RecoveryComponent,
    PointReplacerPipe,
    DonutChartComponent,
    MomentPipe,
    CostsPageComponent,
    CalendarComponent,
    ChooseRangeComponent,
    ModalTransactionComponent,
    HeaderComponent,
    DateControlComponent,
    ModalDateFilterComponent,
    TransactionListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PointReplacerPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
