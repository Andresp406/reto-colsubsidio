import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  forma:FormGroup;
  title:string = 'Iniciar Sesion';
  faEye=faEye;
  user:IUser;
  @ViewChild('password', {static:false}) password!:ElementRef<HTMLInputElement>;
  @Output() cerrarModal = new EventEmitter<boolean>();

  constructor() {
    this.forma = this.setValidationForm();
   }

  ngOnInit(): void {}

  setValidationForm():FormGroup{
    return new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });
  }

  onSubmit():void{
   

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
