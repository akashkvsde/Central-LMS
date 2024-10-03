import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Userrole } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {
  constructor(private service:AllDataService){}
  college_id:any
  entry_by:any
  p: number = 1;
  isSuperAdmin:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getUserRole();
    // interval(5000).subscribe(() => {
    //   this.getUserRole();
    // });
  }
  userrole_search:any;

  UserroleModel=new Userrole();

  addUserRole(validForm: any) {
    this.UserroleModel.college_id=this.college_id
    this.UserroleModel.entry_by=this.entry_by
    if (validForm.valid) {
      this.service.addUserRole(this.UserroleModel).subscribe((res:any)=>{
        console.log(res);
        alert(res);
        this.getUserRole();
        validForm.reset();
      },(err:any)=>{
        alert("Something went wrong");
      })
    }else {
      if (validForm.controls.user_role.invalid) {
        alert('Please enter the user role.');
      }
     
    }
    
  }
  userrole: any;
 
  getUserRole() {
    this.service.getUserRole(this.college_id).subscribe((res: any) => {
      this.userrole = res.filter((role: any) => role.user_role !== 'superadmin' && role.user_role !== 'SuperAdmin' && role.user_role !== 'Super Admin');
    });
  }


  EditCollege(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateCollege(userrole: any,id:any) {
    userrole.isEditing = false;
    this.service.updUserRole(id,userrole).subscribe((res:any)=>{
          alert(res);
          this.getUserRole();
      },
      (error) => {
        alert('Something Went Wrong');
        
    
      }
      
    );

    // Perform update logic here, e.g., send update request to server
  }

  DeleteCollege(id: any) {
    const confirmation = confirm("Are you sure you want to delete this user role?");
    if (confirmation) {
      this.service.delUserRole(id).subscribe((res: any) => {
          alert(res);
          this.getUserRole();
      },(err:any)=>{
        alert('Something went wrong !')
      });
    }
  }
}
