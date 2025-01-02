import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpConsumerService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  put(url: string, data: any) {
    return this.http.put(url, data);
  }

  post(url: string, data: any) {
    return this.http.post(url, data);
  }

  delete(url: string) {
    return this.http.delete(url);
  }

  patch(url: string, data: any) {
    return this.http.patch(url, data);
  }

  head(url: string) {
    return this.http.head(url);
  }

  // for blobs
  getBlob(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  // for text

  getText(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }

  // for array buffer

  getArrayBuffer(url: string) {
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  // for posting blobs

  postBlob(url: string, data: any) {
    return this.http.post(url, data, { responseType: 'blob' });
  }

  // for posting text 

  postText(url: string, data: any) {
    return this.http.post(url, data, { responseType: 'text' });
  }

  // for posting array buffer

  postArrayBuffer(url: string, data: any) {
    return this.http.post(url, data, { responseType: 'arraybuffer' });
  }

  // for posting blobs

  putBlob(url: string, data: any) {
    return this.http.put(url, data, { responseType: 'blob' });
  }

  // for posting text

  putText(url: string, data: any) {
    return this.http.put(url, data, { responseType: 'text' });
  }
}
