import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  title: string = 'Registro Clientes';
  @ViewChild("password", { static: false }) password!: ElementRef<HTMLInputElement>;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() clientUpdate = new EventEmitter<any>();

  constructor(private clientService: ClientService) {
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
    const data: IClient = {
      firstName: this.forma.get('firstName')?.value,
      lastName: this.forma?.get('lastName')?.value,
      phone: this.forma?.get('phone')?.value,
      address: this.forma?.get('address')?.value,
      
    };
    this.clientService.registerClient(data).subscribe((resp)=>{
      Swal.fire({
        icon: 'success',
        title: `el estudiante ${data.firstName} ${data.lastName} fue ${resp.message}`,
        showConfirmButton: false,
        timer: 1500
      });
      this.clientUpdate.emit(data);
      this.cerrar(true);
    });
  }

  cerrar(event: boolean): void {
    this.cerrarModal.emit(true);
  }


  showPassword(){    
    if (this.password.nativeElement.type === 'password'){
      this.password.nativeElement.type = "text";
    }else{
      this.password.nativeElement.type = "password";
    }
  }


}
