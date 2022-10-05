import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {}

  loginSubmit() {
    this.authorizationService
      .login({
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
