import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, Subscription, switchMap} from "rxjs";
import {Challenge} from "../../../interfaces/challenge.interface";
import {Team} from "../../../interfaces/team.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import {TeamsService} from "../../../services/teams.service";
import * as ChallengesActions from "../../../store/challenges/challenges.actions";
import * as ChallengesSelectors from "../../../store/challenges/challenges.selectors";
import * as TeamsSelectors from "../../../store/teams/teams.selectors";
import * as ResultsActions from "../../../store/results/results.actions";
import * as ResultsSelectors from "../../../store/results/results.selectors";
import {ChallengeResultDialogComponent} from "../../dialogs/challenge-result-dialog/challenge-result-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ResultRequest} from "../../../../events/interfaces/result-request.interface";

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrl: './manage-challenges.component.css'
})
export class ManageChallengesComponent implements OnInit, OnDestroy{
  selectedTeam?: Team;
  selectedTeamSubscription?: Subscription;

  searchResult: Team[] = [];
  searchSubscription?: Subscription;

  pendingChallenges: Challenge[] = [];
  pendingChallengesSubscription?: Subscription;

  challengesResults: Challenge[] = [];
  challengesResultsSubscription?: Subscription;

  resultRequests: ResultRequest[] = [];
  resultRequestsSubscription?: Subscription;

  searchControl = new FormControl('');

  constructor(private store: Store<AppState>,
              private teamsService: TeamsService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.selectedTeamSubscription = this.store.select(TeamsSelectors.selectSelectedTeam).subscribe(team => {
      if(team) {
        this.selectedTeam = team;
        this.store.dispatch(ResultsActions.getResultRequests({teamId: team.id}));
      }
    });

    this.pendingChallengesSubscription = this.store.select(ChallengesSelectors.selectPendingChallenges).subscribe(challenges => {
      this.pendingChallenges = challenges;
    });

    this.resultRequestsSubscription = this.store.select(ResultsSelectors.selectResultRequests).subscribe(resultRequests => {
      this.resultRequests = resultRequests;
    });

    this.challengesResultsSubscription = this.store.select(ChallengesSelectors.selectChallengesResults).subscribe(challenges => {
      this.challengesResults = challenges;
    });

    this.searchSubscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter((term): term is string => term !== null && term !== undefined),
      distinctUntilChanged(),
      switchMap((term: string) => this.teamsService.searchTeams(term))
    ).subscribe((teams: Team[]) => {
      this.searchResult = teams.filter(team => team.id !== this.selectedTeam?.id && team.sport === this.selectedTeam?.sport);
    });


  }

  ngOnDestroy() {
    if(this.selectedTeamSubscription) {
      this.selectedTeamSubscription.unsubscribe();
    }

    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    if(this.pendingChallengesSubscription) {
      this.pendingChallengesSubscription.unsubscribe();
    }

    if(this.resultRequestsSubscription) {
      this.resultRequestsSubscription.unsubscribe();
    }

    if(this.challengesResultsSubscription) {
      this.challengesResultsSubscription.unsubscribe();
    }
  }

  acceptChallenge(challenge: Challenge){
    this.store.dispatch(ChallengesActions.acceptChallenge({challengeId: challenge.id}));
  }

  rejectChallenge(challenge: Challenge){
    this.store.dispatch(ChallengesActions.rejectChallenge({challengeId: challenge.id}));
  }

  reportResult(challenge: Challenge){
    this.matDialog.open(ChallengeResultDialogComponent, {
      data: {
        challenge
      }
    });
  }

  acceptResult(resultRequest: ResultRequest){
    this.store.dispatch(ResultsActions.acceptResult({challengeId: resultRequest.challengeId}));
  }

  rejectResult(resultRequest: ResultRequest){
    this.store.dispatch(ResultsActions.rejectResult({challengeId: resultRequest.challengeId}));
  }

}
