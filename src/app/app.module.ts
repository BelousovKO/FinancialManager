import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LogInFormComponent} from './log-in-form/log-in-form.component';
import {RegFormComponent} from './reg-form/reg-form.component';
import {RecoveryComponent} from './recovery/recovery.component';
import {PointReplacerPipe} from './pipes/point-replacer.pipe';
import {MomentPipe} from './pipes/moment.pipe';
import { BudgetComponent } from './budget/budget.component';
import { HeaderComponent } from './budget/header/header.component';
import { DateControlComponent } from './budget/header/date-control/date-control.component';
import { CategoryListComponent } from './budget/category-list/category-list.component';
import { DonutChartComponent } from './budget/category-list/donut-chart/donut-chart.component';
import { CreateTransactionComponent } from './budget/modals/create-transaction/create-transaction.component';
import { EditNoteComponent } from './budget/modals/edit-note/edit-note.component';
import { EditDateTransactionComponent } from './budget/modals/edit-date-transaction/edit-date-transaction.component';
import { CalendarComponent } from './budget/modals/calendar/calendar.component';
import { ModalCalendarComponent } from './budget/modals/modal-calendar/modal-calendar.component';
import { DateFilteringComponent } from './budget/modals/date-filtering/date-filtering.component';
import { ChooseRangeComponent } from './budget/modals/choose-range/choose-range.component';
import { EditCategoryComponent } from './budget/modals/edit-category/edit-category.component';
import { ChangeIconComponent } from './budget/modals/change-icon/change-icon.component';

const appRoutes: Routes = [
  {path: '', component: BudgetComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInFormComponent,
    RegFormComponent,
    RecoveryComponent,
    PointReplacerPipe,
    MomentPipe,
    BudgetComponent,
    HeaderComponent,
    DateControlComponent,
    CategoryListComponent,
    DonutChartComponent,
    CreateTransactionComponent,
    EditNoteComponent,
    EditDateTransactionComponent,
    CalendarComponent,
    ModalCalendarComponent,
    DateFilteringComponent,
    ChooseRangeComponent,
    EditCategoryComponent,
    ChangeIconComponent,
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
