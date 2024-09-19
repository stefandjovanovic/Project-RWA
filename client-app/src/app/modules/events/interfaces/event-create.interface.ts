import {Sport} from "../enums/sport.enum";

export interface EventCreate{
  title: string;
  description: string;
  date: Date;
  sport: Sport;
  startTime: number;
  endTime: number;
  courtId: string;
  maxParticipants: number;
  price: number;
}
