import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Issuepolicy } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-issue-policy',
  templateUrl: './add-issue-policy.component.html',
  styleUrls: ['./add-issue-policy.component.css']
})
export class AddIssuePolicyComponent implements OnInit{
  constructor(private service:AllDataService){}
  college_id:any
  entry_by:any
  isSuperAdmin:any
ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
  this.entry_by=sessionStorage.getItem('user_id')
  this.isSuperAdmin= this.service.isSuperAdmin()
  this.getUsertype();
  this.getIssuetype();
  this.getIssuePolicy();
  // interval(5000).subscribe(() => {
  //   this.getUsertype();
  //   this.getIssuetype();
  //   this.getIssuePolicy();
  // });
}
issuePolicy_search:any;

IsuePolicyMOdel=new Issuepolicy()
//UserType
userRole:any;

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


  addIssuePolicy(validForm: any) {
    // console.log(this.IsuePolicyMOdel);
    this.IsuePolicyMOdel.college_id=this.college_id
    this.IsuePolicyMOdel.entry_by=this.entry_by
    
    if (validForm.valid) {
      this.service.addIssuePolicy(this.IsuePolicyMOdel).subscribe(
        (res: any) => {
          // console.log(res); 
          alert(res);
          this.getIssuePolicy();
          validForm.reset();
        },
        (error) => {
        alert('Something went wrong')
        }
      );
    } else {
      if (validForm.controls.user_role_id.invalid) {
        alert('Please select the User Type.');
      }
      if (validForm.controls.issue_type_id.invalid) {
        alert('Please Select Issue Type.');
      }
      if (validForm.controls.max_book.invalid) {
        alert('Please enter the maximum book.');
      }
     
    }
  }


  IssuePolicy:any;
getIssuePolicy(){
  this.service.getIssuePolicy(this.college_id).subscribe((res:any)=>{
    // console.log(res);
    this.IssuePolicy=res;
    
  })
}



EditCourse(Course: any,id:any) {
  Course.isEditing = true;

}
CancelEdit(Course: any) {
  Course.isEditing = false;
  // You might want to revert any changes made to the input fields
}

UpdateIssuePolicy(IssuePolicy: any,id:any) {
// console.log(IssuePolicy);

IssuePolicy.isEditing = false;
  this.service.updIssuePolicy(id,IssuePolicy).subscribe((res:any)=>{
console.log(res);

        alert(res);
     
        this.getIssuePolicy();
      // this.showToast();
    },
    (error) => {
      alert('Something Went Wrong');
    }
    
  );

}

DeleteIssuePolicy(id: any) {
  const confirmation = confirm("Are you sure you want to delete this issuepolicy?");
  if (confirmation) {
    this.service.delIssuePolicy(id).subscribe((res: any) => {
        alert(res);
        this.getIssuePolicy();
    },(err:any)=>{
      alert('Something went wrong !')
    });
  }
}
}
