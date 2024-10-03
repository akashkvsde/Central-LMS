import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Course } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
// declare const myFun:any;

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  constructor(private service: AllDataService) { }
  entry_by:any;
  p: number = 1;
  college_id:any
  isSuperAdmin:any
  ngOnInit(): void {
    this.entry_by=sessionStorage.getItem('user_id')
    this.college_id=sessionStorage.getItem('college_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    // this.getAllCollege();
    this.getCourses();
    // interval(5000).subscribe(() => {
    //   this.getCourses();
    // });
  }

  course_search: any;
  // allCollege: any[] = [];

  // getAllCollege() {
  //   this.service.getCollege(this.college_id).subscribe((res: any) => {
  //     this.allCollege = res
  //   })
  // }


  CourseModel = new Course()

  //Add College 
  addCourse(formV: any) {
    this.CourseModel.entry_by=this.entry_by
    this.CourseModel.college_id=this.college_id
    if (formV.valid) {
      this.service.addCourse(this.CourseModel).subscribe((res: any) => {
        alert(res);
        this.getCourses();
      }, (error) => {
        alert('Something Went Wrong');
        this.getCourses();
      })
      formV.reset();
    } else {
      // if (formV.controls.college_id.invalid) {
      //   alert('Please fill the College Name.');
      // }
      if (formV.controls.course_name.invalid) {
        alert('Please fill the Course Name.');
      }

    }

  }

  Courses: any;
  getCourses() {
    this.service.getCourse(this.college_id).subscribe((res: any) => {
      this.Courses = res;
    })
  }


  EditCourse(Course: any, id: any) {
    Course.isEditing = true;

  }
  CancelEdit(Course: any) {
    Course.isEditing = false;
  }

  UpdateCourses(Course: any, id: any) {
    Course.isEditing = false;
    this.service.updateCourse(id, Course).subscribe((res: any) => {
      alert(res);
      this.getCourses();
    },
      (error) => {
        alert('Something Went Wrong');
      }

    );

    // Perform update logic here, e.g., send update request to server
  }

  DeleteCourse(id: any) {
    const confirmation = confirm("Are you sure you want to delete?");
    if (confirmation) {
      this.service.deleteCourse(id).subscribe((res: any) => {
        alert(res);
        this.getCourses();
      },
        (error) => {
          alert('Something Went Wrong');
        }

      );
    }
  }


}

