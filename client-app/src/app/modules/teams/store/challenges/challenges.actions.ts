import {createAction, props} from "@ngrx/store";
import {Challenge} from "../../interfaces/challenge.interface";
import {CreateChallenge} from "../../interfaces/create-challenge.interface";


export const getChallenges = createAction(
  '[Challenges] Get Challenges',
  props<{teamId: string}>()
);

export const getChallengesSuccess = createAction(
  '[Challenges] Get Challenges Success',
  props<{challenges: Challenge[]}>()
);

export const createChallenge = createAction(
  '[Challenges] Create Challenge',
  props<{challenge: CreateChallenge}>()
);

export const createChallengeSuccess = createAction(
  '[Challenges] Create Challenge Success',
  props<{challenge: Challenge}>()
);

export const acceptChallenge = createAction(
  '[Challenges] Join Challenge',
  props<{challengeId: string}>()
);

export const acceptChallengeSuccess = createAction(
  '[Challenges] Join Challenge Success',
  props<{challengeId: string}>()
);

export const rejectChallenge = createAction(
  '[Challenges] Reject Challenge',
  props<{challengeId: string}>()
);

export const rejectChallengeSuccess = createAction(
  '[Challenges] Reject Challenge Success',
  props<{challengeId: string}>()
);


