import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../services/user-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public data: UserDataService) {
  }

  public costsBackground = this.data.stroke;

  ngOnInit(): void {
  }

}
