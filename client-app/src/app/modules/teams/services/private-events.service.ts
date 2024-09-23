import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PrivateEvent} from "../interfaces/private-event.interface";
import {EventCreate} from "../../events/interfaces/event-create.interface";

@Injectable({
  providedIn: 'root'
})
export class PrivateEventsService {
  private baseUrl = 'http://localhost:3000/api/events/private';

  constructor(private http: HttpClient) { }

  getEventsForTeam(teamId: string) {
    return this.http.get<PrivateEvent[]>(`${this.baseUrl}/team/${teamId}`);
  }

  createPrivateEvent(teamId: string, event: EventCreate) {
    return this.http.post<PrivateEvent>(`/create/${this.baseUrl}/${teamId}`, event);
  }
}
