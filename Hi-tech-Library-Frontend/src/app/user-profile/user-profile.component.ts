import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../Services/all-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  imgpath:any

  constructor(private service:AllDataService,private router:Router){
    let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();

        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');

        this.imgpath = `${baseUrl}/studentphoto/`;

        console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }
  }
  user_id:any
  college_id:any
  random:any
    ngOnInit(): void {
      this.user_id=sessionStorage.getItem('user_id');
      this.college_id=sessionStorage.getItem('college_id');
      this.getUser();
      this.random = this.service.generateRandomId()
      // console.log(this.user_id);
    }
  users:any;
  batch_hidden:boolean=true;
  desig_hidden:boolean=true;
  college_hidden:boolean=true;
  course_hidden:boolean=true;
  dept_hidden:boolean=true;
  getUser(){
    // console.log(this.user_id);

    // alert(this.user_id)
    this.service.getUserProfile(this.user_id).subscribe((res:any)=>{
      // console.log(res);
     this.users = res[0];
     if((this.users.user_role)== "student"){
      this.batch_hidden=false;
      this.desig_hidden=true;
      this.college_hidden=false;
      this.course_hidden=false;
      this.dept_hidden=false;
     }else{
      this.batch_hidden=true;
      this.desig_hidden=false;
      this.college_hidden=true;
      this.course_hidden=true;
      this.dept_hidden=true;
     }

    },(err:any)=>{
      console.log(err);

    })


  }


  GoToChangePasswordPage(){
    this.router.navigate(['Dashboard/Change Password', this.random]);
  }
}
