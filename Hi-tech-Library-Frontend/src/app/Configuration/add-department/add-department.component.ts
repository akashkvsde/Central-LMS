import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Department } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
declare const myFun: any;
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  constructor(private service: AllDataService) { }
  p: number = 1;
  entry_by:any
  isSuperAdmin:any
  ngOnInit(): void {
    // myFun();
    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    // this.getAllCollege();
    this.getAllDepartment();
    this.getSingleCourses();
    // interval(5000).subscribe(() => {
    //   this.getAllDepartment();
      
    // });
   
  }
  dept_search:any;
  allCollege: any[] = [];
  // getAllCollege() {
  //   this.service.getCollege(this.college_id).subscribe((res: any) => {
  //     this.allCollege = res
  //   })
  // }

  // collegeID: any='';
  // onCollegeChange(selectedCollegeId: any) {
  //   this.filteredCourses = []; 
  //   if (selectedCollegeId) {
  //     this.collegeID = selectedCollegeId;
  //     // console.log(this.collegeID);
      
  //     this.getSingleCourses();
  //   }
  // }

  filteredCourses:any = [];
  getSingleCourses() {
    this.service.getSingleCourseBasedOncollege(this.college_id).subscribe((res: any) => {
      this.filteredCourses = res;
      // console.log(res);
    });
  }



  DeptModel = new Department();
  Alldept: any;
  college_id:any
  getAllDepartment() {
    this.service.getdept(this.college_id).subscribe((res: any) => {
      this.Alldept = res;
      //  console.log(res);

    })
  }

//Add Department
  AddDepartment(validForm: any) {
    this.DeptModel.entry_by=this.entry_by
    this.DeptModel.college_id=this.college_id
    // console.log(this.DeptModel);
    if (validForm.valid) {
      this.service.adddept(this.DeptModel).subscribe((res: any) => {
        alert(res);
        console.log(res);
        
        this.getAllDepartment()

      },(err:any)=>{
        console.log(err);
        
        alert('Something went wrong')
      })
      validForm.reset();
    } else {
      // if (validForm.controls.College_id.invalid) {
      //   alert('Please select the college Name.');
      // }
      if (validForm.controls.course_id.invalid) {
        alert('Please fill the course name.');
      }
      if (validForm.controls.Department_name.invalid) {
        alert('Please fill the department name.');
      }
    }

  }


  
EditCourse(dept: any,id:any) {
  dept.isEditing = true;
  const preCourse = [{'course_id':dept.course_id,'course_name':dept.course_name}]
  this.filteredCourses.push(preCourse[0])
  // console.log(dept);
  
}
CancelEdit(Course: any) {
  Course.isEditing = false;
  
}


UpdateCourses(Course: any,id:any) {
  Course.isEditing = false;
  this.service.updatedept(id,Course).subscribe((res:any)=>{
        alert(res);
        console.log(res);
        
        this.getAllDepartment();
    },
    (error) => {
      alert('Something Went Wrong');
      this.getAllDepartment();
    }
    
  );

  // Perform update logic here, e.g., send update request to server
}

DeleteDept(id: any) {
  const confirmation = confirm("Are you sure you want to delete this department?");
  if (confirmation) {
    this.service.deletedept(id).subscribe((res: any) => {
        alert(res);
        // this.successtoastMessage='Course Data Deleted successfully!'
        this.getAllDepartment();
    },(err:any)=>{
      alert('Something went Wrong')
    });
  }
}
  
 

  


}
