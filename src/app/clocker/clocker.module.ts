import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClockerService } from './clocker.service';
import { ClockerRoutingModule } from './clocker-routing.module';

import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [DetailsComponent, EditComponent, ListComponent],
  imports: [CommonModule, ClockerRoutingModule],
  providers: [ClockerService]
})
export class ClockerModule {}
