import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-change-icon',
  templateUrl: './change-icon.component.html',
  styleUrls: ['./change-icon.component.scss']
})
export class ChangeIconComponent implements OnInit {

  @Input() iconCategory: string;
  @Input() color: string;
  @Output() closeChangeIcon: EventEmitter<any> = new EventEmitter();

  public newValues = [];
  public listIcon = ['favorite_border', 'language', 'pets', 'work', 'supervisor_account', 'flight_takeoff', 'settings_phone',
    'build', 'bookmark_add', 'commute', 'theaters', 'anchor', 'camera_enhance', 'rowing', 'maps_home_work', 'content_cut', 'biotech',
    'build', 'weekend', 'school', 'public', 'construction', 'sentiment_very_satisfied', 'emoji_events', 'cake', 'coronavirus',
    'sports_esports', 'self_improvement', 'female', 'male', 'sports_soccer', 'luggage', 'sports_basketball', 'emoji_food_beverage',
    'outdoor_grill', 'piano', 'restaurant', 'directions_car', 'celebration', 'fastfood', 'local_gas_station', 'hotel', 'liquor',
    'local_airport', 'theater_comedy', 'star_border', 'wifi', 'fitness_center', 'ac_unit', 'family_restroom', 'checkroom', 'child_care',
    'beach_access', 'child_friendly', 'smoking_rooms', 'add_shopping_cart', 'apartment', 'local_hospital', 'local_grocery_store', 'hiking',
    'savings', 'movie_creation', 'account_balance', 'attach_money'];

  constructor() { }

  ngOnInit(): void {
    this.newValues = [this.iconCategory, this.color];
    console.log(this.newValues);
  }

  backgroundColor(): string {
    return `background-color: ${this.color}`;
  }

  inputHandlerColor(event: any): any {
    this.color = event.target.value;
    this.newValues[1] = event.target.value;
  }
}
