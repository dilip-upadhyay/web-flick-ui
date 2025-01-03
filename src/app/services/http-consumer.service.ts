import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpConsumerService {
  private baseUrl = '/api/web-flick-resource';

  constructor(private http: HttpClient) {}

  createDataSource(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-data-source`, data);
  }
}
