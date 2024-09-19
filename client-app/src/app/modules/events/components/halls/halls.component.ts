import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Court} from "../../interfaces/court.interface";

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrl: './halls.component.css'
})
export class HallsComponent {
  showNewHallForm = false;
  showEditHallForm = false;
  showEventsList = false;
  hallToEdit?: Court;
  hallToShowId?: string;

  onClickAdd(){
    this.showNewHallForm = true;
    this.showEditHallForm = false;
    this.showEventsList = false;
  }


  onClickEdit(hall: Court){
    this.hallToEdit = hall;
    this.showEditHallForm = true;
    this.showNewHallForm = false;
    this.showEventsList = false;
  }


  onShowEventsList(court: Court){
    this.hallToShowId = court.id;
    this.showEventsList = true;
    this.showNewHallForm = false;
    this.showEditHallForm = false;
  }
}
