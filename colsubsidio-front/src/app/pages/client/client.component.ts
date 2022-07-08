import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { faEdit, faEye, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import {tap} from 'rxjs';
import { IPage } from 'src/app/interfaces/pageable.interface';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  clients:IClient[]=[];
  icons:IconDefinition[] = [faEdit, faEye, faTrash];
  paginator: any;
  constructor(private _clientService:ClientService,
              private _spinner: NgxSpinnerService,
              private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._spinner.show();
    this._activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.getClients(page)
    });


  }

  public getClients(page:number):void{
    

    this._clientService.getClients(page).subscribe((response:IPage) => {
      this.clients = response.content as IClient[];
      this.paginator = response;
      this._spinner.hide();
    });

  }

  public deleteClient(client:IClient):void{  
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al cliente ${client.fullName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._clientService.deleteClient(client.id).subscribe(()=>{
          this.clients = this.clients.filter(cli => cli !== client); 
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado con exito.',
            'success'
          );  
        });
      }
    });
   
  }

  clientUpdate():void{
   this.ngOnInit();
  }
 
  
}

