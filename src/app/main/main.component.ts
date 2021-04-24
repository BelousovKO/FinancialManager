import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public number1 = 100000000;
  public number2 = 200000000;

  constructor() { }

  ngOnInit(): void {
  }

}
