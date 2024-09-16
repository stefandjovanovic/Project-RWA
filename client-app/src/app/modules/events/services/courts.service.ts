import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CourtCreate} from "../interfaces/court-create.interface";
import {Court} from "../interfaces/court.interface";

@Injectable({
  providedIn: 'root'
})
export class CourtsService {

  baseUrl = 'http://localhost:3000/court';

  constructor(private http: HttpClient) { }

  createCourt(court: CourtCreate){
    return this.http.post<Court>(`${this.baseUrl}/create`, court);
  }

  updateCourt(court: CourtCreate, id: string){
    return this.http.put<Court>(`${this.baseUrl}/update/${id}`, court);
  }

  deleteCourt(id: string){
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  getAllCourts(){
    return this.http.get<Court[]>(`${this.baseUrl}/all`);
  }




}
