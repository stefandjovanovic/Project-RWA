import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {PlayerDetails} from "../../../../player/interfaces/player-details.interface";
import {debounceTime, distinctUntilChanged, filter, Subscription, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamsService} from "../../../services/teams.service";
import {PlayerService} from "../../../../player/services/player.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeamMember} from "../../../interfaces/team-member.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import * as TeamsSelectors from '../../../store/teams/teams.selectors';
import * as TeamsActions from '../../../store/teams/teams.actions';

@Component({
  selector: 'app-add-members-dialog',
  templateUrl: './add-members-dialog.component.html',
  styleUrl: './add-members-dialog.component.css'
})
export class AddMembersDialogComponent implements OnInit, OnDestroy{
  searchResult: PlayerDetails[] = [];

  searchSubscription?: Subscription;
  storeSub?: Subscription;

  searchControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<AddMembersDialogComponent>,
              private teamsService: TeamsService,
              private playerService: PlayerService,
              private _snackBar: MatSnackBar,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public currentMembers: TeamMember[]) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter((term): term is string => term !== null && term !== undefined),
      distinctUntilChanged(),
      switchMap((term: string) => this.playerService.searchPlayers(term))
    ).subscribe((players: PlayerDetails[]) => {
      this.searchResult = [];
      players.forEach(player => {
        if( this.currentMembers &&
          !this.currentMembers.find(member => member.username === player.username)){
          this.searchResult.push(player);
        }
      })
    });

    this.storeSub = this.store.select(TeamsSelectors.selectSelectedTeam).subscribe(team => {
      if(!team){
        return;
      }
      this.currentMembers = team.members;

    })

  }
  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPlayer(player: PlayerDetails){
    this.store.select(TeamsSelectors.selectSelectedTeamId).subscribe(selectedTeamId => {
      if(!selectedTeamId) {
        return;
      }

      this.store.dispatch(TeamsActions.addMember({teamId: selectedTeamId, username: player.username}));

    });


    // this.teamsService.addMemberToTeam(teamId, player.username).subscribe({
    //   next: (response) => {
    //     this.currentMembers?.push({
    //       username: player.username,
    //       displayName: player.displayName,
    //       image: player.image,
    //       bio: player.bio,
    //       address: player.address,
    //     });
    //     this.searchResult = this.searchResult.filter(p => p.username !== player.username);
    //     this._snackBar.open(player.displayName+' added to team', 'close', {duration: 3000})
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });


  }

}
