import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { faEdit, faEye, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  clients:IClient[] = [];
  icons:IconDefinition[] = [faEdit, faEye, faTrash];

  constructor(private clientService:ClientService,  private spinner: NgxSpinnerService,) {}

  ngOnInit(): void {
    this.getClient()
  }

  public getClient():void{
    this.spinner.show();
    this.clientService.getClient().subscribe(client => {
      this.clients = client
      this.spinner.hide();
    });
  }

  public deleteClient(client:IClient):void{  
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al estudiante ${client.firstName} ${client.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id).subscribe((resp)=>{
          this.clients = this.clients.filter(cli => cli !== client); 
          Swal.fire(
            'Eliminado!',
            'El Cliente ha sido eliminado con exito.',
            'success'
          );  
        });
      }
    });
   
  }

  clientUpdate():void{
   this.getClient();
  }
 
  
}
