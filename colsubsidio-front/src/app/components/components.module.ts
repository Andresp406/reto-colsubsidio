import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent  } from './nav-bar/nav-bar.component';
import { ModalModule } from './modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { MovementComponent } from './movement/movement.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    TabsComponent,
    MovementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    ReactiveFormsModule,
    MdbTabsModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    TabsComponent,
    MovementComponent
   ]
})
export class ComponentsModule { }
