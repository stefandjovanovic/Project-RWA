import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Challenge} from "../../interfaces/challenge.interface";
import {createReducer, on} from "@ngrx/store";
import * as ChallengesActions from "./challenges.actions";
import * as ResultsActions from "../results/results.actions";
import {ChallengeStatus} from "../../enums/challenge-status.enum";

export interface State extends EntityState<Challenge>{

}

export const adapter = createEntityAdapter<Challenge>();

export const initialState: State = adapter.getInitialState();

export const challengeReducer = createReducer(
  initialState,
  on(ChallengesActions.getChallengesSuccess, (state, {challenges}) => adapter.setAll(challenges, state)),
  on(ChallengesActions.createChallengeSuccess, (state, {challenge}) => adapter.addOne(challenge, state)),
  on(ChallengesActions.acceptChallengeSuccess, (state, {challengeId}) =>
    adapter.updateOne({id: challengeId, changes: {status: ChallengeStatus.ACCEPTED}}, state)
  ),
  on(ChallengesActions.rejectChallengeSuccess, (state, {challengeId}) =>
    adapter.updateOne({id: challengeId, changes: {status: ChallengeStatus.REJECTED}}, state)
  ),
  on(ResultsActions.submitResultSuccess, (state, {result}) =>
    adapter.updateOne({id: result.challengeId, changes: {resultSubmitted: true}}, state))
)
