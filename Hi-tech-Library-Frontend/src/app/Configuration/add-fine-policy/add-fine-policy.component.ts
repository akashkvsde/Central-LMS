import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Finepolicy } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-fine-policy',
  templateUrl: './add-fine-policy.component.html',
  styleUrls: ['./add-fine-policy.component.css']
})
export class AddFinePolicyComponent implements OnInit{
  constructor(private service:AllDataService){}
  p: number = 1;
  entry_by:any
  isSuperAdmin:any
ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
  this.entry_by=sessionStorage.getItem('user_id')
  this.isSuperAdmin= this.service.isSuperAdmin()
  this.getUsertype();
  this.getIssuetype();
  this.getFinePolicy();
  // interval(5000).subscribe(() => {
  //   this.getFinePolicy();
  //   this.getUsertype();
  //   this.getIssuetype();
  // });
}
Finepolicy_search:any;
FinepolicyMOdel=new Finepolicy()
//UserType
userRole:any;
college_id:any
  getUsertype(){
    this.service.getUserRole(this.college_id).subscribe((res:any)=>{
      this.userRole = res.filter((roletype: any) => roletype.user_role !== 'superadmin');
    })
  }

//Issue Type
issueTypes:any
  getIssuetype(){
    this.service.getIssueType(this.college_id).subscribe((res:any)=>{
      this.issueTypes=res;
    })
  }

  
 addFinePolicy(validForm: any) {
  // console.log(this.FinepolicyMOdel);
  this.FinepolicyMOdel.entry_by=this.entry_by;
  this.FinepolicyMOdel.college_id=this.college_id;
  
  if (validForm.valid) {
    this.service.addFinePolicy(this.FinepolicyMOdel).subscribe(
      (res: any) => {
        // console.log(res); 
        alert(res);
        this.getFinePolicy();
      },
      (error) => {
        alert('Something went wrong !')
      }
    );
    validForm.reset();
  } else {
    if (validForm.controls.user_type.invalid) {
      alert('Please select the User Type.');
    }
    if (validForm.controls.issue_type_id.invalid) {
      alert('Please Select Issue Type.');
    }
    if (validForm.controls.exceed_days.invalid) {
      alert('Please fill the exceed days.');
    }
    if (validForm.controls.fine_policy_amount.invalid) {
      alert('Please fill the Fine Policy amount.');
    }
  }
}

FinePolicy:any;
getFinePolicy(){
  this.service.getFinePolicy(this.college_id).subscribe((res:any)=>{
    // console.log(res);
    this.FinePolicy=res;
    
  })
}



EditCourse(Course: any,id:any) {
  Course.isEditing = true;

}
CancelEdit(Course: any) {
  Course.isEditing = false;
  // You might want to revert any changes made to the input fields
}

UpdateFinePolicy(FinePolicy: any,id:any) {
// console.log(FinePolicy);

FinePolicy.isEditing = false;
  this.service.updFinePolicy(id,FinePolicy).subscribe((res:any)=>{
        alert(res);
        this.getFinePolicy();
    },
    (error) => {
      alert('Something Went Wrong');
    }
    
  );
}

DeleteFinePolicy(id: any) {
  const confirmation = confirm("Are you sure you want to delete this finepolicy?");
  if (confirmation) {
    this.service.delFinePolicy(id).subscribe((res: any) => {
        alert(res);
        this.getFinePolicy();
    },(err:any)=>{
      alert('Something went wrong !')
    });
  }
}
  

statusValue: boolean = false;

sendactiveInactiveValue(id: any) {
  
  this.service.updateStatusFinepolicy(id).subscribe((res: any) => {
    // console.log(res);
    alert(res);
  },(err:any)=>{
    alert('Something went wrong')
  });
}   

}
