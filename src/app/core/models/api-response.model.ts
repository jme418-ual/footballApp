export interface ApiResponse<T> {
  result: boolean;
  message: string;
  httpCode: number;
  data: T;
}