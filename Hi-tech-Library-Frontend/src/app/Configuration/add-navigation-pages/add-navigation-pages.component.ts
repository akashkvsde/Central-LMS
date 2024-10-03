import { Component, OnInit } from '@angular/core';
import { NavigationPage } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-navigation-pages',
  templateUrl: './add-navigation-pages.component.html',
  styleUrls: ['./add-navigation-pages.component.css']
})
export class AddNavigationPagesComponent implements OnInit {
  constructor(private service:AllDataService){}
  p: number = 1;
  entry_by:any
  isSuperAdmin:any
  ngOnInit(): void {
    this.entry_by=sessionStorage.getItem('user_id');

this.isSuperAdmin= this.service.isSuperAdmin()

    this.getBookTitles();
  }
  navigationpage_search:any;
  NavigationPageModel=new NavigationPage();

  addBookTitle(validForm: any) {
    this.NavigationPageModel.entry_by= this.entry_by;
    if (validForm.valid) {
      this.service.addnavPage(this.NavigationPageModel).subscribe((res:any)=>{
        console.log(res);
        alert(res);
        this.getBookTitles();
        validForm.reset();
      },
      (error:any) => {
        alert('Something Went Wrong');
        this.getBookTitles();
        
      })
    }else {
      if (validForm.controls.Title_name.invalid) {
        alert('Please enter the Book Title Name.');
      }
     
    }
    
  }
  BookTitle: any;
  getBookTitles() {
    this.service.getnavPage().subscribe((res: any) => {
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
    
    this.service.updnavPage(id,titlename).subscribe((res:any)=>{
      console.log(res);
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
      this.service.delnavPage(id).subscribe((res: any) => {
      
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