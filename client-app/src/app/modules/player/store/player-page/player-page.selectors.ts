import * as fromPlayerPage from './player-page.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectPlayerPageState = (state: AppState) => state.playerPage;

export const selectPlayers = createSelector(
  selectPlayerPageState,
  fromPlayerPage.adapter.getSelectors().selectAll
);

export const selectUploadingPicture = createSelector(
  selectPlayerPageState,
  (state) => state.pictureUploading
);
