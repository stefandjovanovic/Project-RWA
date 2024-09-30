import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import {AuthEffects} from "./modules/auth/store/auth/auth.effects";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {AuthInterceptorService} from "./modules/auth/services/auth-interceptor.service";
import {AdminPanelEffects} from "./modules/auth/store/admin-panel/admin-panel.effects";
import {PlayerPageEffects} from "./modules/player/store/player-page/player-page.effects";
import {CourtsEffects} from "./modules/events/store/courts/courts.effects";
import {HallsEffects} from "./modules/events/store/halls/halls.effects";
import {EventsEffects} from "./modules/events/store/events/events.effects";
import {NearbyEventsEffects} from "./modules/events/store/nearby-events/nearby-events.effects";
import {TeamsEffects} from "./modules/teams/store/teams/teams.effects";
import {PrivateEventsEffects} from "./modules/teams/store/private-events/private-events.effects";
import {ChallengesEffects} from "./modules/teams/store/challenges/challenges.effects";
import {ResultsEffects} from "./modules/teams/store/results/results.effects";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      AuthEffects,
      AdminPanelEffects,
      PlayerPageEffects,
      CourtsEffects,
      HallsEffects,
      EventsEffects,
      NearbyEventsEffects,
      TeamsEffects,
      PrivateEventsEffects,
      ChallengesEffects,
      ResultsEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
