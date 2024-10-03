import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DEPTISSUEModel, bookIssue, book_reservation } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import { interval } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-book-issue-two',
  templateUrl: './book-issue-two.component.html',
  styleUrls: ['./book-issue-two.component.css']
})
export class BookIssueTwoComponent {
  imagePath: any = "http://yourapiurlputhere:5001/studentphoto/";
  constructor(private service: AllDataService,private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.college_id = sessionStorage.getItem('college_id')
    this.entryBY = sessionStorage.getItem('user_id')
    this.getSingleCourses()
    // this.GetDepartmentsBasedonClgandCourse()
    this.getLibraryCrad()
    this.getBooks()
    this.issueType()
    // interval(5000).subscribe(() => {
    //   this.getLibraryCrad()
    // this.getBooks()
    // this.issueType()
    // });

  }
  hideIssueStudent: any = true
  hideIssueEmployee: any
  hideIssueDepartment: any;
  currentUserTypeIssue: string = 'STD';
  StudentIssuePage() {
    this.hideIssueStudent = true;
    this.hideIssueEmployee = false;
    this.hideIssueDepartment = false;
    this.STD_EMP = true
    this.currentUserTypeIssue = 'STD';
    // console.log(this.currentUserTypeIssue);
  }
  STD_EMP: boolean = true;
  DepartmentIssuePage() {
    this.hideIssueDepartment=true
    // this.hideIssueDepartment = !this.hideIssueDepartment;
    this.hideIssueEmployee = false;
    this.hideIssueStudent = false;
    this.STD_EMP = false
    this.currentUserTypeIssue = 'DEPT';
    this.inputLibraryCardNo=''
    // console.log(this.currentUserTypeIssue);
  }

  LibraryCardView:any=false
  userData:any
  BookisseModel=new bookIssue()
  inputLibraryCardNo:any
  getUserDetailsbyLibraryCardNo(ev:any){
    // console.log(ev.target.value);
    this.inputLibraryCardNo=ev.target.value
    if(this.inputLibraryCardNo){
      this.service.getAllUsers(this.inputLibraryCardNo).subscribe((res:any)=>{
        // console.log(res.college_id);
        if(this.college_id!=res.college_id){
          return
        }
        
        if(res.length===0 ){
          this.LibraryCardView=false
        }else{
          this.LibraryCardView=true
        }
        this.userData=res;
        this.BookisseModel.user_id=res.user_id
      })
    }
    
  }




  college_id:any
  entryBY:any

  allBooks: any;
  getBooks() {
    this.service.getAllBooks(this.college_id).subscribe((res: any) => {
console.log(res);

     this.allBooks = res.filter((book:any) => book.book_status === 'inlibrary' || book.book_status==='requested'  );
      // console.log(this.allBooks);
    })
  }

  issue_data:any
  issueTypeMap: { [key: number]: string } = {};
  issueType(){
    this.service.issueType(this.college_id).subscribe((data:any)=>{
      this.issue_data = data
      // console.log(this.issue_data);
      this.issue_data.forEach((issueItem: any) => {
        this.issueTypeMap[issueItem.issue_type_id] = issueItem.issue_type;
      });
      
    })
  }

  
  issue_type_id:any
  issueChange(selectedIssueTypeId: any) {
    if(this.BookisseModel.user_id==null){
      alert('Please enter valid library card no')
      this.BookisseModel.issue_type_id=null
  }else{
    // alert('Found')
    // console.log(selectedIssueTypeId);
    this.issue_type_id=selectedIssueTypeId

   //Maximum No Book 
    this.service.maxNo(this.BookisseModel.user_id,selectedIssueTypeId).subscribe((data:any)=>{
      if(data == 0){
        alert("Sorry !!Maximum no of book is not assigned To Your roel Yet!!")
      }else{
        // console.log("proceed to max")
        this.BookisseModel.max_book = data[0].max_book
        // console.log(this.BookisseModel.max_book);
      }
      
    })

//Issued Book And Requezsted Book
    this.service.isuRtnBook(this.BookisseModel.user_id,selectedIssueTypeId).subscribe((cata:any)=>{
      // console.log(cata);
      this.BookisseModel.issued_book = cata.issued_book
      this.BookisseModel.requested_book = cata.requested_book
      // console.log(this.BookisseModel.issued_book,this.BookisseModel.requested_book);
    })


//Assign user Type
this.service.getUserRoleBYuserID(this.BookisseModel.user_id).subscribe((res:any)=>{
  // console.log(res);
  const user_role = res.map((item: any) => item.user_role);
  // console.log(user_role);
  const isStdUser = user_role.includes('Student');
  if (isStdUser) {
  //  console.log('Student ');
    this.BookisseModel.user_type='STD'
  } else {
    // console.log('All are Employee');
    this.BookisseModel.user_type='EMP'
  }
  // console.log(this.BookisseModel.user_type);
  
})
    
  }
  }
  
 
  selectedIssues: {book_title:any, issue_type_id: number, accession_no: string }[] = [];

