import { Component, Input, OnInit } from '@angular/core';
import { IFlight } from 'src/app/models/fligths';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css'],
})
export class TicketCardComponent implements OnInit {
  @Input() flight!: IFlight;
  @Input() ticketStatus!: string;
  constructor(public profileService: ProfileService) {}

  ngOnInit(): void {}
}
