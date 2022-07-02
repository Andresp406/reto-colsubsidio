import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
})
export class CreateExamComponent implements OnInit {

  forma:FormGroup;
  clients:IClient[]=[];
  client:string='';
  default:string = 'escoja el alumno';
  constructor(private studentServices:ClientService) { 
    this.forma = this.setValidationForm();
    this.forma.controls['firstName'].setValue(this.default,{onlySelf: true});
    this.client = this.forma?.get('firstName')?.value;
    console.log(this.client);
  }

  ngOnInit(): void {
    this.getStudent();
    
  }

  getStudent():void{
    this.studentServices.getClient().subscribe((resp:IClient[]) =>{ 
      this.clients = resp;
    });
  }

  setValidationForm():FormGroup{
    return new FormGroup({
        name: new FormControl(),
        title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        option: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        isValid: new FormControl(null, [Validators.required]),
        point: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        grade: new FormControl(null, [Validators.required]),
      });
  }

  onSubmit(){}

  selectStudent(student:IClient){
    console.log(student)
  }
}
