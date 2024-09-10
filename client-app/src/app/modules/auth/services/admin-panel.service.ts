import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../interfaces/user-info.interface";

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  private baseUrl = 'http://localhost:3000/users/roles';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<UserInfo[]>(this.baseUrl);
  }

  updateToAdmin(id: string){
    return this.http.patch<UserInfo>(`${this.baseUrl}/to-admin/${id}`, {});
  }
  updateToPlayer(id: string){
    return this.http.patch<UserInfo>(`${this.baseUrl}/to-player/${id}`, {});
  }
  updateToManager(id: string){
    return this.http.patch<UserInfo>(`${this.baseUrl}/to-manager/${id}`, {});
  }
  deleteUser(id: string){
    return this.http.delete<UserInfo>("http://localhost:3000/users/" + id);
  }

}
