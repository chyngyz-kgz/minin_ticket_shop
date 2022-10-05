import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFlight } from '../models/fligths';
import { BASE_URL } from '../constants/urls';
import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { IResponse } from '../models/authorization';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  flights: IFlight[] = [];

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router
  ) {}

  getFlights(): Observable<IFlight[]> {
    return this.http.get<IFlight[]>(BASE_URL + 'get-flights.php').pipe(
      delay(2000),
      retry(2),
      catchError(this.errorHanlder.bind(this)),
      tap((flights) => {
        this.flights = flights;
      })
    );
  }

  addFlight(newFlightData: IFlight): Observable<IResponse> {
    return this.http
      .post<IResponse>(BASE_URL + 'add-new-flight.php', newFlightData)
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

  ticketIssue(flightId: number): Observable<IResponse> {
    return this.http
      .post<IResponse>(BASE_URL + 'ticket-issueance.php', {
        flight_id: flightId,
      })
      .pipe(
        tap((res) => {
          console.log(res);
          if (!res.success) {
            this.errorService.handle(res.message);
          } else {
            this.router.navigate(['profile']);
          }
        })
      );
  }

  private errorHanlder(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
