import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Court} from "../interfaces/court.interface";
import {HallCreate} from "../interfaces/hall-create.interface";
import {Subject} from "rxjs";
import {EventInterface} from "../interfaces/event.inerface";

@Injectable({
  providedIn: 'root'
})
export class HallsService {
  baseUrl = 'http://localhost:3000/court/hall';
  successfullyUpdated: Subject<boolean> = new Subject<boolean>();
  successfullyCreated: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getManagerHalls(){
    return this.http.get<Court[]>(`${this.baseUrl}/manager`);
  }

  createHall(hall: HallCreate){
    return this.http.post<Court>(`${this.baseUrl}/create`, hall);
  }

  updateHall(hall: HallCreate, id: string){
    return this.http.put<Court>(`${this.baseUrl}/update/${id}`, hall);
  }

  deleteHall(id: string){
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getEventsForHall(hallId: string){
    return this.http.get<EventInterface[]>(`${this.baseUrl}/events/${hallId}`);
  }
}
