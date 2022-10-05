import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-add-new-flight',
  templateUrl: './add-new-flight.component.html',
  styleUrls: ['./add-new-flight.component.css'],
})
export class AddNewFlightComponent implements OnInit {
  constructor(private flightService: FlightsService) {}

  addFlightForm = new FormGroup({
    from_location: new FormControl<string>(''),
    departure_time: new FormControl<string>(''),
    arrival_time: new FormControl<string>(''),
    duration: new FormControl<number>(0),
    total_seats: new FormControl<number>(0),
  });

  ngOnInit(): void {}

  addFlightSubmit() {
    this.flightService
      .addFlight({
        flight_id: 0, //Bitte nachschauen
        from_location: this.addFlightForm.value.from_location as string,
        to_location: '',
        departure_time: this.addFlightForm.value.departure_time as string,
        arrival_time: this.addFlightForm.value.arrival_time as string,
        duration: this.addFlightForm.value.duration as number,
        total_seats: this.addFlightForm.value.total_seats as number,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
