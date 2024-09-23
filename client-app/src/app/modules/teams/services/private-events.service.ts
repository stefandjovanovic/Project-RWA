import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PrivateEvent} from "../interfaces/private-event.interface";
import {EventCreate} from "../../events/interfaces/event-create.interface";

@Injectable({
  providedIn: 'root'
})
export class PrivateEventsService {
  private baseUrl = 'http://localhost:3000/events/private';

  constructor(private http: HttpClient) { }

  getEventsForTeam(teamId: string) {
    return this.http.get<PrivateEvent[]>(`${this.baseUrl}/${teamId}`);
  }

  createPrivateEvent(teamId: string, event: EventCreate) {
    return this.http.post<PrivateEvent>(`${this.baseUrl}/create/${teamId}`, event);
  }

  joinEvent(id: string){
    return this.http.post(`http://localhost:3000/events/join/${id}`, {});
  }

  leaveEvent(id: string){
    return this.http.post(`http://localhost:3000/events/leave/${id}`, {});
  }

  deleteEvent(id: string){
    return this.http.delete(`http://localhost:3000/events/delete/${id}`);
  }
}
