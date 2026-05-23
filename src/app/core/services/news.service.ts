import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private http = inject(HttpClient);

  async createNews(news: any) {

    return await firstValueFrom(
      this.http.post<ApiResponse<any>>(
        `${environment.newsUrl}/news`,
        news
      )
    );
  }

  async readNews() {

    return await firstValueFrom(
      this.http.get<ApiResponse<string>>(
        `${environment.newsUrl}/news/read`
      )
    );
  }

  async consumeNews() {

    return await firstValueFrom(
      this.http.get<ApiResponse<string>>(
        `${environment.newsUrl}/news/consume`
      )
    );
  }
}