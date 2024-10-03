import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  regidata:any = "Student";
  hide:boolean = false;
  hide_emp:boolean = true;
  
  color:any = "#274472";
  bccolor:any = "white";
  brad:any = "15px";
  pd:any = "3px";
  
  color_ep:any = "";
  bccolor_ep:any = "";
  brad_ep:any = "";
  pd_ep:any = "";
  
  stClick(){
  this.color = "#274472";
  this.bccolor = "white";
  this.brad = "15px";
  this.pd = "3px";
  
  this.regidata= "Student";
  
  this.hide= false;
  this.hide_emp= true;
  
  this.color_ep = "";
  this.bccolor_ep = "";
  this.brad_ep = "";
  this.pd_ep = "";
  }
  
  
  epClick(){
    this.hide= true;
  this.hide_emp= false;
  
    this.color = "";
  this.bccolor = "";
  this.brad = "";
  this.pd = "";
  
  this.regidata= "Employee";
  
  this.color_ep = "#274472";
  this.bccolor_ep = "white";
  this.brad_ep = "25px";
  this.pd_ep = "3px";
  }
  
}
