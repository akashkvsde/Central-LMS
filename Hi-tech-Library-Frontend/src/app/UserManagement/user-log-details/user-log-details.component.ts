import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-user-log-details',
  templateUrl: './user-log-details.component.html',
  styleUrls: ['./user-log-details.component.css']
})
export class UserLogDetailsComponent implements OnInit{
  user_id:any
  constructor(private service:AllDataService){}
ngOnInit(): void {
  this.user_id=sessionStorage.getItem('user_id');
  this.userLOgdetails()
}
users_search:any
p:any=1
userlogData:any
userLOgdetails(){
this.service.getuserLogDetails().subscribe((res:any)=>{
  console.log(res);
  this.userlogData=res;
  
})
}


statusValue: boolean = false;

sendactiveInactiveValue(id: any, status: any) {
  const newStatus = status ? 'inactive' : 'active';
  this.service.updateStatusSession(id).subscribe((res: any) => {
    // console.log(res);
    alert('Status Updated');
    this.userLOgdetails()
  },(err:any)=>{
    console.log(err);
    
  });
}
}
