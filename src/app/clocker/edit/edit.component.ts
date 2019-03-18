import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Clocker } from 'src/app/_models';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClockerService } from '../clocker.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  clocker$: Observable<Clocker>;

  constructor(
    private route: ActivatedRoute,
    private clockerService: ClockerService
  ) {}

  ngOnInit() {
    this.clocker$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clockerService.getClocker(params.get('id'))
      )
    );
  }
}
