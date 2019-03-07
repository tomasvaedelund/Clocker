import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.submitting = true;
    this.authService.login(this.model.email, this.model.password).then(user => {
      this.submitting = false;
      console.log(user);
    });
  }
}
