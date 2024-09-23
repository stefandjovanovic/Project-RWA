import {RouterModule, Routes} from "@angular/router";
import {TeamsComponent} from "./components/teams/teams.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerGuard} from "../auth/guards/player.guard";
import {TableComponent} from "./components/table/table.component";
import {CreatePrivateEventComponent} from "./components/create-private-event/create-private-event.component";
import {CreateChallengeComponent} from "./components/create-challenge/create-challenge.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  { path: '', component: TeamsComponent, children:[], canActivate: [AuthGuard, PlayerGuard]},
  { path: 'table', canActivate: [], component: TableComponent},
  { path: 'privateEvent/create/:courtId/:teamId/:start/:end/:price/:sport', canActivate: [AuthGuard, PlayerGuard], component: CreatePrivateEventComponent},
  { path: 'challenge/create/:challengerId/:challengedId/:sport', canActivate: [AuthGuard, PlayerGuard], component: CreateChallengeComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
