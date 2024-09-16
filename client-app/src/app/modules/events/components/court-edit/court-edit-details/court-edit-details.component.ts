import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Court} from "../../../interfaces/court.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import * as CourtsActions from "../../../store/courts/courts.actions";
import * as CourtsSelectors from "../../../store/courts/courts.selectors";
import {NgForm} from "@angular/forms";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-court-edit-details',
  templateUrl: './court-edit-details.component.html',
  styleUrl: './court-edit-details.component.css'
})
export class CourtEditDetailsComponent implements OnInit, OnChanges, OnDestroy {
  isLoading?: Observable<boolean>;
  @Input() selectedCourt?: Court;
  @Output() editFinished = new EventEmitter<string>();
  addressInput = '';
  nameInput = '';
  imageInput = '';
  typeInput ='';
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private actions$: Actions) {}

  ngOnInit() {
    this.isLoading = this.store.select(CourtsSelectors.selectCourtsIsLoading);

    this.actions$.pipe(
      ofType(CourtsActions.courtUpdateSuccess),
      takeUntil(this.unsubscribe$)
    ).subscribe(action => {
      this.editFinished.next('over');
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.addressInput = this.selectedCourt!.address;
    this.nameInput = this.selectedCourt!.name;
    this.imageInput = this.selectedCourt!.image ?? '';
    this.typeInput = this.selectedCourt!.sport;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }
    const sport = form.value.sport;
    const name = form.value.name;
    const address = form.value.address;
    let imageLink: string  = "";
    if(form.value.image !== ""){
      imageLink = form.value.image;
    }
    this.store.dispatch(CourtsActions.updateCourt({
      id: this.selectedCourt!.id,
      sport: sport,
      name: name,
      address: address,
      image: imageLink
    }))



  }

}
