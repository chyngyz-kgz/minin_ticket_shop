import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { BASE_URL } from '../constants/urls';
import { IProfileResponse, IUserProfile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  profileData!: IUserProfile;

  getProfileInfo(): Observable<IProfileResponse> {
    return this.http.get<IProfileResponse>(BASE_URL + 'get-profile.php').pipe(
      retry(2),
      tap((res) => {
        console.log(res);
        this.profileData = res.data;
      })
    );
  }
}
