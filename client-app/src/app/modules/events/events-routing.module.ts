import {RouterModule, Routes} from "@angular/router";
import {EventsDisplayComponent} from "./components/events-display/events-display.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerAdminGuard} from "../auth/guards/player-admin.guard";
import {PlayerGuard} from "../auth/guards/player.guard";
import {EventNewComponent} from "./components/event-new/event-new.component";
import {AdminGuard} from "../auth/guards/admin.guard";
import {CourtEditComponent} from "./components/court-edit/court-edit.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {path: '', component: EventsDisplayComponent, children: [], canActivate: [AuthGuard, PlayerAdminGuard]},
  {path: 'new/:courtId/:sport/:start/:end/:price', canActivate: [AuthGuard, PlayerGuard], component: EventNewComponent},
  {path: 'court/new', canActivate: [AuthGuard, AdminGuard], component: EventNewComponent},
  {path: 'court/edit', canActivate: [AuthGuard, AdminGuard], component: CourtEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
