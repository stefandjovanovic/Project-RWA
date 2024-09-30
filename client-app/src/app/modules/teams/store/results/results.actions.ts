import {createAction, createReducer, props} from "@ngrx/store";
import {ResultRequest} from "../../../events/interfaces/result-request.interface";
import {SubmitResult} from "../../interfaces/submit-result.interface";

export const getResultRequests = createAction(
  '[Results] Get Result Requests',
  props<{teamId: string}>()
)

export const getResultRequestsSuccess = createAction(
  '[Results] Get Result Requests Success',
  props<{resultRequests: ResultRequest[]}>()
)

export const submitResult = createAction(
  '[Results] Submit Result',
  props<{result: SubmitResult}>()
)

export const submitResultSuccess = createAction(
  '[Results] Submit Result Success',
  props<{result: SubmitResult}>()
)

export const acceptResult = createAction(
  '[Results] Accept Result',
  props<{challengeId: string}>()
)

export const acceptResultSuccess = createAction(
  '[Results] Accept Result Success',
  props<{challengeId: string}>()
)

export const rejectResult = createAction(
  '[Results] Reject Result',
  props<{challengeId: string}>()
)

export const rejectResultSuccess = createAction(
  '[Results] Reject Result Success',
  props<{challengeId: string}>()
)
