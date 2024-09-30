import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {ResultRequest} from "../../../events/interfaces/result-request.interface";
import {createReducer, on} from "@ngrx/store";
import * as ResultsActions from "./results.actions";


export interface State extends EntityState<ResultRequest>{

}

export const adapter = createEntityAdapter<ResultRequest>();

export const initialState: State = adapter.getInitialState();

export const resultsReducer = createReducer(
  initialState,
  on(ResultsActions.getResultRequestsSuccess, (state, {resultRequests}) => adapter.setAll(resultRequests, state)),
  on(ResultsActions.acceptResultSuccess, (state, {challengeId}) => adapter.removeOne(challengeId, state)),
  on(ResultsActions.rejectResultSuccess, (state, {challengeId}) => adapter.removeOne(challengeId, state))
)
