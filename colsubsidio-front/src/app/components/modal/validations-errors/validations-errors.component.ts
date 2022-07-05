import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validations-errors',
  templateUrl: './validations-errors.component.html',

})
export class ValidationsErrorsComponent{

  @Input() forma!: FormGroup;
  @Input() formControlLabel!: string ;
  @Input() maxlenght?: number;
  @Input() minlenght?: number;
  @Input() nombreCampo?: string;
  @Input() pattern?: string;

  
  constructor() { }
 

  get selectorName(){
    return this.forma.get(this.formControlLabel);
  }


 


}