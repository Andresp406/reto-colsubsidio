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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InformationClientComponent } from './information-client/information-client.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    TabsComponent,
    MovementComponent,
    InformationClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    ReactiveFormsModule,
    MdbTabsModule,
    FontAwesomeModule

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
