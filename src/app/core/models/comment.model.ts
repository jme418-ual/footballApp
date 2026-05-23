export interface Comment {
  id?: number;
  playerId: number;
  author: string;
  text: string;
  rating: number;
  latitude?: number;
  longitude?: number;
}