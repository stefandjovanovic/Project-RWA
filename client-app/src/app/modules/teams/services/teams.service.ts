import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Team} from "../interfaces/team.interface";
import {TeamCreate} from "../interfaces/team-create.interface";
import {TeamMember} from "../interfaces/team-member.interface";
import {EMPTY} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private baseUrl = 'http://localhost:3000/team';


  constructor(private http: HttpClient) { }

  getMyTeams() {
    return this.http.get<Team[]>(`${this.baseUrl}/my-teams`);
  }

  createTeam(team: TeamCreate) {
    return this.http.post<Team>(`${this.baseUrl}/create`, team);
  }

  editTeam(teamId: string, team: TeamCreate){
    return this.http.patch<Team>(`${this.baseUrl}/edit/${teamId}`, team);
  }

  deleteTeam(teamId: string){
    return this.http.delete(`${this.baseUrl}/delete/${teamId}`);
  }

  addMember(teamId: string, username: string){
    return this.http.post<TeamMember>(`${this.baseUrl}/add-member/${teamId}/${username}`, {});
  }
  removeMember(teamId: string, username: string){
    return this.http.delete(`${this.baseUrl}/remove-member/${teamId}/${username}`);
  }

  searchTeams(searchTerm: string){
    if(searchTerm !== ''){
      return this.http.get<Team[]>(`${this.baseUrl}/search/${searchTerm}`);
    }else{
      return EMPTY;
    }
  }
}