  isChecked:any = false;
  selectedAccessNumbers: string[] = []; 

  handleCheckboxChange(accession_no: any,book_title:any) {
    if (this.BookisseModel.issue_type_id === null || this.BookisseModel.issue_type_id === 0) {
      alert("Please select Issue type!!");
    }else{

      const combine_issue_request = parseInt(this.BookisseModel.issued_book ) + parseInt(this.BookisseModel.requested_book) 
      const rest_book =  parseInt(this.BookisseModel.max_book) - Number(combine_issue_request)
      // console.log("rest book=>",rest_book);
      // console.log("combine_issue_request=>",combine_issue_request);
      // console.log("max_book=>",this.BookisseModel.max_book);

     if(combine_issue_request < this.BookisseModel.max_book ){
      // console.log("Proceded");

      //proceed area
      if (this.selectedIssues.length < rest_book) { 
        // Adjust the limit as needed
        const index = this.selectedIssues.findIndex(
          (item: any) => item.issue_type_id === this.BookisseModel.issue_type_id && item.accession_no === accession_no
        );
      
        if (index > -1) {
          this.selectedIssues.splice(index, 1); // Remove the item (deselect)
        } else {
          this.selectedIssues.push({ book_title:book_title,issue_type_id: this.BookisseModel.issue_type_id, accession_no: accession_no });
          // console.log(`Issue ${issue_id} and Accession No.${accession_no}`);
        }
        
      } else {
        // Check if the checkbox is being unchecked for an existing item
        const index = this.selectedIssues.findIndex(
          (item: any) => item.issue_type_id === this.BookisseModel.issue_type_id && item.accession_no === accession_no
        );
      
        if (index > -1) {
          this.selectedIssues.splice(index, 1); // Remove the item (deselect)
        } else {
          alert("Reached the maximum limit of items.");
          this.isChecked=false;
        }
      }

      console.log(this.selectedIssues);
      // console.log(this.selectedIssues.length -1 );
      

     }else{
      // console.log("Stop");
      alert('Already Reached the maximum limits')
     }

     }
    
  
    
  }
  
  removeItemByAccessionNo(accession_no: any) {
    const index = this.selectedIssues.findIndex((item: any) => item.accession_no === accession_no);
    if (index > -1) {
      this.selectedIssues.splice(index, 1); // Remove the item
    }
  }
  



