import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  @Input() transactionTitle: string;
  @Output() closeEditNote: EventEmitter<any> = new EventEmitter();

  public newTransactionTitle: string;

  constructor() { }

  ngOnInit(): void {
    if (!this.transactionTitle) {
      this.transactionTitle = '';
    }
  }

  addTitle(event): void {
    this.newTransactionTitle = event.target.value;
  }

}
