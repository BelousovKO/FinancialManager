import {Component} from '@angular/core';
import {AuthorizationService} from './services/authorization.service';
import {UserDataService} from './services/user-data.service';
import {DemoDataService} from './services/demo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authorization: AuthorizationService,
              public userData: UserDataService,
              public demoData: DemoDataService) {
  }
}
