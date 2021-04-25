import {Component, OnInit} from '@angular/core';
import {reduce} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor() {
  }

  public income = 0;
  public costs = [100, 100, 100];
  public costsAll = this.costs.reduce((total, amount) => {
    return total + amount;
  });
  public coefficient = 100 / this.costsAll;


  ngOnInit(): void {
  }


}
