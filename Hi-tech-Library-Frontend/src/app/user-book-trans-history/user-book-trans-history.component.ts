import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../Services/all-data.service';
declare const myFun:any;

@Component({
  selector: 'app-user-book-trans-history',
  templateUrl: './user-book-trans-history.component.html',
  styleUrls: ['./user-book-trans-history.component.css']
})
export class UserBookTransHistoryComponent implements OnInit {
  transaction:any;
  user_id:any ;
  college_id:any ;
  constructor(private AllDataService:AllDataService) {}

  ngOnInit():void{
    this.user_id=sessionStorage.getItem('user_id')
    this.college_id=sessionStorage.getItem('college_id')
    this.getTransactionHistory();

  }

  getTransactionHistory() {
    this.AllDataService.FetchBookTransactionHstry(this.user_id).subscribe((res: any) => {
      this.transaction = res;
      console.log(res)
    });
  }


}
