import { Component } from '@angular/core';
declare const myFun:any;
@Component({
  selector: 'app-nav-manage',
  templateUrl: './nav-manage.component.html',
  styleUrls: ['./nav-manage.component.css']
})
export class NavManageComponent {
  ngOnInit(){
    myFun();
  }
}
