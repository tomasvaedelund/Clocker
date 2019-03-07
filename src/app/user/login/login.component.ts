import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {
    email: '',
    password: ''
  };

  submitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.submitting = true;
    this.authService
      .login(this.model.email, this.model.password)
      .then(user => {
        this.submitting = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.submitting = false;
      });
  }
}
