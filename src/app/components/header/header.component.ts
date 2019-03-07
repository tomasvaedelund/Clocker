import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarMenu') navbarMenu: ElementRef;
  @ViewChild('navbarBurger') navbarBurger: ElementRef;
  submitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  toggleNavbar() {
    this.navbarMenu.nativeElement.classList.toggle('is-active');
    this.navbarBurger.nativeElement.classList.toggle('is-active');
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  onLogout() {
    this.submitting = true;
    this.authService.logout().then(() => {
      this.submitting = false;
      this.router.navigate(['/user/login']);
      this.toggleNavbar();
    });
  }
}
