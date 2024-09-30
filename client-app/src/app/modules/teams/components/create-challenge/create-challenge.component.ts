import {Component, OnDestroy, OnInit} from '@angular/core';
import {Court} from "../../../events/interfaces/court.interface";
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as CourtsSelectors from "../../../events/store/courts/courts.selectors";
import * as CourtsActions from "../../../events/store/courts/courts.actions";
import * as ChallengesActions from "../../store/challenges/challenges.actions";
import {CreateChallenge} from "../../interfaces/create-challenge.interface";
import {MatSelectionListChange} from "@angular/material/list";
import {Sport} from "../../../events/enums/sport.enum";
import {EventsService} from "../../../events/services/events.service";


@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrl: './create-challenge.component.css'
})
export class CreateChallengeComponent implements OnInit, OnDestroy{

  zeroFormGroup = this._formBuilder.group({
    zeroCtrl: ['', Validators.required],
  });

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['']
  });

  courts: Court[] = [];
  courtsSubscription?: Subscription;

  challengerId: string = "";
  challengedId: string = "";

  courtId: string = "";
  sport: string = "";
  startTime: number = 0;
  endTime: number = 24;
  price: number = 0;
  occupiedSlots: number[] = [];
  selectedSlots: number[] = [];
  selectedSlotsChange :Subject<number[]> = new Subject<number[]>();
  selectedSlotsSubscription?: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private eventsService: EventsService) {}



  ngOnInit(): void {
    this.store.dispatch(CourtsActions.loadCourts());

    this.courtId = this.route.snapshot.params['courtId'];
    this.route.params.subscribe(params => {
      this.sport = params['sport'];
      this.challengedId = params['challengedId'];
      this.challengerId = params['challengerId'];

      this.courtsSubscription = this.store.select(CourtsSelectors.selectCourts).subscribe(courts => {
        this.courts = courts.filter(court => court.sport === this.sport);
      })

    });

    this.secondFormGroup.get('secondCtrl')!.setAsyncValidators(this.isSlotSelected.bind(this));
    this.secondFormGroup.get('secondCtrl')!.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    if (this.courtsSubscription) {
      this.courtsSubscription.unsubscribe();
    }
    if (this.selectedSlotsSubscription) {
      this.selectedSlotsSubscription.unsubscribe();
    }
  }


  dateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }

  onSelectedSlotsChange(selectedSlots: number[]): void {
    this.selectedSlots = selectedSlots;
    this.secondFormGroup.get('secondCtrl')!.updateValueAndValidity();
    this.selectedSlotsChange.next(this.selectedSlots);
  }

  isSlotSelected(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      // Subscribe to the selectedSlotsChange event
      this.selectedSlotsSubscription = this.selectedSlotsChange.subscribe(selectedSlots => {
        //console.log(selectedSlots);
        // If no slots are selected, return an error
        if (!selectedSlots || selectedSlots.length === 0) {
          resolve({'noSelectedSlots': true});
        } else {
          // If slots are selected, the control is valid
          resolve(null);
        }
      });
    });
  }

  finish(){
    const date: Date =new Date(this.firstFormGroup.value.firstCtrl!);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const startTime = this.selectedSlots[0];
    const endTime = this.selectedSlots[this.selectedSlots.length - 1] + 1;

    const newChallenge: CreateChallenge = {
      challengerTeamId: this.challengerId,
      challengedTeamId: this.challengedId,
      courtId: this.courtId,
      date: utcDate,
      startTime: startTime,
      endTime: endTime,
      sport: this.sport as Sport
    }

    this.store.dispatch(ChallengesActions.createChallenge({challenge: newChallenge}));


  }

  onDateChange(event: any) {
    this.occupiedSlots = [];
    const date = event.value;
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    const today = new Date();
    if(date.getDate() === today.getDate()){
      for(let i = 0; i <= today.getHours(); i++){
        this.occupiedSlots.push(i);
      }
    }

    this.eventsService.fetchScheduledSlots(this.courtId, utcDate)
      .subscribe({
        next: (data => {
          //console.log(data);
          data.slots.forEach(slot => {
            for (let i = slot.startTime; i < slot.endTime; i++) {
              this.occupiedSlots.push(i);
            }
          })
        }),
        error: (error => {
          console.log(error);
        })
      });
  }

  onSelectionChange(event: MatSelectionListChange) {
    const court = event.source._value![0] as unknown as Court;
    this.courtId = court.id;
    this.startTime = court.startTime;
    this.endTime = court.endTime;
    this.price = court.pricePerHour;

  }
}