  OpenConfirmModalForUserIssue(){
    if(this.selectedIssues.length === 0){
      alert('Please Select Books');
      return;
  }
  if(this.selectedIssues && this.BookisseModel.user_id){
    const modalElement = this.el.nativeElement.querySelector('#myModal');
    this.renderer.addClass(modalElement, 'show'); // Show the modal
    this.renderer.setStyle(modalElement, 'display', 'block');
  }else{
    alert('Please select Issue Type and Libraty Card no')
  }









  //   const formData = new FormData();
  // formData.append('selectedData', JSON.stringify(this.selectedIssues));
  // formData.append('user_id', this.BookisseModel.user_id);
  // formData.append('college_id', this.college_id);
  // formData.append('entry_by', this.  entryBY);
  // formData.append('user_type', this.BookisseModel.user_type);

  // this.service.BookIssue(formData).subscribe(
  //   (res: any) => {
  //     console.log(res);
  //     alert(res);
  //     location.reload();
  //   },
  //   (err: any) => {
  //     console.log(err);
  //     alert('Something went wrong!');
  //   }
  // );
  // }else{
  //   alert('Invalid library card no or Issue type is not selected')
  // }

}


// close MOdal
closeModal() {
  const modalElement = this.el.nativeElement.querySelector('#myModal');
  this.renderer.removeClass(modalElement, 'show'); // Hide the modal
  this.renderer.setStyle(modalElement, 'display', 'none'); // Hide the modal
}


MultipleBookIssue(){
   if(this.selectedIssues && this.BookisseModel.user_id){

    const formData = new FormData();
  formData.append('selectedData', JSON.stringify(this.selectedIssues));
  formData.append('user_id', this.BookisseModel.user_id);
  formData.append('college_id', this.college_id);
  formData.append('entry_by', this.  entryBY);
  formData.append('user_type', this.BookisseModel.user_type);

  this.service.BookIssue(formData).subscribe(
    (res: any) => {
      console.log(res);
      alert(res);
      // location.reload();
      this.closeModal();
      this.getBooks()
      this.selectedIssues=[];
    },
    (err: any) => {
      console.log(err);
      alert('Something went wrong!');
    }
  );
  }else{
    alert('Invalid library card no or Issue type is not selected')
  }

}
















selectedIssuesforSingleIssue: { issue_type_id: number, accession_no: string }[] = [];

//Single Issue
singleIssue(accession_no:any){
  if(this.BookisseModel.issue_type_id && this.BookisseModel.user_id){
    const combine_issue_request = parseInt(this.BookisseModel.issued_book ) + parseInt(this.BookisseModel.requested_book) 
      const rest_book =  parseInt(this.BookisseModel.max_book) - Number(combine_issue_request)
    
    if(combine_issue_request < this.BookisseModel.max_book ){
      // console.log("Proceded");

      //proceed area
      const issueData = {
        issue_type_id: this.BookisseModel.issue_type_id,
        accession_no: accession_no,
      };

      // Find the index of the existing item in the array, if it exists
      const existingIndex = this.selectedIssuesforSingleIssue.findIndex(item =>
        item.issue_type_id === issueData.issue_type_id
      );

      if (existingIndex !== -1) {
        // Replace the existing item with the new one
        this.selectedIssuesforSingleIssue[existingIndex] = issueData;
      } else {
        // If the item doesn't exist in the array, push it
        this.selectedIssuesforSingleIssue.push(issueData);
      }

      // console.log(this.selectedIssuesforSingleIssue);

      if(this.selectedIssuesforSingleIssue && this.BookisseModel.user_id){
        const formData = new FormData();
      formData.append('selectedData', JSON.stringify(this.selectedIssuesforSingleIssue));
      formData.append('user_id', this.BookisseModel.user_id);
      formData.append('college_id', this.college_id);
      formData.append('entry_by', this.  entryBY);
      formData.append('user_type', this.BookisseModel.user_type);
    
      this.service.BookIssue(formData).subscribe(
        (res: any) => {
          console.log(res);
          alert(res);
          // location.reload();
          this.getBooks();
        },
        (err: any) => {
          console.log(err);
          alert('Something went wrong!');
        }
      );
      }else{
        alert('Invalid library card no or Issue type is not selected')
      }

      //proceed area

     }else{
      console.log("Stop");
     }

  }else{
    alert('Please select Issue Type')
  }
}






  //Departmental Issue
  filteredCourses:any
  
  getSingleCourses() {
    if (this.college_id) {
      this.service.getSingleCourseBasedOncollege(this.college_id).subscribe((res: any) => {
        this.filteredCourses = res;
        // console.log(res);
      });
    }
  }
  courseID: any;
  departments: any[]=[]
  onCourseChange(selectedCourseID: any) {
    // console.log(selectedCourseID);

    if (selectedCourseID) {
      this.service.getDeptBasedOnClgandCourse(this.college_id, selectedCourseID).subscribe((res: any) => {
        // console.log(res);
        this.departments = res
      })
    }else{
      this.departments=[]
    }
  }

  dept_id: any
  ondeptChange(selecteddeptID: any) {
    // console.log(selecteddeptID);
    if (selecteddeptID) {
      this.dept_id = selecteddeptID;
    }else{
      this.dept_id=null
    }
  }


