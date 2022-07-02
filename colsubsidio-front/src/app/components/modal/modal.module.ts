import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { ValidationsErrorsComponent } from './validations-errors/validations-errors.component';
import { RegisterComponent } from './register/register.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { RouterModule } from '@angular/router';
import { ShowDetailsClientComponent } from './show-details-client/show-details-client.component';
import { ButtonCloseComponent } from './button-close/button-close.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    BaseModalComponent,
    RegisterComponent,
    ButtonCloseComponent,
    ValidationsErrorsComponent,
    EditClientComponent,

    ShowDetailsClientComponent,
      LoginComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    RouterModule,

  ],
  exports:[
    BaseModalComponent,
    ButtonCloseComponent,
    ValidationsErrorsComponent,
    RegisterComponent
  ]
})
export class ModalModule { }
