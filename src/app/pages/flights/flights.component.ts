import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  constructor(
    public flightsService: FlightsService,
    public authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.flightsService.getFlights().subscribe((data) => {
      console.log(data);
    });
  }
}
