import { Component, HostListener, OnInit } from '@angular/core';
import { DEPTISSUEModel, book_reservation } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-book-issue',
  templateUrl: './book-issue.component.html',
  styleUrls: ['./book-issue.component.css']
})
export class BookIssueComponent implements OnInit {
  constructor(private service: AllDataService) { }
  entryBY: any
  p: number = 1;
  ngOnInit(): void {
    this.college_id = sessionStorage.getItem('college_id')
    this.entryBY = sessionStorage.getItem('user_id')
    this.getSingleCourses()
    this.getLibraryCrad()
    this.getAllBookTitle();
    this.getAllAuthors();
    this.getBooks();
    this.getBookIssueType();
    // this.getAllStd();
    // this.getEmp();
    // this.StdwithEmpData();
    this.getIssuePolicy();
  }

  BookTitle_search: any
  BookTitles: any
  college_id: any
  getAllBookTitle() {
    this.service.getBookTitles(this.college_id).subscribe((res: any) => {
      this.BookTitles = res;
      // console.log(res);


    })
  }
  Authors_search: any
  BookAuthors: any
  getAllAuthors() {
    this.service.getAuthors(this.college_id).subscribe((res: any) => {
      this.BookAuthors = res;

    })
  }

  BookIssueType: any
  getBookIssueType() {
    this.service.getIssueType(this.college_id).subscribe((res: any) => {
      this.BookIssueType = res;
      // console.log(res);


    })
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

  // EmployeeIssuePage() {
  //   this.hideIssueEmployee = true;
  //   this.hideIssueStudent = false;
  //   this.STD_EMP = true
  //   this.hideIssueDepartment = false;
  //   this.currentUserTypeIssue = 'EMP';
  //   // console.log(this.currentUserTypeIssue);
  //   this.inputLibraryCardNo=null
  // }
  STD_EMP: boolean = true;
  DepartmentIssuePage() {
    this.hideIssueDepartment=true
    // this.hideIssueDepartment = !this.hideIssueDepartment;
    this.hideIssueEmployee = false;
    this.hideIssueStudent = false;
    this.STD_EMP = false
    this.currentUserTypeIssue = 'DEPT';
    // console.log(this.currentUserTypeIssue);
  }

  selectedOptions: any[] = [];
  handleCheckboxChange(selectedBook: any) {
    const accessionNo = selectedBook.accession_no;
    const bookTitle = selectedBook.book_title_name;

    const isSelected = this.selectedOptions.some(option => option.accession_no === accessionNo);

    if (!isSelected) {
      this.selectedOptions.push(selectedBook);
      // console.log(`Selected Book: Accession No - ${accessionNo}, Title - ${bookTitle}`);
      // console.log(this.selectedOptions);

    } else {
      const index = this.selectedOptions.findIndex(option => option.accession_no === accessionNo);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
        // console.log(`Selected Book: Accession No - ${accessionNo}, Title - ${bookTitle}`);
        console.log(this.selectedOptions);
      }
    }
  }





