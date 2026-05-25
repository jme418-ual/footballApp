import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private http = inject(HttpClient);

  async createComment(comment: Comment) {

    return await firstValueFrom(
      this.http.post<ApiResponse<Comment>>(
        `${environment.commentsUrl}/comments`,
        comment
      )
    );
  }

  async getComments(playerId: number) {

    const response = await firstValueFrom(
      this.http.get<ApiResponse<Comment[]>>(
        `${environment.apiUrl}/players/${playerId}/comments`
      )
    );

    return response.data;
  }

  async deleteComment(id: number) {
    return await firstValueFrom(
      this.http.delete<ApiResponse<void>>(
        `${environment.commentsUrl}/comments/${id}`
      )
    );
  }
}