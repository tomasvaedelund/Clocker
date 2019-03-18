import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Clocker } from 'src/app/_models';
import { ClockerService } from '../clocker.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clockers$: Observable<Clocker[]>;

  constructor(private clockerService: ClockerService) {}

  ngOnInit() {
    this.clockers$ = this.clockerService.clockers$;
  }
}
