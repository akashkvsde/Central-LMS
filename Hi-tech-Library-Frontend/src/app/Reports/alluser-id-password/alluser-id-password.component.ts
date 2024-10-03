import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';



@Component({
  selector: 'app-alluser-id-password',
  templateUrl: './alluser-id-password.component.html',
  styleUrls: ['./alluser-id-password.component.css']
})
export class AlluserIdPasswordComponent  implements OnInit{
  constructor(private service:AllDataService){}
p:any=1;
college_id:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.getAllPassword()
  }
  Password_Search:any
  allPasswords:any
  getAllPassword(): void {
    const passwordObservable = this.college_id
      ? this.service.getAllPasswords(this.college_id)
      : this.service.getAllPasswords();

    passwordObservable.subscribe((res: any) => {
    
      this.allPasswords = res.filter((password: any) => password.email !== 'superadmin@gmail.com');
    });
  }

}
