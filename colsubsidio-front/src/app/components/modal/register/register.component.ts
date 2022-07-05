import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  title: string = 'Registro Clientes';
  @ViewChild("password", { static: false }) password!: ElementRef<HTMLInputElement>;
  @ViewChild("passwordConfirmation", { static: false }) passwordConfirmed!: ElementRef<HTMLInputElement>;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() clientUpdate = new EventEmitter<any>();
  
  forma: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    userName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  });

  constructor(private clientService: ClientService, 
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      fullName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      userName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      phone:['', [Validators.required, Validators.pattern('[0-9]')]],
      address:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      passwordConfirmation:['', [Validators.required, this.passwordMatch.bind(this)]]
    },
  
    )
  }



  get formaPasswordConfirmation():ValidationErrors{
    return this.forma.controls['passwordConfirmation']?.errors['equals'];
  }

  passwordMatch(control:AbstractControl): Validators{
    const valid = this.forma?.get('password')?.value;

    console.log(valid === control.value)
      if (valid === control.value) {
        return('null');
      } else {
        return({ equals: true });
      }
  }

  onSubmit(): void {
    this.router.navigate(['/modulo/dashboard']);
    const data: IClient = {
      fullName: this.forma.get('fullName')?.value,
      userName: this.forma?.get('userName')?.value,
      phone: this.forma?.get('phone')?.value,
      address: this.forma?.get('address')?.value,
      password: this.forma?.get('password')?.value,      
    };
    this.clientService.registerClient(data).subscribe((resp:any)=>{
      Swal.fire({
        icon: 'success',
        title: `Bienvenido ${data.fullName} ${data.userName}  ${resp.message}`,
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
      case "passwordConfirmation":
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
