import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {MatInput} from "@angular/material/input";



@NgModule({
  declarations: [
    AuthComponent,
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AuthComponent},
      {path: 'admin-panel', component: AdminPanelComponent}
    ]),
    MatProgressSpinnerModule,
    MatGridListModule,
    FormsModule,
    MatInput,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class AuthModule { }
