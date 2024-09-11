import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditBioDialogComponent} from "../edit-bio-dialog/edit-bio-dialog.component";
import {Subscription, take} from "rxjs";
import {AddImageDialogComponent} from "../add-image-dialog/add-image-dialog.component";
import {PlayerDetails} from "../../interfaces/player-details.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as PlayerPageActions from "../../store/player-page/player-page.actions";
import * as PlayerPageSelectors from "../../store/player-page/player-page.selectors";
import * as AuthSelectors from "../../../auth/store/auth/auth.selectors";
import {Review} from "../../interfaces/review.interface";
@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.css'
})
export class PlayerPageComponent implements OnInit, OnDestroy {
  username: string = "";
  belongsToCurrentUser: boolean = false;
  player: PlayerDetails = {
    id: '',
    username: '',
    bio: '',
    profilePicture: '',
    reviews: [],
    email: '',
    firstName: '',
    lastName: '',
    address: ''
  }
  private storeSub: Subscription = new Subscription();
  private paramsSubscription: Subscription = new Subscription();
  rating: number | undefined;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private bioDialog: MatDialog,
              private addImageDialog: MatDialog
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.username = params['username'];
      this.store.select(AuthSelectors.selectUsername).pipe(take(1)).subscribe(username => {
        this.belongsToCurrentUser = this.username === username;
      });
      this.storeSub = this.store.select(PlayerPageSelectors.selectPlayers).subscribe(players => {
        players.forEach(player => {
          if(player.username === this.username){
            this.player.id = player.id;
            this.player.username = player.username;
            this.player.bio = player.bio;
            this.player.profilePicture = player.profilePicture !== '' ? player.profilePicture : "./assets/player-avatar.png";
            this.player.reviews = player.reviews;
            this.player.email = player.email;
            this.player.firstName = player.firstName;
            this.player.lastName = player.lastName;
            this.player.address = player.address;
            this.calculateRating();
          }
        })
      });
      this.store.dispatch(PlayerPageActions.loadPlayerPage({username: this.username}));

    })
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

  calculateRating(){
    if(this.player.reviews.length === 0){
      this.rating = undefined;
      return;
    }
    this.rating = this.player.reviews.reduce((acc, curr) => acc + curr.rating, 0) / this.player.reviews.length;
  }

  addImage(){
    const dialogRef = this.addImageDialog.open(AddImageDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      //this.getUserData();
    });
  }

  onEditBio(){
    const dialogRef = this.bioDialog.open(EditBioDialogComponent, {
      data: {bio: this.player!.bio}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // this.playerService.editBio(result).subscribe(() => {
        //   this.player!.bio = result;
        // });
        this.store.dispatch(PlayerPageActions.editBio({bio: result, username: this.username}));
      }
    });
  }

  onReviewAdded(review: Review){
    this.player.reviews.push(review);
    this.calculateRating();
  }

  deleteImage(){
    this.store.dispatch(PlayerPageActions.deleteProfilePicture({username: this.username}));
  }


}
