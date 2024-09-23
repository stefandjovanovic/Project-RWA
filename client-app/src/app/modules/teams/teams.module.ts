import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { CreateChallengeComponent } from './components/create-challenge/create-challenge.component';
import { CreatePrivateEventComponent } from './components/create-private-event/create-private-event.component';
import { AddMembersDialogComponent } from './components/dialogs/add-members-dialog/add-members-dialog.component';
import { ChallengeResultDialogComponent } from './components/dialogs/challenge-result-dialog/challenge-result-dialog.component';
import { CreateTeamDialogComponent } from './components/dialogs/create-team-dialog/create-team-dialog.component';
import { EditTeamDialogComponent } from './components/dialogs/edit-team-dialog/edit-team-dialog.component';
import { SelectCourtDialogComponent } from './components/dialogs/select-court-dialog/select-court-dialog.component';
import { TableComponent } from './components/table/table.component';
import { BasketballTableComponent } from './components/table/basketball-table/basketball-table.component';
import { FootballTableComponent } from './components/table/football-table/football-table.component';
import { TennisTableComponent } from './components/table/tennis-table/tennis-table.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { ManageChallengesComponent } from './components/team-details/manage-challenges/manage-challenges.component';
import { PrivateEventsComponent } from './components/team-details/private-events/private-events.component';
import { TeamControlsComponent } from './components/team-details/team-controls/team-controls.component';
import { TeamMatchesListComponent } from './components/team-details/team-matches-list/team-matches-list.component';
import { UpcomingChallengesComponent } from './components/team-details/upcoming-challenges/upcoming-challenges.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { TeamsComponent } from './components/teams/teams.component';
import {TeamsRoutingModule} from "./teams-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {EventsModule} from "../events/events.module";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ChatComponent,
    CreateChallengeComponent,
    CreatePrivateEventComponent,
    AddMembersDialogComponent,
    ChallengeResultDialogComponent,
    CreateTeamDialogComponent,
    EditTeamDialogComponent,
    SelectCourtDialogComponent,
    TableComponent,
    BasketballTableComponent,
    FootballTableComponent,
    TennisTableComponent,
    TeamDetailsComponent,
    ManageChallengesComponent,
    PrivateEventsComponent,
    TeamControlsComponent,
    TeamMatchesListComponent,
    UpcomingChallengesComponent,
    TeamsListComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatProgressBar,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    EventsModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatSort,
    MatPaginator,
    MatSortHeader,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatBadgeModule,
    SharedModule
  ]
})
export class TeamsModule { }
