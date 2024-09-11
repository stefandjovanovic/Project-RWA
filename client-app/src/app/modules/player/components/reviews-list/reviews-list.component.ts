import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Review} from "../../interfaces/review.interface";
import {ActivatedRoute} from "@angular/router";
import {Subscription, take} from "rxjs";
import {AddReviewDialogComponent} from "../add-review-dialog/add-review-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PlayerService} from "../../services/player.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {selectUser, selectUsername} from "../../../auth/store/auth/auth.selectors";
import * as PlayerPageActions from "../../store/player-page/player-page.actions";
@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
  username: string = '';
  belongsToCurrentUser: boolean = false;
  alreadyReviewed: boolean = false;
  currentUserUsername: string = '';
  private paramsSubscription?: Subscription;

  @Input() reviews: Review[] = [];
  @Output() reviewAdded: EventEmitter<Review> =  new EventEmitter<Review>();

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.username = params['username'];
      this.store.select(selectUsername).pipe(take(1)).subscribe(username => {
        this.belongsToCurrentUser = this.username === username;
        this.currentUserUsername = username;
      });
    });
  }

  ngOnDestroy() {
    this.paramsSubscription?.unsubscribe();
  }

  ngOnChanges(){
    this.hasAlreadyReviewed();
  }

  addReview() {
    const dialogRef = this.dialog.open(AddReviewDialogComponent);
    dialogRef.afterClosed().subscribe((result: Review) => {
      this.store.dispatch(PlayerPageActions.postReview({review: result, username: this.username}));

      // this.playerService.ratePlayer(this.username, result.score, result.comment).subscribe({
      //   next: () => {
      //     //this.reviews.push(result);
      //     this.reviewAdded.emit(result);
      //     this.alreadyReviewed = true;
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   }
      // });
    });
  }


  getStars(rating: number): any[] {
    return Array(Math.round(rating)).fill(1);
  }

  hasAlreadyReviewed(){
    this.alreadyReviewed = false;
    this.reviews.forEach(review => {
      if(review.username === this.currentUserUsername){
        this.alreadyReviewed = true;
      }
    });
  }
}
