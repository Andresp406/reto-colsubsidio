import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { HomeComponent } from './pages/home/home.component';
import { ExamComponent } from './pages/exam/exam.component';
import { CreateExamComponent } from './pages/create-exam/create-exam.component';

const routes: Routes = [
  {
    path:'modulo',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { 
    path:'', 
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
