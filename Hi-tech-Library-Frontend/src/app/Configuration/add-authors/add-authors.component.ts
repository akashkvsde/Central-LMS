import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Authors } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
declare const myFun:any;

@Component({
  selector: 'app-add-authors',
  templateUrl: './add-authors.component.html',
  styleUrls: ['./add-authors.component.css']
})
export class AddAuthorsComponent implements OnInit {
  constructor(private service:AllDataService){}
  entryBy:any
  p: number = 1;
  isSuperAdmin:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id');
    this.entryBy=sessionStorage.getItem('user_id');
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getAuthor();
    // interval(5000).subscribe(() => {
    //   this.getAuthor;
    // });


  }
  college_id:any
  Author_search:any;

  AuthorModel=new Authors();


  addAuthors(validForm: any) {
    this.AuthorModel.college_id=this.college_id;
    this.AuthorModel.entry_by=this.entryBy;
    if (validForm.valid) {
      this.service.addAuthors(this.AuthorModel).subscribe((res:any)=>{
        alert(res);
        this.getAuthor();
        validForm.reset();
      },(err:any)=>{
        alert(err)
      })
    }else {
      if (validForm.controls.author_name.invalid) {
        alert('Please enter the Author name.');
      }

    }

  }
  allAuthors: any;
  getAuthor() {
    this.service.getAuthors(this.college_id).subscribe((res: any) => {
      this.allAuthors = res;
      // console.log(res);

    })
  }


  EditAuthors(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateAuthors(userrole: any,id:any) {
    // console.log(userrole);

    userrole.isEditing = false;
    this.service.updAuthors(id,userrole).subscribe((res:any)=>{
          alert(res);
          this.getAuthor();
      },
      (error:any) => {
        alert('Something Went Wrong');


      }

    );

  }

  DeleteAuthors(id: any) {
    const confirmation = confirm("Are you sure you want to delete this Authors?");
    if (confirmation) {
      this.service.delAuthors(id).subscribe((res: any) => {
      alert(res)
          this.getAuthor();
      },(error:any) => {
        alert('Something Went Wrong');

      });
    }
  }
  }