  libraryCrdNo: any[]=[]
  getLibraryCrad() {
    this.service.getLibraryCardNobasedOnclg(this.college_id).subscribe((res: any) => {
      // console.log(res);
      this.libraryCrdNo = res.map((item:any)=>item.library_card_number)

    })
  }
  LibraryCardViewForDept:any=false;
  departmentalUsersData:any
  libraryCard_no: any[]=[]
  userIDforDetIssue:any=''
  usersDataForDeptIssue: any
  onLibrarcardChange(selecteuserID: any) {
    // console.log(selecteuserID);
    this.libraryCard_no = selecteuserID;
    if (this.libraryCard_no) {
      this.service.getAllUsers(selecteuserID).subscribe((res: any) => {
        console.log(res);
        if(res.length===0){
          this.LibraryCardViewForDept=false
        }else{
          this.LibraryCardViewForDept=true
          this.departmentalUsersData=res;
          this.usersDataForDeptIssue = res
          this.userIDforDetIssue=res.user_id
        }

  
      })
    }else{
            this.LibraryCardViewForDept=false    
             
    }
  }
  



  fileName: any;
  approvedDoc:any
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // You can perform any additional processing on the selected file here.
      // console.log('Selected file:', file.name);
      this.fileName = file.name;
      this.approvedDoc=file
      // console.log(this.approvedDoc);
      
    }
  }

p:any=1
  Book_search:any;
  emp_name:any=''
  emp_id:any=''



selectedItemsForDEPT: { accession_no: string }[] = [];

handleCheckboxChangeForDept(accession_noforDEPT: any) {
  const index = this.selectedItemsForDEPT.findIndex(item => item.accession_no === accession_noforDEPT);

  if (index === -1) {
    // Item is not in the array, so add it
    this.selectedItemsForDEPT.push({ accession_no: accession_noforDEPT });
  } else {
    // Item is already in the array, so remove it
    this.selectedItemsForDEPT.splice(index, 1);
  }

  console.log(this.selectedItemsForDEPT);
}







DeptIssue(validation: any) {

  // console.log(this.selectedItemsForDEPT);
  // console.log(this.userIDforDetIssue);
  // console.log(this.dept_id);
  // console.log( this.college_id);
  // console.log( this.entryBY);
  // console.log( this.currentUserTypeIssue);
  // console.log(  this.emp_name);
  // console.log(  this.emp_id);
  
  if (validation.valid) {
    const formData = new FormData();
    formData.append('selectedData', JSON.stringify(this.selectedItemsForDEPT));
    if (this.libraryCard_no) {
      formData.append('user_id', this.userIDforDetIssue)
    }
    formData.append('dept_id', this.dept_id)
    formData.append('college_id', this.college_id)
    formData.append('entry_by', this.entryBY)
    formData.append('user_type', this.currentUserTypeIssue);
    formData.append('document', this.approvedDoc);
    if(this.emp_name){
      formData.append('emp_name', this.emp_name);
    }
    if(this.emp_id){
      formData.append('emp_id', this.emp_id);
    }

    // Check if library card number is not provided
    if (!this.libraryCard_no) {
      // If library card number is not provided, make sure emp_name and emp_id are also provided
      if (!this.emp_name || !this.emp_id) {
        alert('Please enter Employee Name and Employee ID when Library Card is not provided.');
        return; // Exit the function since the form is not valid
      }
    }

   if(this.selectedItemsForDEPT.length >=1){
    this.service.DeptBookIssue(formData).subscribe(
      (res: any) => {
        console.log(res);
        alert(res);
        location.reload();
      },
      (err: any) => {
        console.log(err);
        alert('Something went wrong!');
      }
    );
   }else{
    alert("You have not selected any books yet");
   }
  } else {
    if (validation.controls.course_id.invalid) {
      alert('Please Select the course.');
    }
    if (validation.controls.dept_id.invalid) {
      alert('Please select the department.');
    }
    if (validation.controls.emp_name.invalid) {
      alert('Please Fill the employee name.');
    }
    if (validation.controls.emp_id.invalid) {
      alert('Please Fill employee id.');
    }
    if (validation.controls.librarycardno.invalid) {
      alert('Please Enter Library card no.');
    }
    // alert('Please Fill required field')
  }
}

  





 
}
