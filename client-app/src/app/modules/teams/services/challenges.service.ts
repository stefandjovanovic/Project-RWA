import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Challenge} from "../interfaces/challenge.interface";
import {CreateChallenge} from "../interfaces/create-challenge.interface";
import {SubmitResult} from "../interfaces/submit-result.interface";
import {ResultRequest} from "../../events/interfaces/result-request.interface";

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  private baseUrl = 'http://localhost:3000/challenges';

  constructor(private http: HttpClient) { }

  getChallenges(teamId: string){
    return this.http.get<Challenge[]>(`${this.baseUrl}/all/${teamId}`);
  }

  createChallenge(challenge: CreateChallenge){
    return this.http.post<Challenge>(`${this.baseUrl}/create`, challenge);
  }

  acceptChallenge(challengeId: string){
    return this.http.post<Challenge>(`${this.baseUrl}/accept/${challengeId}`, {});
  }

  rejectChallenge(challengeId: string){
    return this.http.post<Challenge>(`${this.baseUrl}/reject/${challengeId}`, {});
  }

  submitResult(submitResult: SubmitResult){
    return this.http.post(`${this.baseUrl}/result/submit`, submitResult);
  }

  acceptResult(challengeId: string){
    return this.http.post(`${this.baseUrl}/result/accept/${challengeId}`, {});
  }

  rejectResult(challengeId: string){
    return this.http.post(`${this.baseUrl}/result/reject/${challengeId}`, {});
  }

  getResultRequests(teamId: string){
    return this.http.get<ResultRequest[]>(`${this.baseUrl}/result/requests/${teamId}`);
  }
}
