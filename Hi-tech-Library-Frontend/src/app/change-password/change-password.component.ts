import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../Services/all-data.service';
import { changePassword } from '../Models/all-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  imgpath:any = "http://yourapiurlputhere:5001/studentphoto/";
  user_id:any
  user_name:any
  constructor(private service:AllDataService){}
  college_id:any
  ngOnInit(): void {
    this.user_id=sessionStorage.getItem('user_id')
    this.user_name=sessionStorage.getItem('name')
    this.college_id=sessionStorage.getItem('college_id')
    this.getAllPassword();
    this.cp.user_id = this.user_id
    this.getUserImage();
  }
  showMobileNumber1: boolean = false;
  togglePasswordVisibilityOld(){
    this.showMobileNumber1 = !this.showMobileNumber1;
  }
  showMobileNumber2: boolean = false;
  togglePasswordVisibilityNew(){
    this.showMobileNumber2 = !this.showMobileNumber2;
  }
  showMobileNumber3: boolean = false;
  togglePasswordVisibilityConfirm(){
    this.showMobileNumber3 = !this.showMobileNumber3;
  }

  allPassword:any;
  getAllPassword(){
    this.service.getUserandPassword().subscribe((res:any)=>{
      this.allPassword=res;
      // console.log(res);

    })
  }

  // oldPassword:any
  // NewPassword:any
  // ConfirmPassword:any
  // user_email:any='hitechbiswa123@gmail.com';
  // ChangePassword(){
  //   const user=this.allPassword.find((u:any)=>u.email===this.user_email && u.password===this.oldPassword);

  //   if(!user){
  //     alert("user Not Found");
  //   } else if(this.NewPassword !==this.ConfirmPassword){
  //     alert('new password and confirm Password not match');
  //   }else{
  //     alert('Password Changed Successfully');
  //   }
  // }








  user_is:any;
  cp = new changePassword();


  passwordForm=new FormGroup({
    oldPassword:new FormControl(''),
    newPassword:new FormControl(''),
    confirmPassword:new FormControl('')
    })

     //session user id be stored


  data:any
  checkOldPswd(confirmPassword:any){
    console.log(this.cp);

  if(confirmPassword == this.cp.new_password){
   this.service.changePassword(this.cp).subscribe((data:any)=>{
    alert(data);
    console.log(data);
    this.passwordForm.reset();
   })
  }else{
    alert("New Password is not Matched with confirm Password!!!")
  }

  }



  userImage:any
  getUserImage(){
   if(this.user_id){
    this.service.getUserProfile(this.user_id).subscribe((res:any)=>{
      // console.log();
      this.userImage=res[0].image

    })
   }
  }


}
