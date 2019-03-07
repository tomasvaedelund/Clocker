import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model = {
    email: '',
    password: ''
  };

  submitting = false;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.submitting = true;
    this.userService
      .register(this.model.email, this.model.password)
      .then(user => {
        this.submitting = false;
      })
      .catch(error => {
        this.submitting = false;
      });
  }
}
