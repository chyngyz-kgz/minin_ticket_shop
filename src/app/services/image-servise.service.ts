import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BASE_URL } from '../constants/urls';
import { IResponse } from '../models/authorization';

@Injectable({
  providedIn: 'root',
})
export class ImageServiseService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<IResponse> {
    const formData = new FormData();

    formData.append('file', image);

    return this.http.post<IResponse>(BASE_URL + 'add-photo.php', formData).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
}
