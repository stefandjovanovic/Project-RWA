import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Court} from "../../interfaces/court.interface";
import {EventInterface} from "../../interfaces/event.inerface";
import {CourtsService} from "../../services/courts.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as EventsSelectors from "../../store/events/events.selectors";
import * as EventsActions from "../../store/events/events.actions";
import * as AuthSelectors from "../../../auth/store/auth/auth.selectors";

@Component({
  selector: 'app-court-events',
  templateUrl: './court-events.component.html',
  styleUrl: './court-events.component.css'
})
export class CourtEventsComponent implements OnInit, OnDestroy{
  selectedCourt: Court | null =  null;
  selectedCourtSubscription?: Subscription;
  storeSubscription?: Subscription;
  authSubscription?: Subscription;

  currentUsername: string = '';

  eventList: EventInterface[] = [];

  constructor(
    private courtsService: CourtsService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.storeSubscription = this.store.select(EventsSelectors.selectEvents).subscribe(
      events => {
        this.eventList = events;
      }
    );

    this.storeSubscription = this.store.select(AuthSelectors.selectUser).subscribe(
      user => {
        if(user){
          this.currentUsername = user.username;
        }
      }
    );

    this.selectedCourtSubscription = this.courtsService.courtSelected.subscribe(
      court => {
        this.selectedCourt = court;
        //fetch events for court
        this.store.dispatch(EventsActions.loadEvents({courtId: court.id}));
      }
    );

    // this.eventJoinedSubscription = this.eventsService.eventJoinedNearbyToDetail.subscribe( data =>{
    //   if(this.selectedCourt?.id === data.courtId){
    //     this.eventList.forEach(event => {
    //       if(event.id === data.eventId){
    //         event.participants.push({
    //           appUserId: this.authService.user.value!.id,
    //           username: this.authService.user.value!.username
    //         });
    //       }
    //     })
    //   }
    // });

  }

  ngOnDestroy() {
    if (this.selectedCourtSubscription) {
      this.selectedCourtSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  joinEvent(event: EventInterface) {
    this.store.dispatch(EventsActions.joinEvent({eventId: event.id, username: this.currentUsername}));
  }

  leaveEvent(event: EventInterface) {
    this.store.dispatch(EventsActions.leaveEvent({id: event.id, username: this.currentUsername}));
  }

  checkToJoin(event: EventInterface) {
    if(event.maxParticipants === event.participants.length){
      return false;
    }
    let canJoin = true;
    event.participants.forEach(participant => {
      if (participant === this.currentUsername){
        canJoin = false;
      }
    })
    return canJoin;
  }
  checkToLeave(event: EventInterface) {
    let canLeave = true;
    if(this.currentUsername === event.eventOwnerUsername){
      return true;
    }
    event.participants.forEach(participant => {
      if (participant === this.currentUsername){
        canLeave = false;
      }
    })
    return canLeave;
  }

  hasExpired(event: EventInterface) {
    const today = new Date();
    const hours = today.getHours();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    if(eventDate < today){
      return true;
    }
    if(eventDate.getDate() === today.getDate()
      && eventDate.getMonth() === today.getMonth()
      && eventDate.getFullYear() === today.getFullYear()
      && event.startTime < hours){
      return true;
    }
    return false;

  }

  updateNearbyEventsLeaving(event: EventInterface){


  }



}
