import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-nav-bar',
    templateUrl: 'nav-bar.component.html',

})
export class NavBarComponent{
    title:string = 'Colsubsidio front';
    faCircleNotch=faUserCircle;
     
    constructor(public _auth:AuthService, private _router:Router){
      
    }

    logout(){
        this._auth.logout();
        Swal.fire('Login', 'has cerrado session correctamente', 'success');
        this._router.navigate(['/']);

    }
    

    
}