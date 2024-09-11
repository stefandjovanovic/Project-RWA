import {createAction, props} from "@ngrx/store";
import {PlayerDetails} from "../../interfaces/player-details.interface";
import {Review} from "../../interfaces/review.interface";


export const loadPlayerPage = createAction(
  '[PlayerPage] Load PlayerPage',
  props<{ username: string }>()
)

export const playerDataLoaded = createAction(
  '[PlayerPage] Player Data Loaded',
  props<PlayerDetails>()
)

export const editBio = createAction(
  '[PlayerPage] Edit Bio',
  props<{
    username: string,
    bio: string
  }>()
)

export const editBioSuccess = createAction(
  '[PlayerPage] Edit Bio Success',
  props<{
    username: string,
    bio: string
  }>()
)

export const uploadProfilePicture = createAction(
  '[PlayerPage] Upload Profile Picture',
  props<{
    file: File,
  }>()
)

export const uploadProfilePictureSuccess = createAction(
  '[PlayerPage] Upload Profile Picture Success',
  props<{
    profilePicture: string,
  }>()
)

export const postReview = createAction(
  '[PlayerPage] Post Review',
  props<{
    review: Review ,
    username: string
  }>()
)

export const postReviewSuccess = createAction(
  '[PlayerPage] Post Review Success',
  props<{
    review: Review ,
    username: string
  }>()
)

export const deleteProfilePicture = createAction(
  '[PlayerPage] Delete Review',
  props<{
    username: string
  }>()
)

export const deleteProfilePictureSuccess = createAction(
  '[PlayerPage] Delete Review Success',
  props<{
    username: string
  }>()
)
