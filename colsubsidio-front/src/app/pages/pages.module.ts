import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from '../components/modal/modal.module';
import { ComponentsModule } from '../components/components.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PaginatorComponent } from '../components/paginator/paginator.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientComponent,
    HomeComponent,
    PaginatorComponent
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
    DashboardComponent,
    ClientComponent,
    HomeComponent,
  ]
})
export class PagesModule { }
