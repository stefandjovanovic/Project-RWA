import {Component, OnDestroy, OnInit} from '@angular/core';
import {Team} from "../../../interfaces/team.interface";
import {Subscription} from "rxjs";
import {Challenge} from "../../../interfaces/challenge.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import * as ChallengesActions from "../../../store/challenges/challenges.actions";
import * as ChallengesSelectors from "../../../store/challenges/challenges.selectors";
import * as TeamsSelectors from "../../../store/teams/teams.selectors";

@Component({
  selector: 'app-upcoming-challenges',
  templateUrl: './upcoming-challenges.component.html',
  styleUrl: './upcoming-challenges.component.css'
})
export class UpcomingChallengesComponent implements OnInit, OnDestroy{
  selectedTeam?: Team;
  selectedTeamSubscription?: Subscription;

  acceptedChallenges: Challenge[] = [];
  acceptedChallengesSubscription?: Subscription;

  rejectedChallenges: Challenge[] = [];
  rejectedChallengesSubscription?: Subscription;

  completedChallenges: Challenge[] = [];
  completedChallengesSubscription?: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.selectedTeamSubscription = this.store.select(TeamsSelectors.selectSelectedTeam).subscribe(team => {
      if (team){
        this.selectedTeam = team;
        this.store.dispatch(ChallengesActions.getChallenges({teamId: team.id}));
      }
    });

    this.acceptedChallengesSubscription = this.store.select(ChallengesSelectors.selectAcceptedChallenges).subscribe(challenges => {
      this.acceptedChallenges = challenges;
    });

    this.rejectedChallengesSubscription = this.store.select(ChallengesSelectors.selectRejectedChallenges).subscribe(challenges => {
      this.rejectedChallenges = challenges;
    });

    this.completedChallengesSubscription = this.store.select(ChallengesSelectors.selectCompletedChallenges).subscribe(challenges => {
      this.completedChallenges = challenges;
    });

  }

  ngOnDestroy() {
    if (this.selectedTeamSubscription) {
      this.selectedTeamSubscription.unsubscribe();
    }
    if (this.acceptedChallengesSubscription) {
      this.acceptedChallengesSubscription.unsubscribe();
    }
    if (this.rejectedChallengesSubscription) {
      this.rejectedChallengesSubscription.unsubscribe();
    }
    if (this.completedChallengesSubscription) {
      this.completedChallengesSubscription.unsubscribe();
    }

  }
}
