import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  forma:FormGroup;
  title:string = 'Iniciar Sesion';
  faEye=faEye;
  @ViewChild('password', {static:false}) password!:ElementRef<HTMLInputElement>;
  @Output() cerrarModal = new EventEmitter<boolean>();

  constructor() {
    this.forma = this.setValidationForm();
   }

  ngOnInit(): void {}

  setValidationForm():FormGroup{
    return new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });
  }

  onSubmit(){}

  cerrar(event:boolean){
    this.cerrarModal.emit(event);
  }

  showPassword(args:string){
    if (this.password.nativeElement.type === 'password'){
      this.password.nativeElement.type = "text";
    }else{
      this.password.nativeElement.type = "password";
    }
  }

}
