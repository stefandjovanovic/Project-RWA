import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {PlayerDetails} from "../../interfaces/player-details.interface";
import {createReducer, on} from "@ngrx/store";
import * as PlayerPageActions from "./player-page.actions";


export interface State extends EntityState<PlayerDetails>{
  selectedPlayerUsername: string | null;
  pictureUploading: boolean;
}

export const adapter = createEntityAdapter<PlayerDetails>({
  selectId: (player: PlayerDetails) => player.username
});


export const initialState: State = adapter.getInitialState({
  selectedPlayerUsername: null,
  pictureUploading: false
});

export const playerPageReducer = createReducer(
  initialState,
  on(PlayerPageActions.loadPlayerPage, (state, {username}) => {
    return {
      ...state,
      selectedPlayerUsername: username
    }
  }),
  on(PlayerPageActions.playerDataLoaded, (state, playerDetails) => {
    return adapter.addOne(playerDetails, state)
  }),
  on(PlayerPageActions.editBioSuccess, (state, {username, bio}) => {
    return adapter.updateOne({id: username, changes: {bio}}, state)
  }),
  on(PlayerPageActions.uploadProfilePicture, (state) => {
    return {
      ...state,
      pictureUploading: true
    }
  }),
  on(PlayerPageActions.uploadProfilePictureSuccess, (state, {profilePicture}) => {
    return adapter.updateOne({id: state.selectedPlayerUsername!, changes: {profilePicture}}, {... state, pictureUploading: false})
  }),
  on(PlayerPageActions.postReviewSuccess, (state, {review, username}) => {
    return adapter.updateOne({id: username,
      changes: {reviews: [ ...state.entities[username]!.reviews, review ]}},
      state)
  }),
  on(PlayerPageActions.deleteProfilePictureSuccess, (state, {username}) => {
    return adapter.updateOne({id: username, changes: {profilePicture: ''}}, state)
  })
)
