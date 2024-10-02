import {createAction, props} from "@ngrx/store";
import {EventInterface} from "../../interfaces/event.inerface";


export const loadHallEvents = createAction(
  '[Hall Events] Load Hall Events',
  props<{hallId: string}>()
)

export const loadHallEventsSuccess = createAction(
  '[Hall Events] Load Hall Events Success',
  props<{events: EventInterface[]}>()
)

export const deleteEvents = createAction(
  '[Hall Events] Delete Events',
  props<{eventId: string}>()
)

export const deleteEventsSuccess = createAction(
  '[Hall Events] Delete Events Success',
  props<{eventId: string}>()
)
