import { Component, OnInit } from '@angular/core';
import { faEdit, faEye, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { IClient } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  clients:IClient[]=[];
  icons:IconDefinition[] = [faEdit, faEye, faTrash];

  constructor(private clientService:ClientService,  private spinner: NgxSpinnerService,) {}

  ngOnInit(): void {
    this.getClients()
  }

  public getClients():void{
    this.spinner.show();
    this.clientService.getClients().subscribe(client => {
      this.clients = client
      this.spinner.hide();
    });
  }

  public deleteClient(client:IClient):void{  
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al cliente ${client.userName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id).subscribe(()=>{
          this.clients = this.clients.filter(cli => cli !== client); 
          Swal.fire(
            'Eliminado!',
            'El estudiante ha sido eliminado con exito.',
            'success'
          );  
        });
      }
    });
   
  }

  clientUpdate():void{
   this.getClients();
  }

}