  IssuePage: any;
  SelectedBooks() {
    // console.log(this.selectedOptions);
    
    // Check if there are no selected books
    if (this.selectedOptions.length === 0) {
      alert("Please select books before proceeding.");
      return;
    }
    const canIssue = this.selectedOptions.every(book => book.book_status === "inlibrary");
  
    if (!canIssue) {
      alert("You can only issue books that are in the library.");
      return;
    }
  
    // Proceed to issue the books
    this.IssuePage = !this.IssuePage;
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

  Book_search: any
  allBooks: any;
  getBooks() {
    this.service.getAllBooks(this.college_id).subscribe((res: any) => {

     this.allBooks = res.filter((book:any) => book.book_status === 'inlibrary');
      // console.log(this.allBooks);
    })
  }

  issuePolicyData: any;
  getIssuePolicy() {
    this.service.getIssuePolicy(this.college_id).subscribe((res: any) => {
      this.issuePolicyData = res
      // console.log(res);
    })
  }

  imagePath: any = "http://192.168.50.250:8000/studentphoto/";
  userData: any;
  inputLibraryCardNo: any;
  maxBook: any;
  totalIssuedBooks: any;
  // selectedIssueTypes: any = {};
  processedData: any[] = [];
  userID: any
  LibraryCardView:any=false
Model=new book_reservation()
  getMaxBookBasedLibraryCard(ev: any) {
    this.inputLibraryCardNo = ev.target.value;
    // console.log(ev.target.value);
   if(this.inputLibraryCardNo){
    this.service.getAllUsers(this.inputLibraryCardNo).subscribe((res: any) => {
      this.userData = res;
      this.Model.user_id=res.user_id
      console.log( this.Model.user_id);

      


      if(res.length===0){
        // alert("Please enter valid library card number");
        // location.reload()
        this.LibraryCardView=false
      }else{
        this.LibraryCardView=true
        if (res.user_role !== 'student' && res.user_role !== 'Student' && res.user_role !== 'STUDENT') {
          // alert('This Library Card is registered for Employee')
          this.hideIssueEmployee = true;
          this.hideIssueStudent = false;
          this.STD_EMP = true;
          this.currentUserTypeIssue = 'EMP';
        }
      }
     
      
      this.maxBook = res.max_book;
      this.userID = res.user_id;
      this.getIssuedBooksNumber();
    },(err:any)=>{
      console.log(err);
      
    });
   }else{
    // alert('Please Enter Library Card No')
   }
  }

  getIssuedBooksNumber() {
   if(this.inputLibraryCardNo){
    this.service.getIssudeBookstouserInnum(this.inputLibraryCardNo).subscribe((res: any) => {
      console.log(res);
      this.totalIssuedBooks = res;
    });
   }
  }
  selectedIssueTypes: any[] = [];
  issueTypeMap: { [accession_no: string]: any } = {};

  onIssueTypeChange(accession_no: string, issue_type_id: any) {
    if (accession_no && issue_type_id) {
      this.issueTypeMap[accession_no] = issue_type_id;
      this.service.maxNo(this.Model.user_id,issue_type_id).subscribe((data:any)=>{
        console.log(data);
        
        if(data == 0){
          alert("Sorry !!Maximum no of book is not assigned To Your roel Yet!!")
        }else{
          console.log("proceed to max")
          this.Model.max_book = data[0].max_book
          console.log(this.Model.max_book);
        }
        
      })


      this.service.isuRtnBook(this.Model.user_id,issue_type_id).subscribe((cata:any)=>{
        console.log(cata);
        this.Model.issued_book = cata.issued_book
        this.Model.requested_book = cata.requested_book
        // console.log(this.Model.issued_book,this.Model.requested_book);
      })

const restBook=parseInt(this.maxBook)-(parseInt(this.Model.issued_book) + parseInt(this.Model.requested_book))

console.log(restBook);

    


      
  
      // this.selectedIssueTypes = Object.keys(this.issueTypeMap).map((key) => ({
      //   accession_no: key,
      //   issue_type_id: this.issueTypeMap[key],
      // }));
      // console.log(this.selectedIssueTypes);
      
    }
  }

//cancel
cancel(book: any) {
  // Remove the item from selectedOptions array
  const index = this.selectedOptions.findIndex(item => item.accession_no === book.accession_no);
  if (index !== -1) {
    this.selectedOptions.splice(index, 1);
  }

  // Remove the item from selectedIssueTypes array
  this.selectedIssueTypes = this.selectedIssueTypes.map(item => {
    if (item.accession_no.toString() === book.accession_no.toString()) {
      return null; // Remove the item by returning null
    } else {
      return item;
    }
  }).filter(Boolean); // Filter out null values

}
  
//bok issu submit
  canbetakenBook: any;
  BookIssueToSTD_EMP(libraryCardNo: any) {
   

    if (isNaN(this.maxBook) || isNaN(this.totalIssuedBooks)) {
      // Handle the case where maxBook or totalIssuedBooks are not valid numbers
      alert('Invalid maxBook or totalIssuedBooks.');
      return;
    }

    if (this.selectedIssueTypes.length === 0) {
      alert('Please select an issue type.');
    } else if (this.selectedIssueTypes.length !== this.selectedOptions.length) {
      alert('Check issue types you have missed one for some books.');
      return;
    }
    
    const booksCanBeTaken = parseInt(this.maxBook) - parseInt(this.totalIssuedBooks);
    console.log(booksCanBeTaken);





    
    //   console.log(this.selectedOptions);
    // console.log(this.selectedIssueTypes);
    

  }
  
  


  //Departmental Issue
  DEPTISSUEModel = new DEPTISSUEModel()

  courseID: any;
  filteredCourses: any[] = []; // Assuming filteredCourses is an array of course objects
  onCourseChange(selectedCourseID: any) {
    // console.log(selectedCourseID);
    if (selectedCourseID) {
      this.courseID = selectedCourseID;
      this.GetDepartmentsBasedonClgandCourse()
    }
  }

  getSingleCourses() {
    if (this.college_id) {
      this.service.getSingleCourseBasedOncollege(this.college_id).subscribe((res: any) => {
        this.filteredCourses = res;
        // console.log(res);
      });
    }
  }
  departments: any
  GetDepartmentsBasedonClgandCourse() {
    this.service.getDeptBasedOnClgandCourse(this.college_id, this.courseID).subscribe((res: any) => {
      // console.log(res);
      this.departments = res

    })
  }
  dept_id: any
  ondeptChange(selecteddeptID: any) {
    // console.log(selecteddeptID);
    if (selecteddeptID) {
      this.dept_id = selecteddeptID;
    }
  }
  libraryCard_no: any
  userIDforDetIssue:any
  usersDataForDeptIssue: any
  onLibrarcardChange(selecteuserID: any) {
    // console.log(selecteuserID);
    if (selecteuserID) {
      this.libraryCard_no = selecteuserID;
    }
    this.service.getAllUsers(selecteuserID).subscribe((res: any) => {
      // console.log(res);
      this.usersDataForDeptIssue = res
      this.userIDforDetIssue=res.user_id

    })
  }
  libraryCrdNo: any
  getLibraryCrad() {
    this.service.getLibraryCardNobasedOnclg(this.college_id).subscribe((res: any) => {
      // console.log(res);
      this.libraryCrdNo = res

    })
  }


  cancelForDeptIssu(items: any) {
    // console.log(items);
    const index = this.selectedOptions.findIndex(item => item.accession_no === items.accession_no);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    }
    // Remove the item from selectedBooks from  array
    this.selectedIssueTypes = this.selectedIssueTypes.filter(item => item.accession_no !== items.accession_no);
  }
  emp_name:any=''
  emp_id:any=''
  DeptIssue() {
    console.log(this.selectedOptions);
    
    // const formData = new FormData();
    // formData.append('selectedData', JSON.stringify(this.selectedOptions));
    // formData.append('user_id', this.userIDforDetIssue)
    // formData.append('dept_id', this.dept_id)
    // formData.append('college_id', this.college_id)
    // formData.append('entry_by', this.entryBY)
    // formData.append('user_type', this.currentUserTypeIssue);
    // formData.append('document', this.approvedDoc);
    // // if(this.emp_name){
    //   formData.append('emp_name', this.emp_name);
    // // }
    // // if(this.emp_id){
    //   formData.append('emp_id', this.emp_id);
    // // }

    // this.service.DeptBookIssue(formData).subscribe((res: any) => {
    //     // console.log(res);
    //     alert(res)
    //     location.reload()
    //   }, (err: any) => {
    //     alert('Something went wrong !')
    //   })
  }













  //Test

  getMaxBook(){
    // this.service.maxNo(this.user)
  }


  backTotable(){
  this.IssuePage=false
   }
}
