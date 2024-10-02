import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Map, Marker} from '@maptiler/sdk';
import {Court} from "../../interfaces/court.interface";
import {Observable, startWith, Subscription} from "rxjs";
import {combineLatestWith, map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as CourtsSelectors from "../../store/courts/courts.selectors";
import * as CourtsActions from "../../store/courts/courts.actions";
import * as AuthSelectors from "../../../auth/store/auth/auth.selectors";
import {CourtsService} from "../../services/courts.service";
import {MatSelect} from "@angular/material/select";
import {CourtFilter} from "../../enums/court-filter.enum";
import {SportFilter} from "../../enums/sport-filter.enum";


@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrl: './events-map.component.css'
})
export class EventsMapComponent implements OnInit, OnDestroy{
  @ViewChild('sportSelect', { static: true }) sportSelect!: MatSelect;
  @ViewChild('courtSelect', { static: true }) courtSelect!: MatSelect;

  sportSelectObs: Observable<SportFilter> = new Observable<SportFilter>();
  courtSelectObs: Observable<CourtFilter>= new Observable<CourtFilter>();

  selectionSubscription?: Subscription;


  map: Map | undefined;

  courts: Court[] = [];
  showingCourts: boolean[] = [];
  storeSubscription?: Subscription;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  role?: Observable<string>

  constructor(private store: Store<AppState>, private courtsService: CourtsService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select(CourtsSelectors.selectCourts).subscribe(courts => {
      this.courts = courts;
      this.showingCourts = new Array(courts.length).fill(true);
    });
    this.role = this.store.select(AuthSelectors.selectRole);
    this.store.dispatch(CourtsActions.loadCourts());

    this.sportSelectObs = this.sportSelect.selectionChange.pipe(
      map(event => event.value),
      startWith(SportFilter.ALL)
    );

    this.courtSelectObs = this.courtSelect.selectionChange.pipe(
      map(event => event.value),
      startWith(CourtFilter.ALL)
    );

    this.selectionSubscription = this.sportSelectObs.pipe(
      combineLatestWith(this.courtSelectObs)
    ).subscribe(([sport, courtType]) => {
      this.filterCourts(sport, courtType);
    });


  }

  ngOnDestroy() {
    if(this.storeSubscription){
      this.storeSubscription.unsubscribe();
    }
    if (this.selectionSubscription){
      this.selectionSubscription.unsubscribe();
    }
  }




  filterCourts(sport: SportFilter, courtType: CourtFilter) {
    this.courts.forEach((court, index) => {
      let showCourt = true;

      if(sport !== SportFilter.ALL){
        showCourt = court.sport as string === sport as string;
      }

      if(courtType === CourtFilter.HALL) {
        showCourt = showCourt && court.isHall;
      }

      if(courtType === CourtFilter.STREET) {
        showCourt = showCourt && !court.isHall;
      }

      this.showingCourts[index] = showCourt;

    })
  }


  onMarkerClick(clickedCourt: Court){
    this.courtsService.courtSelected.emit(clickedCourt);
  }


}
