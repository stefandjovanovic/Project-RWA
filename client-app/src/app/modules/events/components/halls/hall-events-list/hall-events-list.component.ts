import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hall-events-list',
  templateUrl: './hall-events-list.component.html',
  styleUrl: './hall-events-list.component.css'
})
export class HallEventsListComponent {
  @Input() hallId?: string;
}
