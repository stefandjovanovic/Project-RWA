import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Map, MapStyle, config, Marker} from '@maptiler/sdk';
import {Court} from "../../interfaces/court.interface";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as CourtsSelectors from "../../store/courts/courts.selectors";
import * as CourtsActions from "../../store/courts/courts.actions";
import * as AuthSelectors from "../../../auth/store/auth/auth.selectors";
import {CourtsService} from "../../services/courts.service";


@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrl: './events-map.component.css'
})
export class EventsMapComponent implements OnInit, OnDestroy{
  map: Map | undefined;

  courts: Court[] = [];
  showingCourts: boolean[] = [];
  storeSubscription?: Subscription;
  selectedSport: string = 'all';
  selectedCourt: string = 'all';

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  role?: Observable<string>

  constructor(private store: Store<AppState>, private courtsService: CourtsService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select(CourtsSelectors.selectCourts).subscribe(courts => {
      this.courts = courts;
      this.showingCourts = new Array(courts.length).fill(true);
      this.onShowChanged();
    });
    this.role = this.store.select(AuthSelectors.selectRole);
    this.store.dispatch(CourtsActions.loadCourts());


  }

  ngOnDestroy() {
    if(this.storeSubscription){
      this.storeSubscription.unsubscribe();
    }
  }

  addMarker(latitude: number, longitude: number, isHall: boolean, courtId: string){
    const markerColor = isHall ? "#a86932" : "#326da8";

    new Marker({color: markerColor})
      .setLngLat([longitude, latitude])
      .on('click', (e) => {
        console.log(e.lngLat)
        console.log(courtId);
      })
      .addTo(this.map!);
  }

  onShowChanged(){
    this.courts.forEach((court, index) => {
      if(this.selectedSport==='all' && this.selectedCourt==='all'){
        this.showingCourts[index] = true;
      }else if(this.selectedSport!=='all' && this.selectedCourt==='all'){
        this.showingCourts[index] = court.sport === this.selectedSport;
      }else if(this.selectedSport!=='all' && this.selectedCourt==='hall'){
        this.showingCourts[index] = court.sport === this.selectedSport && court.isHall;
      }else if(this.selectedSport!=='all' &&this.selectedCourt==='street'){
        this.showingCourts[index] = court.sport === this.selectedSport && !court.isHall;
      }else if(this.selectedSport==='all' && this.selectedCourt==='hall'){
        this.showingCourts[index] = court.isHall;
      }else{
        this.showingCourts[index] = !court.isHall;
      }
    })
  }

  onMarkerClick(clickedCourt: Court){
    this.courtsService.courtSelected.emit(clickedCourt);
  }


}
