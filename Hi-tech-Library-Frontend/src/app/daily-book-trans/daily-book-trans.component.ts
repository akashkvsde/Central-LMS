import { Component } from '@angular/core';
declare const myFun:any;

@Component({
  selector: 'app-daily-book-trans',
  templateUrl: './daily-book-trans.component.html',
  styleUrls: ['./daily-book-trans.component.css']
})
export class DailyBookTransComponent {
  ngOnInit(){
    myFun();
  }

}
