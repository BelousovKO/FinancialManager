import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserDataService} from '../../services/user-data.service';

@Component({
  selector: 'app-toggle-lists',
  templateUrl: './toggle-lists.component.html',
  styleUrls: ['./toggle-lists.component.scss']
})
export class ToggleListsComponent {

  @Input() content: string;
  @Output() changeList: EventEmitter<any> = new EventEmitter<any>();

  constructor(public userData: UserDataService) { }

}
