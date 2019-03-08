import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });
  }

  get email(): string {
    return this.loginForm.controls.email.value;
  }

  get password(): string {
    return this.loginForm.controls.password.value;
  }

  get isValid(): boolean {
    return this.loginForm.valid || this.loginForm.untouched;
  }

  get isEmailValid(): boolean {
    return (
      this.loginForm.controls.email.valid ||
      this.loginForm.controls.email.untouched
    );
  }

  get isPasswordValid(): boolean {
    return (
      this.loginForm.controls.password.valid ||
      this.loginForm.controls.password.untouched
    );
  }

  onSubmit() {
    this.submitting = true;
    this.authService
      .login(this.email, this.password)
      .then(user => {
        this.submitting = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.submitting = false;
      });
  }
}
