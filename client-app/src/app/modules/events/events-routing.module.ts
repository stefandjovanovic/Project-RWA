import {RouterModule, Routes} from "@angular/router";
import {EventsDisplayComponent} from "./components/events-display/events-display.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerAdminGuard} from "../auth/guards/player-admin.guard";
import {PlayerGuard} from "../auth/guards/player.guard";
import {EventNewComponent} from "./components/event-new/event-new.component";
import {AdminGuard} from "../auth/guards/admin.guard";
import {CourtEditComponent} from "./components/court-edit/court-edit.component";
import {NgModule} from "@angular/core";
import {CourtNewComponent} from "./components/court-new/court-new.component";
import {ManagerGuard} from "../auth/guards/manager.guard";
import {HallsComponent} from "./components/halls/halls.component";


const routes: Routes = [
  {path: '', component: EventsDisplayComponent, children: [], canActivate: [AuthGuard, PlayerAdminGuard]},
  {path: 'new/:courtId/:sport/:start/:end/:price', canActivate: [AuthGuard, PlayerGuard], component: EventNewComponent},
  {path: 'court/new', canActivate: [AuthGuard, AdminGuard], component: CourtNewComponent},
  {path: 'court/edit', canActivate: [AuthGuard, AdminGuard], component: CourtEditComponent},
  {path: 'halls', canActivate: [AuthGuard, ManagerGuard], component: HallsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
