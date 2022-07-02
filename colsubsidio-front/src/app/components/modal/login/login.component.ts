import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  forma:FormGroup;
  title:string = 'Iniciar Sesion';
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

}
