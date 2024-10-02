import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlayerDetails} from "../interfaces/player-details.interface";
import {Review} from "../interfaces/review.interface";
import {UserEventData} from "../interfaces/user-event-data.interface";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseUrl = 'http://localhost:3000/users/player';

  constructor(private http: HttpClient) { }

  getPlayerDetails(username: string){
    return this.http.get<PlayerDetails>(`${this.baseUrl}/details/${username}`);
  }

  editBio(bio: string, username: string){
    return this.http.patch(`${this.baseUrl}/bio/${username}`, {bio: bio});
  }

  postReview(review: Review, username: string) {
    return this.http.post(`${this.baseUrl}/review/${username}`, review);
  }

  uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{photoUrl: string}>(`${this.baseUrl}/picture`, formData);
  }

  deleteProfilePicture() {
    return this.http.delete(`${this.baseUrl}/picture`);
  }

  searchPlayers(search: string){
    if(search === ''){
      return of([]);
    }
    return this.http.get<PlayerDetails[]>(`${this.baseUrl}/search/${search}`);
  }

  getUserEvents(userId: string){
    return this.http.get<UserEventData[]>(`http://localhost:3000/events/player/${userId}`);
  }

}
