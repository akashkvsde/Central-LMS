import { Component } from '@angular/core';
declare const myFun:any;

@Component({
  selector: 'app-add-nav-page',
  templateUrl: './add-nav-page.component.html',
  styleUrls: ['./add-nav-page.component.css']
})
export class AddNavPageComponent {
  ngOnInit(){
    myFun();
  }
}
