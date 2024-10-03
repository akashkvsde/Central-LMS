import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Booktitles } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
declare const myFun:any;

@Component({
  selector: 'app-add-book-title',
  templateUrl: './add-book-title.component.html',
  styleUrls: ['./add-book-title.component.css']
})
export class AddBookTitleComponent implements OnInit {
  constructor(private service:AllDataService){}
  p: number = 1;
  college_id:any
  entry_by:any
  isSuperAdmin:any

  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()

    this.getBookTitles();
    // interval(5000).subscribe(() => {
    //   this.getBookTitles();
    // });
  }
  bookTitle_search:any;
  BooktitlesModel=new Booktitles();

  addBookTitle(validForm: any) {
    this.BooktitlesModel.college_id=this.college_id
    this.BooktitlesModel.entry_by=this.entry_by
    if (validForm.valid) {
      this.service.addBookTitles(this.BooktitlesModel).subscribe((res:any)=>{
        // console.log(res);
        alert(res);
        this.getBookTitles();
        validForm.reset();
      },
      (error:any) => {
        alert('Something Went Wrong');
        this.getBookTitles();

      })
    }else {
      if (validForm.controls.book_title_name.invalid) {
        alert('Please enter the Book Title Name.');
      }

    }

  }
  BookTitle: any;
  getBookTitles() {
    this.service.getBookTitles(this.college_id).subscribe((res: any) => {
      this.BookTitle = res;
    })
  }


  EditBookTitle(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateBookTitle(titlename: any,id:any) {
    titlename.isEditing = false;
    // console.log(titlename);

    this.service.updBookTitles(id,titlename).subscribe((res:any)=>{
      // console.log(res);
          alert(res);
          this.getBookTitles();

      },
      (error:any) => {
        alert('Something Went Wrong');
        this.getBookTitles();


      }

    );

    // Perform update logic here, e.g., send update request to server
  }

  DeleteBookTitle(id: any) {
    // console.log(id);

    const confirmation = confirm("Are you sure you want to delete this Book title?");
    if (confirmation) {
      this.service.delBookTitles(id).subscribe((res: any) => {

          alert(res);
          this.getBookTitles();
      },
      (error:any) => {
        alert('Something Went Wrong');
        this.getBookTitles();
      }
      );
    }
  }
}
