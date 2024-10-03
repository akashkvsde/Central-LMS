import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { College } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-college',
  templateUrl: './add-college.component.html',
  styleUrls: ['./add-college.component.css']
})
export class AddCollegeComponent implements OnInit {
  constructor(private service: AllDataService) { }
  entry_by:any
  college_id:any
  isSuperAdmin:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getAllColleges();
    // interval(5000).subscribe(() => {
    //   this.getAllColleges();
    // });
    
  }
  college_search:any;
  p: number = 1;


  CollegeModal = new College();
  //Insert College
  InsertCollege(validForm: any) {
    this.CollegeModal.entry_by=this.entry_by
    if (validForm.valid) {
        this.service.addCollege(this.CollegeModal).subscribe(
            (res: any) => {
              // console.log(res);
              alert(res);
              this.getAllColleges();
            },(err:any)=>{
              alert('Something went wrong !');
              // console.log(err);
              
            }
        );
        validForm.reset();
    } else {
        // if (validForm.controls.college_name.invalid) {
        //   alert('Please fill the College Name.');
        // }
        // if (validForm.controls.college_email.invalid) {
        //   alert('Please fill the College Email.');
        // }
        // if (validForm.controls.phone_no.invalid) {
        //   alert('Please fill the College Contact No.');
        // }
        // if (validForm.controls.college_address.invalid) {
        //   alert('Please fill the College Address.');
        // }
    }
}





  //Get All College Data
  Colleges: any;
  getAllColleges() {
    this.service.getCollege().subscribe((res: any) => {
      this.Colleges = res;
      // console.log(res);
    })
  }

  EditCollege(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    this.getAllColleges();
    // You might want to revert any changes made to the input fields
  }

  UpdateCollege(college: any,id:any) {
    college.isEditing = false;
    // console.log(college);
    this.service.updateCollege(id,college).subscribe((res:any)=>{
          alert(res);
          // console.log(res);
          this.getAllColleges();
        },(err:any)=>{
          alert('Something went wrong !');
        })
  }

  DeleteCollege(college_id: any) {
    const confirmation = confirm("Are you sure you want to delete this college?");
    if (confirmation) {
      this.service.deleteCollege(college_id).subscribe((res: any) => {
        alert(res)
        // console.log(res);
        
          this.getAllColleges();
      },(err:any)=>{
        alert ('Something went wrong !')
        // console.log(err);
        
      });
    }
  }
  
  


}
