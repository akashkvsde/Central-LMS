import { Component, OnInit } from '@angular/core';
import { assignroleModel } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {
  p: number = 1;
  modelrole = new assignroleModel   //model declare
  constructor (private allService : AllDataService){} //call service here
  entry_by:any
  imgPath:any
college_id:any
Library_Card_NO:any
  ngOnInit(): void {
    this.entry_by=sessionStorage.getItem('user_id');
    this.college_id=sessionStorage.getItem('college_id');
    this.fetChroleData();
    this.getAllrole();
    let imgUrl = sessionStorage.getItem('url');

  if (imgUrl) {
      // Split the URL by "/"
      const urlSegments = imgUrl.split('/');
      urlSegments.pop();

      // Join the remaining segments back into a URL
      const baseUrl = urlSegments.join('/');

      this.imgPath = `${baseUrl}/studentphoto/`;
      // this.docPath = `${baseUrl}/studentDocument/`;

      console.log(baseUrl);
  } else {
      console.error('imgUrl is null');
  }
  
  }
  //session area

//session area

getassign_role_data:any

//for  fetch data in table
fetChroleData(){
    this.allService.getEmpRole(this.college_id).subscribe((data:any)=>{
     this.getassign_role_data =data
    //  console.log(this.getassign_role_data[0].roles);
    },(err:any)=>{
      // alert("Something Went Wrong")
    })
}
//fetch all user role
allrole:any
getAllrole(){
  this.allService.exceptStdAdm(this.college_id).subscribe((data:any)=>{
     this.allrole =data
  })
}
//for give data in model For assign


takeDataForAssign(data:any){
  this.modelrole.name = data.name
  this.modelrole.user_id = data.user_id
  this.modelrole.entry_by = this.entry_by
  this.modelrole.college_id = this.college_id
}


Assignrole(rolereload:any){
  if(rolereload.valid){
  // console.log(this.modelrole);
this.allService.assignRole(this.modelrole).subscribe((data:any)=>{
  alert(data)
rolereload.reset()
this.fetChroleData();
},(err:any)=>{
  // alert("Something went wrong..Tray after some time!")
})
}else{
  alert("Failed !!Please Fill the value")
}

}


//fetch for delete function
get_deldata:any
fetChIndassignrole(data:any){
console.log(data);
this.allService.fetChIndassignrole(data).subscribe((bata:any)=>{
  this.get_deldata = bata;
  // console.log(bata);

},(err:any)=>{
  // alert("Some thing went wrong!")
})
}

//permanent delete
delete(assign_role_id:any,user_id:any){

  const confirmation = window.confirm('Are you sure you want to delete?');
  if (confirmation) {
    // Perform delete action
    this.allService.deleteAssignrole(assign_role_id,user_id).subscribe(
      (data) => {
        alert(data);
        // console.log(data);
        
        this.fetChIndassignrole(user_id)
        this.fetChroleData();
      },
      (err) => {
        console.log(err);
        
        // alert("Something went wrong. Please try again. " + err);
      }
    );
  } else {
    // User clicked 'No' or closed the dialog
    console.log('User deletion cancelled.');
  }
  }



}
