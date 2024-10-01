import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableData} from "../interfaces/table-data.interface";
import {TableTeamResults} from "../interfaces/table-team-results.interface";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  baseUrl = 'http://localhost:3000/table';

  constructor(private http: HttpClient) { }

  getTableData(){
    return this.http.get<TableData[]>(`${this.baseUrl}/data`);
  }

  getTeamResults(teamId: string){
    return this.http.get<TableTeamResults[]>(`${this.baseUrl}/team-results/${teamId}`);
  }
}
