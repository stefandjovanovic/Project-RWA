import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {Observable} from "rxjs";
import {selectRole} from "../../../auth/store/auth/auth.selectors";

@Component({
  selector: 'app-events-display',
  templateUrl: './events-display.component.html',
  styleUrl: './events-display.component.css'
})
export class EventsDisplayComponent implements OnInit {
  role: Observable<string> = new Observable()

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.role = this.store.select(selectRole);
  }

}
