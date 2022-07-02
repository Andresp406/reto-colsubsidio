import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validations-errors',
  templateUrl: './validations-errors.component.html',

})
export class ValidationsErrorsComponent implements OnInit {

  @Input() forma!: FormGroup;
  @Input() formControlLabel!: string ;
  @Input() maxlenght?: number;
  @Input() minlenght?: number;
  @Input() nombreCampo?: string;
  @Input() pattern?: string;

  
  constructor() { }

  ngOnInit(): void {
  }

  get selectorName(){
    return this.forma.get(this.formControlLabel);
  }

}