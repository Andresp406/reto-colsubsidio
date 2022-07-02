import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { ExamComponent } from './exam/exam.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from '../components/modal/modal.module';
import { ComponentsModule } from '../components/components.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    CreateExamComponent,
    ExamComponent,
    ClientComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    ComponentsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ],
  exports:[
    CreateExamComponent,
    ExamComponent,
    ClientComponent,
    HomeComponent,
  ]
})
export class PagesModule { }
