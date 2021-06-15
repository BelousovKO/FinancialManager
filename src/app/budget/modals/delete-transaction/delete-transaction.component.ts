import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../services/user-data.service';
import {DateService} from '../../../services/date.service';
import {EditTransactionService} from '../../../services/edit-transaction.service';

@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.scss']
})
export class DeleteTransactionComponent implements OnInit {

  @Input() id: string;
  @Output() closeModalDelete: EventEmitter<any> = new EventEmitter();
  @Output() deleteTransaction: EventEmitter<any> = new EventEmitter();

  constructor(public userData: UserDataService,
              public dateService: DateService,
              public editTransaction: EditTransactionService) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.userData.loading = true;
    const token = localStorage.getItem('token');
    const body = {
      id: this.id,
      userId: this.userData.userId,
      token
    };
    this.editTransaction.delete(body)
      .subscribe(
        response => {
          this.userData.loading = false;
          if (response.status === 'OK') {
            this.userData.transactions = this.userData.transactions.filter(e => e.id !== this.id);
            this.dateService.date.next(this.dateService.date.value);
          }
        },
        error => console.error('Error! ', error)
      );
    this.deleteTransaction.emit();
    /*this.transactionSum = '0';*/
  }
}
