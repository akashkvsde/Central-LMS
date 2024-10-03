import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Subject } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent implements OnInit {
  constructor(private service:AllDataService){}
  entryBy:any
  p: number = 1;
  isSuperAdmin:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id');
    this.entryBy=sessionStorage.getItem('user_id');
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getSubject();
    // interval(5000).subscribe(() => {
    //   this.getSubject();
    // });
  }
  college_id:any
Subject_search:any;

  SubjectModel=new Subject();


  addSubject(validForm: any) {
    this.SubjectModel.college_id=this.college_id;
    this.SubjectModel.entry_by=this.entryBy;
    if (validForm.valid) {
      this.service.addSubject(this.SubjectModel).subscribe((res:any)=>{
        alert(res);
        this.getSubject();
        validForm.reset();
      },(err:any)=>{
        alert(err)
      })
    }else {
      if (validForm.controls.subject_name.invalid) {
        alert('Please enter the Subject name.');
      }

    }

  }
  allSUbjects: any;
  getSubject() {
    this.service.getSubject(this.college_id).subscribe((res: any) => {
      this.allSUbjects = res;
      // console.log(res);

    })
  }


  EditSubject(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateSubject(userrole: any,id:any) {
    // console.log(userrole);

    userrole.isEditing = false;
    this.service.updSubject(id,userrole).subscribe((res:any)=>{
          alert(res);
          this.getSubject();
      },
      (error:any) => {
        alert('Something Went Wrong');


      }

    );

  }

  DeleteSubject(id: any) {
    const confirmation = confirm("Are you sure you want to delete this Subject?");
    if (confirmation) {
      this.service.delSubject(id).subscribe((res: any) => {
      alert(res)
          this.getSubject();
      },(error:any) => {
        alert('Something Went Wrong');

      });
    }
  }
  }
