import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import {HallsService} from "../../../services/halls.service";
import * as HallsActions from "../../../store/halls/halls.actions";
import * as HallsSelectors from "../../../store/halls/halls.selectors";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-hall-new',
  templateUrl: './hall-new.component.html',
  styleUrl: './hall-new.component.css'
})
export class HallNewComponent implements OnInit, OnDestroy{

  @Output() hallCreated = new EventEmitter<string>();

  isLoading?: Observable<boolean>;

  startTime: number = 0;
  endTime: number = 24;

  hallsSub?: Subscription

  constructor(private store: Store<AppState>, private hallsService: HallsService) {}

  ngOnInit(): void {
    this.isLoading = this.store.select(HallsSelectors.selectHallsLoading);
    this.hallsSub = this.hallsService.successfullyCreated.subscribe(() => {
      this.hallCreated.emit('over');
    });
  }

  ngOnDestroy() {
    if (this.hallsSub) {
      this.hallsSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm){
    if(!form || form.invalid){
      return;
    }
    const sport = form.value.sport;
    const name = form.value.name;
    const address = form.value.address;
    const startTime = this.startTime;
    const endTime = this.endTime;
    const pricePerHour = form.value.pricePerHour;
    let imageLink: string  = "";
    if(form.value.image !== ""){
      imageLink = form.value.image;
    }
    this.store.dispatch(HallsActions.createHall({
      sport: sport,
      name: name,
      address: address,
      startTime: startTime,
      endTime: endTime,
      pricePerHour: pricePerHour,
      image: imageLink
    }))

  }


}
