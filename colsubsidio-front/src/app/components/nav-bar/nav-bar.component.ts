import {Component} from '@angular/core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-nav-bar',
    templateUrl: 'nav-bar.component.html',

})
export class NavBarComponent {
    title:string = 'Colsubsidio front';
    faCircleNotch=faUserCircle;
    

    
}