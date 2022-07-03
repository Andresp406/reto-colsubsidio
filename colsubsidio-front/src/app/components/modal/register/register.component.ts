import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  faEye=faEye;
  forma: FormGroup;
  title: string = 'Registro Clientes';
  @ViewChild("password", { static: false }) password!: ElementRef<HTMLInputElement>;
  @ViewChild("passwordConfirmed", { static: false }) passwordConfirmed!: ElementRef<HTMLInputElement>;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() clientUpdate = new EventEmitter<any>();

  constructor(private clientService: ClientService, private router: Router) {
    this.forma = this.setValidationForm();
  }

  ngOnInit(): void {
  }


  setValidationForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]')]),
      address: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+$'), Validators.minLength(3)]),
      passwordConfirmed: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+$'), Validators.minLength(3)]),

    });
  }

  onSubmit(): void {
    this.router.navigate(['/modulo/dashboard']);
    console.log("Dasd")
    const data: IClient = {
      firstName: this.forma.get('firstName')?.value,
      lastName: this.forma?.get('lastName')?.value,
      phone: this.forma?.get('phone')?.value,
      address: this.forma?.get('address')?.value,
      password: this.forma?.get('password')?.value,
      passwordConfirmed: this.forma?.get('passwordConfirmed')?.value      
    };
    this.clientService.registerClient(data).subscribe((resp)=>{
      Swal.fire({
        icon: 'success',
        title: `Bienvenido ${data.firstName} ${data.lastName}  ${resp.message}`,
        showConfirmButton: false,
        timer: 1500
      });
      //this.clientUpdate.emit(data);
      this.cerrar(true);
    });
  }

  cerrar(event: boolean): void {
    this.cerrarModal.emit(event);
  }


  showPassword(args:string){ 
    switch(args){
      case "password":
        if (this.password.nativeElement.type === 'password'){
          this.password.nativeElement.type = "text";
          break;
        }else{
          this.password.nativeElement.type = "password";
          break;
        }
      case "passwordConfirmed":
        if (this.passwordConfirmed.nativeElement.type === 'password'){
          this.passwordConfirmed.nativeElement.type = "text";
          break;
        }else{
          this.passwordConfirmed.nativeElement.type = "password";
          break;
        }
      default:
        break;
    }
 
  }


}
