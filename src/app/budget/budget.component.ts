import {Component, computed, signal} from '@angular/core';
import {BudgetMode} from './models';

/** Компонент основной страницы приложения */
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html'
})
export class BudgetComponent {
  /** Мод категории/операции */
  mode = signal<BudgetMode>('category');
  /** Переключен ли мод на категории */
  isCategory = computed<boolean>(() => this.mode() === 'category');

  /** Переключение мода */
  toggleMode(value: BudgetMode): void {    
    this.mode.set(value);
  }
}
