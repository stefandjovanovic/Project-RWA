import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {UserEventData} from "../../interfaces/user-event-data.interface";
import * as PlayerEventsActions from "../../store/player-events/player-events.actions";
import * as PlayerEventsSelectors from "../../store/player-events/player-events.selectors";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-player-events',
  templateUrl: './player-events.component.html',
  styleUrl: './player-events.component.css'
})
export class PlayerEventsComponent implements OnInit, OnDestroy{
  events: UserEventData[] = [];

  storeSub: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(PlayerEventsActions.getPlayerEvents());
    this.storeSub = this.store.select(PlayerEventsSelectors.selectPlayerEvents).subscribe(events => {
      this.events = events.sort((a, b) => (new Date(a.day)).getTime() - (new Date(b.day)).getTime());
    });
  }

  ngOnDestroy() {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
