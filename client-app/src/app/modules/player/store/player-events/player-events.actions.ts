import {createAction, props} from "@ngrx/store";
import {UserEventData} from "../../interfaces/user-event-data.interface";


export const getPlayerEvents = createAction(
  '[Player Events] Get Player Events'
)

export const getPlayerEventsSuccess = createAction(
  '[Player Events] Get Player Events Success',
  props<{events: UserEventData[]}>()
)
