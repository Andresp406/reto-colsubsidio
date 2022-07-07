import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementComponent } from '../components/movement/movement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';


const routes:Routes =[
  {
    path:'',
    children:[
      {
        path:'create-exam',
        component:MovementComponent
      },
      { 
        path:'dashboard', 
        component:DashboardComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'client',
        component:ClientComponent
      },
      {
        path:'clients/page/:page',
        component:ClientComponent
      }
    ]
  }
]


  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports:[
      RouterModule
    ]
  })
  export class PagesRoutingModule { }
