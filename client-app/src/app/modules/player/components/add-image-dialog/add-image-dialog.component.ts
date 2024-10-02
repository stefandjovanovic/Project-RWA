import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ImageCroppedEvent, LoadedImage} from 'ngx-image-cropper';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as PlayerPageActions from "../../store/player-page/player-page.actions";
import * as PlayerPageSelectors from "../../store/player-page/player-page.selectors";
@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrl: './add-image-dialog.component.css'
})
export class AddImageDialogComponent {
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl  = '';
  isUploading = false;

  imageBinary?: File;


  constructor(public dialogRef: MatDialogRef<AddImageDialogComponent>,
              private store: Store<AppState>,
              private sanitizer: DomSanitizer) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;

  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    this.imageBinary = new File([event.blob!], 'image.png', {type: 'image/png'});
  }

  onSave(){

    if(!this.imageBinary){
      return;
    }
    this.isUploading = true;
    this.store.dispatch(PlayerPageActions.uploadProfilePicture({file: this.imageBinary!}));

    this.store.select(PlayerPageSelectors.selectUploadingPicture).subscribe((uploading) => {
      if(!uploading){
        this.isUploading = false;
        this.dialogRef.close();
      }
    })




  }

}
