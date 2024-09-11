import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, Subscription, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayerService} from "../../services/player.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PlayerDetails} from "../../interfaces/player-details.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {selectUsername} from "../../../auth/store/auth/auth.selectors";

@Component({
  selector: 'app-search-player-dialog',
  templateUrl: './search-player-dialog.component.html',
  styleUrl: './search-player-dialog.component.css'
})
export class SearchPlayerDialogComponent implements OnInit, OnDestroy {
  searchResult: PlayerDetails[] = [];

  searchSubscription?: Subscription;

  searchControl = new FormControl('');

  currentUsername: string = '';
  storeSubscription?: Subscription;

  constructor(public dialogRef: MatDialogRef<SearchPlayerDialogComponent>,
              private playerService: PlayerService,
              private store: Store<AppState>) {}

  ngOnInit(): void {

    this.storeSubscription = this.store.select(selectUsername).subscribe(username => {
      this.currentUsername = username;
    });

    this.searchSubscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter((term): term is string => term !== null && term !== undefined),
      distinctUntilChanged(),
      switchMap((term: string) => this.playerService.searchPlayers(term))
    ).subscribe((players: PlayerDetails[]) => {
      this.searchResult = [];
      players.forEach(player => {
        if(player.username !== this.currentUsername){
          this.searchResult.push(player);
        }
      })
    });
  }
  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if(this.searchSubscription) {
      this.searchSubscription?.unsubscribe();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
