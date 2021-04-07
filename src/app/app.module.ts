import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {RouterModule, Routes} from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';

const appRoutes: Routes = [
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
