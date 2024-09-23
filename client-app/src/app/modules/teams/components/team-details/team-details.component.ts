import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Team} from "../../interfaces/team.interface";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as AuthSelectors from "../../../auth/store/auth/auth.selectors";
import * as TeamsSelectors from "../../store/teams/teams.selectors";
import * as TeamsActions from "../../store/teams/teams.actions";

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsComponent implements OnInit, OnDestroy{
  selectedTeam: Team | null = null;
  storeSub?: Subscription;
  @Output() teamDeleted = new EventEmitter<boolean>();
  isCaptain = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select(AuthSelectors.selectUser).subscribe(user => {
      if (user) {
        this.store.select(TeamsSelectors.selectSelectedTeam).subscribe(team => {
          this.selectedTeam = team;
          if(team){
            this.isCaptain = team.captainUsername === user.username;
          }
        });
      }
    });
  }


  ngOnDestroy() {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  onRemove(username: string) {
    this.store.dispatch(TeamsActions.removeMember({
      teamId: this.selectedTeam!.id,
      username: username
    }));
  }

}
