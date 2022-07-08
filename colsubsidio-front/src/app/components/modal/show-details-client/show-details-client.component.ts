import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAccount, IMovement } from 'src/app/interfaces/account.interface';
import { IClient } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-show-details-client',
  templateUrl: './show-details-client.component.html'
})
export class ShowDetailsClientComponent implements OnInit {
  @Input() client!:IClient;
  @Input() exam!:IAccount;
  @Output() cerrarModal = new EventEmitter<boolean>();
  title:string='Informacion del cliente';
  resp:any[] = [];
  account:IAccount[]=[];
  movement:IMovement[]=[];
  constructor() { }

  ngOnInit(): void {
    this.client.account?.forEach(a =>{
      this.account.push(a);
      a.movement.forEach(m => {
        this.movement.push(m);
      });
    });
  }

  closeModal(){
    this.cerrarModal.emit(true);
  }

}
