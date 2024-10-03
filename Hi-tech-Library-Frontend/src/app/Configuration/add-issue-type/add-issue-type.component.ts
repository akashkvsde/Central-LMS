import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Issuetype } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-issue-type',
  templateUrl: './add-issue-type.component.html',
  styleUrls: ['./add-issue-type.component.css']
})
export class AddIssueTypeComponent implements OnInit {
  constructor(private service: AllDataService) { }
  college_id:any
  entry_by:any
  isSuperAdmin:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
  this.entry_by=sessionStorage.getItem('user_id')
  this.isSuperAdmin= this.service.isSuperAdmin()
    this.IssueType();
    // interval(5000).subscribe(() => {
    //   this.IssueType();
    // });
  }

  issuetype_search:any;
  IssuetypeModel = new Issuetype();

  addIssueType(validForm: any) {
    // console.log(this.IssuetypeModel);
    this.IssuetypeModel.college_id=this.college_id
    this.IssuetypeModel.entry_by=this.entry_by
    if (validForm.valid) {
      this.service.addIssueType(this.IssuetypeModel).subscribe((res: any) => {
        alert(res);
        this.IssueType();
        validForm.reset();
      },(err:any)=>{
        alert('Something went wrong !')
      })
    } else {
      if (validForm.controls.issue_type.invalid) {
        alert('Please enter issue type.');
      }
      if (validForm.controls.issue_days.invalid) {
        alert('Please enter the issue days.');
      }
    }

  }
  issueTypes: any;
  IssueType() {
    this.service.getIssueType(this.college_id).subscribe((res: any) => {
      this.issueTypes = res;
    })
  }


  EditCollege(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateIssueType(issuetype: any, id: any) {
    issuetype.isEditing = false;
    // console.log(issuetype);
    
    this.service.updIssueType(id, issuetype).subscribe(
      (res: any) => {
          alert(res);
          // console.log(res);
          
        this.IssueType();
      },
      (error) => {
        alert('Something Went Wrong');
      }
    );
  }
  

  DeleteIssuetype(id: any) {
    const confirmation = confirm("Are you sure you want to delete this issuetype?");
    if (confirmation) {
      this.service.delIssueType(id).subscribe((res: any) => {
          alert(res);

          this.IssueType();
  

      },(err:any)=>{
        alert('Something went wrong !')
      });
    }
  }


}
