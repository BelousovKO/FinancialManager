import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../services/user-data.service';
import {AuthorizationService} from '../../../services/authorization.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  @Output() closeDemo: EventEmitter<any> = new EventEmitter();

  constructor(public authorization: AuthorizationService,
              public userData: UserDataService) { }

  ngOnInit(): void {
  }

  createDemoData(): void {
    localStorage.setItem('demo', 'true');
    this.closeDemo.emit();
    this.userData.createDemoData();
    this.authorization.login = false;
    this.authorization.recovery = false;
    this.authorization.reg = false;
  }
}
