import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  constructor(private allService:AllDataService){}
  college_id:any;
  p: number = 1;
 ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id'); 
  this. getAllData()
 }
//session area

//session area

getdata:any
  getAllData(){
   this.allService.viewBookTransaction(this.college_id).subscribe((data:any)=>{
    this.getdata = data;
   })
  }

  getDatedata(date:any){
    if(date.length != 0){
         this.allService.viewBookTransactionCollege(this.college_id,date).subscribe((data:any)=>{
      this.getdata = data;
     })   
    }else{
      this.getAllData()
    }
  }


}

