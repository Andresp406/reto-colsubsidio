import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
})
export class EditClientComponent implements OnInit {
  forma: FormGroup;
  title: string = 'Formulario de modificacion Cliente';
  @Input() client!:IClient;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() clientUpdate = new EventEmitter<IClient>();

  constructor(private clientService: ClientService) {
    this.forma = this.setValidationForm();
  }

  ngOnInit(): void {
    const data:IClient = {
      fullName:this.client.fullName,
      userName:this.client.userName,
      phone:this.client.phone,
      address:this.client.address,     
    }
    this.forma.setValue(data);
  }


  setValidationForm(): FormGroup {
    return new FormGroup({
      fullName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      userName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      password: new FormControl(null)
      
    });
  }

  onSubmit(): void {
    const data: IClient = {
      id: this.client.id,
      fullName: this.forma.get('firstName')?.value,
      userName: this.forma?.get('lastName')?.value,
      phone: this.forma?.get('phone')?.value,
      address: this.forma?.get('address')?.value,     
    };
    Swal.fire({
      title: 'Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.updateClient(data).subscribe(() => {
          Swal.fire('Editado!', '', 'success');
          this.clientUpdate.emit(data);
          this.cerrar(true);
        });
        this.clientUpdate.emit(data);
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
        this.cerrar(true);
      }
    })
  }

  cerrar(event: boolean): void {
    this.cerrarModal.emit(event);
  }
}
