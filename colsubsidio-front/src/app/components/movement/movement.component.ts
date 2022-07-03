import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
})
export class MovementComponent implements OnInit {

  
  constructor(private studentServices:ClientService) { }

  ngOnInit(): void {}

  
}
