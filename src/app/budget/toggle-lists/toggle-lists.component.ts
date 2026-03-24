import {Component, input, output, inject, computed} from '@angular/core';
import {UserDataService} from '../../services/user-data.service';
import { BudgetMode } from '../models';

/** Компонент переключения мода основной страницы - категории/операции */
@Component({
  selector: 'toggle-lists',
  templateUrl: './toggle-lists.component.html',
  styleUrls: ['./toggle-lists.component.scss']
})
export class ToggleListsComponent {
  private _userData = inject(UserDataService);

  /** Мод категории/операции */
  mode = input.required<BudgetMode>();
  /** Событие переключения мода */
  toggleMode = output<BudgetMode>();
  /** Активировано ли редактирование категорий */
  isEditState = computed<boolean>(() => this._userData.editState());
}
