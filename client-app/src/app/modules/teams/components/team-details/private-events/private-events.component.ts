import {Component, OnDestroy, OnInit} from '@angular/core';
import {Team} from "../../../interfaces/team.interface";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as TeamSelectors from '../../../store/teams/teams.selectors';
import * as PrivateEventsSelectors from '../../../store/private-events/private-events.selectors';
import * as PrivateEventsActions from '../../../store/private-events/private-events.actions';
import * as AuthSelectors from '../../../../auth/store/auth/auth.selectors';
import {SelectCourtDialogComponent} from "../../dialogs/select-court-dialog/select-court-dialog.component";
import {EventInterface} from "../../../../events/interfaces/event.inerface";
import {PrivateEvent} from "../../../interfaces/private-event.interface";

@Component({
  selector: 'app-private-events',
  templateUrl: './private-events.component.html',
  styleUrl: './private-events.component.css'
})
export class PrivateEventsComponent implements OnInit, OnDestroy{
  selectedTeam?: Team | null;
  teamSubscription?: Subscription;
  eventsSubscription?: Subscription;
  authSubscription?: Subscription;

  currentUserUsername: string = '';

  events: PrivateEvent[] = [];

  constructor(public dialog: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.teamSubscription = this.store.select(TeamSelectors.selectSelectedTeam).subscribe((team: Team | null) => {
      this.selectedTeam = team;
      if(team){
        this.store.dispatch(PrivateEventsActions.getPrivateEventsForTeam({teamId: team.id}));
      }
    });

    this.eventsSubscription = this.store.select(PrivateEventsSelectors.selectPrivateEvents).subscribe((events: PrivateEvent[]) => {
      this.events = events;
    });

    this.authSubscription = this.store.select(AuthSelectors.selectUser).subscribe((user) => {
      if (user) {
        this.currentUserUsername = user.username!;
      }
    });
  }

  ngOnDestroy() {
    if(this.teamSubscription){
      this.teamSubscription.unsubscribe();
    }
    if(this.eventsSubscription){
      this.eventsSubscription.unsubscribe();
    }
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }


  onCreateEvent(){
    const dialogRef = this.dialog.open(SelectCourtDialogComponent, {data: {
        teamId: this.selectedTeam?.id!,
        sport: this.selectedTeam?.sport!
      }});

  }

  joinEvent(event: PrivateEvent){
    this.store.dispatch(PrivateEventsActions.joinPrivateEvent({
      eventId: event.id,
      username: this.currentUserUsername
    }))
  }

  leaveEvent(event: PrivateEvent){
    this.store.dispatch(PrivateEventsActions.leavePrivateEvent({
      eventId: event.id,
      username: this.currentUserUsername
    }));
  }

  deleteEvent(event: PrivateEvent){
    this.store.dispatch(PrivateEventsActions.deletePrivateEvent({eventId: event.id}));
  }

  alreadyParticipating(event: PrivateEvent): boolean{
    let participate = false;
    event.participants.forEach((participant) => {
      if(participant === this.currentUserUsername){
        participate = true;
      }
    });
    return participate;
  }

  eventFull(event: PrivateEvent): boolean{
    return event.maxParticipants === event.participants.length;
  }
}
