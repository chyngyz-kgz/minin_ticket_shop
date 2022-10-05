import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightsService } from './services/flights.service';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard, JwtInterceptor } from './helpers/classes';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { AddNewFlightComponent } from './pages/add-new-flight/add-new-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavBarComponent,
    FlightsComponent,
    FlightCardComponent,
    RegistrationComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    TicketCardComponent,
    AddNewFlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FlightsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
