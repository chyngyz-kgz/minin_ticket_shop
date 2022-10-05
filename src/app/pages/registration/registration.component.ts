import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(private auth: AuthorizationService) {}

  registerForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    phone: new FormControl<string>(''),
  });

  ngOnInit(): void {}

  registerSubmit() {
    this.auth
      .register({
        firstName: this.registerForm.value.firstName as string,
        lastName: this.registerForm.value.lastName as string,
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string,
        phone: this.registerForm.value.phone as string,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
