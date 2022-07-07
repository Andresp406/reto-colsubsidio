import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IResponseUser, IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  forma:FormGroup;
  title:string = 'Iniciar Sesion';
  faEye=faEye;
  user:IUser;
  @ViewChild('password', {static:false}) password!:ElementRef<HTMLInputElement>;
  @Output() cerrarModal = new EventEmitter<boolean>();

  constructor(private _auth:AuthService, private _route:Router) {
    this.forma = this.setValidationForm();
   }


  ngOnInit(): void {
   if(this._auth.isAuthenticated()){
    Swal.fire('Login', `Hola ${this._auth.getCurrentUser?.fullname} te encuentras autenticado`, 'info');
    this.cerrar(true);
    this._route.navigate(['/modulo/dashboard']);
   }
  }
    
   setValidationForm():FormGroup{
    return new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });
  }

  onSubmit():void{
    const data:IUser = {
      username: this.forma.get('username').value,
      password: this.forma.get('password').value
    }
   this._auth.login(data).subscribe((resp:IResponseUser)=>{
    this._auth.saveUser(resp.access_token);
    this._auth.saveToken(resp.access_token);
    let user = this._auth.getCurrentUser;
    this._route.navigate(['/modulo/dashboard']);
    Swal.fire('Login', `Hola ${user.username}, has iniciado session con exito!`, 'success');  
    this.cerrar(true);
    },
    (err)=>{
      if (err.status == 400 || err.status == 401){
        Swal.fire('Error login', 'Usuario o Clave Incorrecto', 'error');
      }
    }
   );

  }

  cerrar(event:boolean):void{
    this.cerrarModal.emit(event);
  }

  showPassword():void{
    if (this.password.nativeElement.type === 'password'){
      this.password.nativeElement.type = "text";
    }else{
      this.password.nativeElement.type = "password";
    }
  }

}
