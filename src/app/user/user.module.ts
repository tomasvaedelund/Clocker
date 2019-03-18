import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EditComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
  providers: [UserService]
})
export class UserModule {}
