import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent  } from './nav-bar/nav-bar.component';
import { ModalModule } from './modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    ReactiveFormsModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
   ]
})
export class ComponentsModule { }
