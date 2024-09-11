import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddImageDialogComponent } from './components/add-image-dialog/add-image-dialog.component';
import { AddReviewDialogComponent } from './components/add-review-dialog/add-review-dialog.component';
import { EditBioDialogComponent } from './components/edit-bio-dialog/edit-bio-dialog.component';
import { PlayerPageComponent } from './components/player-page/player-page.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { SearchPlayerDialogComponent } from './components/search-player-dialog/search-player-dialog.component';
import {RouterModule} from "@angular/router";
import {PlayerGuard} from "../auth/guards/player.guard";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ImageCropperComponent} from "ngx-image-cropper";



@NgModule({
  declarations: [
    AddImageDialogComponent,
    AddReviewDialogComponent,
    EditBioDialogComponent,
    PlayerPageComponent,
    ReviewsListComponent,
    SearchPlayerDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'page/:username', canActivate: [PlayerGuard], component: PlayerPageComponent}
    ]),
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    ImageCropperComponent
  ]
})
export class PlayerModule { }
