import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL } from '../constants/urls';
import { INewUser, IResponse, IUserData } from '../models/authorization';
import { ErrorService } from './error.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private currentUserSubject!: BehaviorSubject<string>;
  public currentUserToken!: Observable<string>;
  private userRoleSubject!: BehaviorSubject<string>;
  public userRole!: Observable<string>;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router,
    private storageSevice: StorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUserToken = this.currentUserSubject.asObservable();

    this.userRoleSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('userRole')!)
    );
    this.userRole = this.userRoleSubject.asObservable();
  }

  public get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  public get userRoleValue(): string | null {
    return this.userRoleSubject.value;
  }

  register(userData: INewUser): Observable<IResponse> {
    return this.http
      .post<IResponse>(BASE_URL + 'auth/register.php', userData)
      .pipe(
        tap((res) => {
          console.log(res);
          if (!res.success) {
            this.errorService.handle(res.message);
          } else {
            this.router.navigate(['/']);
          }
        })
      );
  }

  login(userData: IUserData): Observable<IResponse> {
    return this.http
      .post<IResponse>(BASE_URL + 'auth/login.php', userData)
      .pipe(
        tap((res) => {
          console.log(res);
          if (!res.success) {
            this.errorService.handle(res.message);
          } else {
            this.storageSevice.saveData(
              'currentUser',
              JSON.stringify(res.data.token)
            );
            this.storageSevice.saveData(
              'userRole',
              JSON.stringify(res.data.role)
            );
            this.currentUserSubject.next(res.data.token);
            this.userRoleSubject.next(res.data.role);

            this.router.navigate(['/']);
          }
        })
      );
  }

  logout() {
    this.storageSevice.removeData('currentUser');
    this.storageSevice.removeData('userRole');
    this.currentUserSubject.next('');

    this.router.navigate(['/']);
    console.log('Logout');
  }
}
