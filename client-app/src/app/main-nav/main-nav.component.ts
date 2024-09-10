import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {
  selectAuthState,
  selectIsAuthenticated,
  selectRole,
  selectUser,
  selectUsername
} from "../modules/auth/store/auth/auth.selectors";
import {logout} from "../modules/auth/store/auth/auth.actions";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit, OnDestroy{
  private breakpointObserver = inject(BreakpointObserver);
  private storeSub?: Subscription;
  isAuthenticated: boolean = false;
  role?: string;
  username?: string;


  constructor(private store: Store<AppState>) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.storeSub = this.store.select(selectUser).subscribe(user => {
      this.isAuthenticated = !!user;
      this.role = user?.role;
      this.username = user?.username;
    })
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }


  onLogout(){
    this.store.dispatch(logout());
  }

  onSearchClick(){

  }

}
