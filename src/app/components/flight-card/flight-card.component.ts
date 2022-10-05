import { Component, OnInit, Input } from '@angular/core';
import { IFlight } from 'src/app/models/fligths';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight!: IFlight;
  constructor(public flightsService: FlightsService) {}

  ngOnInit(): void {}

  issueSubmit(flightId: number) {
    this.flightsService.ticketIssue(flightId).subscribe((res) => {
      // console.log(flightId);
    });
  }
}
