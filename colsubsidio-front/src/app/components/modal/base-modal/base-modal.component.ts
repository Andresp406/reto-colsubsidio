import { Component, EventEmitter, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
})
export class BaseModalComponent implements OnInit {

  closeResult: string = '';
  data       : any;
  option     : any;
  temp       : any;
  refreshData: any;
  option2 :any;
  @Input()  target = '';
  @Output() generic = new EventEmitter<any>();
  @ViewChild('divModal') divModal!: ElementRef;

  constructor(private modal: ModalService) { }

  ngOnInit(): void {}

  open(data: any = null, option:any = null, temp:any = null) {    
    if (data || option || temp) {
      this.data  = data;
      this.option= option;
      this.temp = temp;
    }
    this.modal.showModal(this.divModal);
  }

  close() {
    this.modal.closeModal();
  }

  testFunction(event:any){
    this.generic.emit(event);
  }

}