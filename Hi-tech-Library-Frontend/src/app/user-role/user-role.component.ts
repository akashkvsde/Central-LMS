import { Component } from '@angular/core';
import { AllDataService } from '../Services/all-data.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent {

  constructor(private service:AllDataService){}
  
}
