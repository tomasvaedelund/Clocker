import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitting = false;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });
  }

  get email(): string {
    return this.registerForm.controls.email.value;
  }

  get password(): string {
    return this.registerForm.controls.password.value;
  }

  get isValid(): boolean {
    return this.registerForm.valid || this.registerForm.untouched;
  }

  get isEmailValid(): boolean {
    return (
      this.registerForm.controls.email.valid ||
      this.registerForm.controls.email.untouched
    );
  }

  get isPasswordValid(): boolean {
    return (
      this.registerForm.controls.password.valid ||
      this.registerForm.controls.password.untouched
    );
  }

  onSubmit() {
    this.submitting = true;
    this.userService
      .register(this.email, this.password)
      .then(user => {
        this.submitting = false;
      })
      .catch(error => {
        this.submitting = false;
      });
  }
}
