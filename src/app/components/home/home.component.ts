import { Component, OnInit } from '@angular/core';
import { ClockerService } from 'src/app/clocker/clocker.service';
import { Clocker } from 'src/app/_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentClocker: Clocker;
  loading = false;
  starting = true;
  currentTime: number;

  constructor(private clockerService: ClockerService) {}

  ngOnInit() {
    this.clockerService.currentClocker$.subscribe((clocker: Clocker) => {
      this.currentClocker = clocker;
      setInterval(() => {
        this.currentTime = Date.now();
      }, 1000);
      this.starting = false;
    });
  }

  onCheckIn(): void {
    this.loading = true;
    this.clockerService.checkIn().then(() => {
      this.loading = false;
    });
  }

  onCheckOut(): void {
    this.loading = true;
    this.currentClocker.timeOut = Date.now();

    this.clockerService.checkOut(this.currentClocker).then(() => {
      this.loading = false;
    });
  }
}
