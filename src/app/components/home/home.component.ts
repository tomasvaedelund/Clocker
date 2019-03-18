import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ClockerService } from 'src/app/clocker/clocker.service';
import { Clocker } from 'src/app/_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentClocker$: Observable<Clocker>;
  loading = false;
  currentTime: number;
  diffTime: number;

  constructor(private clockerService: ClockerService) {}

  ngOnInit() {
    this.currentClocker$ = this.clockerService.currentClocker$;
    this.setCurrentTime();
    setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  }

  setCurrentTime(): void {
    this.currentTime = Date.now();
  }

  onCheckIn(timeIn: number | null): void {
    this.loading = true;
    this.clockerService.checkIn(timeIn).then(() => {
      this.loading = false;
    });
  }

  onCheckOut(timeIn: number, timeOut: number | null): void {
    this.loading = true;
    this.clockerService.checkOut(timeIn, timeOut).then(() => {
      this.loading = false;
    });
  }
}
