import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  teamIsSelected: boolean = false;

  teamSelected(){
    this.teamIsSelected = true;
  }
}
