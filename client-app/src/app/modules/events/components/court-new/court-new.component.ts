import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import * as CourtsSelectors from "../../store/courts/courts.selectors";
import * as CourtsActions from "../../store/courts/courts.actions";

@Component({
  selector: 'app-court-new',
  templateUrl: './court-new.component.html',
  styleUrl: './court-new.component.css'
})
export class CourtNewComponent implements OnInit{
  isLoading?: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoading = this.store.select(CourtsSelectors.selectCourtsIsLoading);
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

    this.store.dispatch(CourtsActions.createCourt({
      sport: sport,
      name: name,
      address: address,
      image: imageLink
    }));

  }

}
