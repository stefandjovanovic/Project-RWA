import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EventInterface} from "../interfaces/event.inerface";
import {EventCreate} from "../interfaces/event-create.interface";
import {ScheduledSlots} from "../interfaces/scheduled-slots.interface";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  getPublicEvents(id: string) {
    return this.http.get<EventInterface[]>(`${this.baseUrl}/public/${id}`);
  }

  createPublicEvent( event: EventCreate){
    return this.http.post<EventInterface>(`${this.baseUrl}/public/create`, event);
  }

  deleteEvent(id: string){
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  joinEvent(id: string){
    return this.http.post(`${this.baseUrl}/join/${id}`, {});
  }

  leaveEvent(id: string){
    return this.http.post(`${this.baseUrl}/leave/${id}`, {});
  }

  fetchScheduledSlots(courtId: string, date: Date){
    const params = new HttpParams().set('date', date.toISOString());
    return this.http.get<ScheduledSlots>(`http://localhost:3000/court/scheduled-slots/${courtId}`, {params});
  }

  fetchNearbyEvents(longitude: number, latitude: number){
    return this.http.get<EventInterface[]>(`${this.baseUrl}/nearby/${longitude}/${latitude}`);
  }


}
