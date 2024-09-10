import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.reducer";
import * as AuthActions from "./modules/auth/store/auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    //console.log('AppComponent ngOnInit');
    this.store.dispatch(AuthActions.autoLogin());
  }
}
