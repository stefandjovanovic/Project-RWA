import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Court} from "../../../interfaces/court.interface";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import * as HallsActions from "../../../store/halls/halls.actions";
import * as HallsSelectors from "../../../store/halls/halls.selectors";
import {HallsService} from "../../../services/halls.service";

@Component({
  selector: 'app-hall-edit',
  templateUrl: './hall-edit.component.html',
  styleUrl: './hall-edit.component.css'
})
export class HallEditComponent implements OnChanges, OnInit, OnDestroy{
  @Output() hallEdited = new EventEmitter<string>();
  @Input() selectedHall?: Court;

  isLoading?: Observable<boolean>;
  updatedSub?: Subscription;

  startTime: number = 0;
  endTime: number = 24;
  nameInput: string = "";
  sportInput: string = "";
  addressInput: string = "";
  pricePerHourInput: number = 0;
  imageInput: string = "";

  constructor(private store: Store<AppState>, private hallsService: HallsService) { }

  ngOnInit() {
    this.isLoading = this.store.select(HallsSelectors.selectHallsLoading);
    this.updatedSub = this.hallsService.successfullyUpdated.subscribe({
      next: () => {
        this.hallEdited.emit('over');
        console.log("Hall updated");
      }
    });
  }

  ngOnChanges() {
    this.startTime = this.selectedHall?.startTime!;
    this.endTime = this.selectedHall?.endTime!;
    this.nameInput = this.selectedHall?.name!;
    this.sportInput = this.selectedHall?.sport!;
    this.addressInput = this.selectedHall?.address!;
    this.pricePerHourInput = this.selectedHall?.pricePerHour!;
    this.imageInput = this.selectedHall?.image ?? "";
  }

  ngOnDestroy() {
    if (this.updatedSub) {
      this.updatedSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const sport = form.value.sport;
    const name = form.value.name;
    const address = form.value.address;
    const startTime = this.startTime;
    const endTime = this.endTime;
    const pricePerHour = form.value.pricePerHour;
    let imageLink: string  = "";
    if (form.value.image !== "") {
      imageLink = form.value.image;
    }

    this.store.dispatch(HallsActions.updateHall({
      id: this.selectedHall?.id!,
      name: name,
      sport: sport,
      address: address,
      image: imageLink,
      startTime: startTime,
      endTime: endTime,
      pricePerHour: pricePerHour
    }));
  }

}
