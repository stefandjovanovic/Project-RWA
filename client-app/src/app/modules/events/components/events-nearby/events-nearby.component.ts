import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as EventsActions from "../../store/events/events.actions";
import * as NearbyEventsActions from "../../store/nearby-events/nearby-events.actions";
import * as NearbyEventsSelectors from "../../store/nearby-events/nearby-events.selectors";
import  * as AuthSelectors from "../../../auth/store/auth/auth.selectors";
import {EventInterface} from "../../interfaces/event.inerface";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-events-nearby',
  templateUrl: './events-nearby.component.html',
  styleUrl: './events-nearby.component.css'
})
export class EventsNearbyComponent implements OnInit, OnDestroy{
  eventList: EventInterface[] = [];
  validAddress?: Observable<boolean>
  currentUsername: string = '';

  storeSub?: Subscription;
  authSub?: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.authSub = this.store.select(AuthSelectors.selectUser).subscribe((user) => {
      if(user) {
        this.currentUsername = user.username;
      }
    });

    this.storeSub = this.store.select(NearbyEventsSelectors.selectNearbyEvents).subscribe((events) => {
      this.eventList = events
        .filter((event) => event.eventOwnerUsername !== this.currentUsername
          && event.participants.indexOf(this.currentUsername) === -1)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    })
    this.validAddress = this.store.select(NearbyEventsSelectors.selectNearbyEventsAddressValid);

    this.store.dispatch(NearbyEventsActions.calculateUserLocation());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  quickJoinEvent(eventId: string) {
    this.store.dispatch(EventsActions.joinEvent({
      eventId: eventId,
      username: this.currentUsername
    }));
  }


}
