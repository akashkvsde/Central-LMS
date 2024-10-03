import { Component, OnInit } from '@angular/core';
import { ReturnIssuedBook } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.css']
})
export class ReturnBooksComponent implements OnInit {
  constructor(private service: AllDataService) { }

  //Section User AND DEPT
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
    this.hideIssueDepartment = true
    // this.hideIssueDepartment = !this.hideIssueDepartment;
    this.hideIssueEmployee = false;
    this.hideIssueStudent = false;
    this.STD_EMP = false
    this.currentUserTypeIssue = 'DEPT';

    // console.log(this.currentUserTypeIssue);
  }









  college_id: any
  entry_by: any
  ngOnInit(): void {
    this.college_id = sessionStorage.getItem('college_id')
    this.entry_by = sessionStorage.getItem('user_id')
    this.getLibraryCardNo();
    this.getBookAccessionNo()
    this.getDepartmentsCollegeWise();
    this.getAccessionNoCollegeWisewithDeptIssue()
  }

  LibraryCradList: any
  getLibraryCardNo() {
    this.service.getLibraryCardNobasedOnclg(this.college_id).subscribe((res: any) => {
      // console.log(res);
      this.LibraryCradList = res.filter((forsuperadmin: any) => forsuperadmin.library_card_number !== 'SUPERADMINHERE');

    })
  }
  allBooks: any[] = []
  getBookAccessionNo() {
    this.service.getAllBooks(this.college_id).subscribe((res: any) => {
      // console.log(res);
      // this.allBooks = res.map((item: any) => ({
      //   book_title_name: item.book_title_name,
      //   accession_no: item.accession_no
      // }));

      this.allBooks = res.map((item: any) => {
        item.label = `Title: ${item.book_title_name}, AccNO: ${item.accession_no}`;
        return item;
      });
      console.log(this.allBooks);
    });
  }


  ReturnBookModel = new ReturnIssuedBook()
  SelectedLibraryCardNO: any;
  issuedBooksData: any[] = [];
  issuedBooksData2: any[] = [];
  noIssuedBooks: boolean = false;
  noIssuedBooks2: boolean = false;
  noIssuedBooks3: boolean = false;
  noIssuedBooks4: boolean = false;
  onLibraryCardChange(ev: any) {
    // console.log(ev);
    this.SelectedLibraryCardNO = ev;
    if (this.SelectedLibraryCardNO) {
      this.getIssuedBooks();
      this.getUserdata();
    }
  }

  selectedaccessionNo: any
  onBookAccessionChange(ev: any) {
    this.selectedaccessionNo = ev;
    if (this.selectedaccessionNo) {
      this.getIssuedBooksByAcc();
      // this.getUserdata();
    }
  }





    getIssuedBooks() {
    if (this.SelectedLibraryCardNO) {
      this.service.getissuedBooksbasedonLibraryCard(this.SelectedLibraryCardNO).subscribe((res: any) => {
        console.log(res);
        if (res.length === 0) {
          this.noIssuedBooks = true;
          this.issuedBooksData = [];
        } else {
          this.noIssuedBooks = false;
          this.issuedBooksData = res;
        }
      });
    }
  }

  getIssuedBooksByAcc() {
    if (this.selectedaccessionNo) {
      this.service.getissuedBooksbasedonaccesion_no(this.selectedaccessionNo).subscribe((res: any) => {
        console.log(res);
        if (res.length === 0) {
          this.noIssuedBooks2 = true;
          this.issuedBooksData2 = [];
        } else {
          this.noIssuedBooks2 = false;
          this.issuedBooksData2 = res;
        }
      });
    }
    //     this.service.getissuedBooksbasedonaccesion_no(this.selectedaccessionNo).subscribe((res:any)=>{
    // console.log(res);

    //     })
  }




  returnBooks(id:any,user_id: any, accession_no: any, college_id: any, exceedDays: any, fineamount: any) {
    // alert(user_id)
    // alert(accession_no)
    if (user_id && accession_no) {
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('accession_no', accession_no);
      formData.append('return_entry_by', this.entry_by);
      formData.append('college_id', college_id);
      formData.append('id', id);

      if (exceedDays && fineamount > 0) {
        // alert('First Collect Fine')
      } else {
        this.service.BookReturn(formData).subscribe((res: any) => {
          console.log(res);
          alert(res)
          this.getIssuedBooks()
          this.getIssuedBooksByAcc();

        }, (err: any) => {
          console.log(err);
          this.getIssuedBooks()
        })
      }


    }
  }

  fileName: any;
  document: any
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.document = file;

    }
  }
  book_title_name: any
  accession_no: any
  reason: any
  fine_amount: any
  paid_amount: any
  fine_policy_id: any
  getdataForFineCollection(a: any) {
    // console.log(a);
    this.book_title_name = a.book_title_name
    this.accession_no = a.accession_no

    this.service.getFineAmountForIndivialAccessionNo(this.SelectedLibraryCardNO, this.accession_no).subscribe((res: any) => {
      // console.log(res.fine_policy_id);
      // console.log(res);

      this.fine_amount = res.fine_amount
      this.fine_policy_id = res.fine_policy_id

    })
  }

  userID: any
  getUserdata() {
    if (this.SelectedLibraryCardNO) {
      this.service.getAllusersdata(this.SelectedLibraryCardNO).subscribe((res: any) => {
        // console.log(res[0].user_id);
        this.userID = res[0].user_id;
      })
    }
  }



  FineCollect() {
    if (this.paid_amount < 1) {
      alert('Paid Amount should be greater than or equal to 1.');
      return; // Stop execution if the condition is not met
    }
    if (this.paid_amount > this.fine_amount) {
      alert('Paid Amount cannot exceed Calculated Amount.');
    } else{
      const formData = new FormData();
      formData.append('accession_id', this.accession_no);
      formData.append('library_card_no', this.SelectedLibraryCardNO);
      formData.append('fine_amount', this.fine_amount);
      formData.append('paid_amount', this.paid_amount);
      formData.append('fine_policy_id', this.fine_policy_id);
      formData.append('reason', this.reason);
      formData.append('entry_by', this.entry_by);
      formData.append('user_id', this.userID);
      formData.append('college_id', this.college_id);
      if (this.document) {
        formData.append('document', this.document);
      }
      this.service.FineCollectionn(formData).subscribe((res: any) => {
        alert(res)
        console.log(res);
        this.getIssuedBooks()
  
      }, (err: any) => {
        console.log(err);
  
        alert("Something went wrong")
      })

    }

  }


  //Departmental Return==============================================>
  department_list: any
  getDepartmentsCollegeWise() {
    this.service.getdept(this.college_id).subscribe((res: any) => {
      // console.log(res);

      this.department_list = res;
    })
  }

  selectedDepartment: any;
  onDepartmentChange(ev: any) {
    // console.log(ev);
    this.selectedDepartment = ev
    this.getDepartmentalissuedBooks();

  }

  deptAccessionNo: any
  getAccessionNoCollegeWisewithDeptIssue() {
    this.service.getAccessionNoIssuedtoDEPT(this.college_id).subscribe((res: any) => {
      console.log(res);
      this.deptAccessionNo = res.map((items: any) => {
        items.label = `BookTitle: ${items.book_title_name}, Accno: ${items.accession_no}`;
        return items;
      });
      // this.deptAccessionNo=res;
    })
  }

  selectedAccessionNO: any;
  onAccesionChange(ev: any) {
    // console.log(ev);
    this.selectedAccessionNO = ev
    this.getdeptIssuedData();

  }
  deptIssued_data2: any
  getdeptIssuedData() {
    if (this.selectedAccessionNO) {
      this.service.getUserDataforReturntoDEPTbyAccessionNO(this.college_id, this.selectedAccessionNO).subscribe((res: any) => {
        // console.log(res);
        this.deptIssued_data2 = res;
        if (res.length === 0) {
          this.noIssuedBooks3 = true;
          this.deptIssued_data2 = [];
        } else {
          this.noIssuedBooks3 = false;
          this.deptIssued_data2 = res;
        }

      })
    }
  }



  deptIssued_data: any;
  deptIssuedTableData: boolean = false
  getDepartmentalissuedBooks() {
    if (this.selectedDepartment) {
      this.service.getUserDataforReturntoDEPTbydeptID(this.college_id, this.selectedDepartment).subscribe((res: any) => {
        // console.log(res);
        this.deptIssued_data = res;
        if (res.length === 0) {
          this.noIssuedBooks4 = true;
          this.deptIssued_data = [];
        } else {
          this.noIssuedBooks4 = false;
          this.deptIssued_data = res;
        }

      })
    }
  }
  fileDataArray: any[] = [];
  selectedFileforreturnfordept: File | null = null;
  DepartmentalReturnFile(ev: any, data: any) {
    const file: File = ev.target.files[0];
    this.selectedFileforreturnfordept = file;

  }


  // Department return
  DepartmentBookreturn(alldata: any) {
    if (this.selectedFileforreturnfordept) {
      const formData = new FormData();
      formData.append('emp_id', alldata.emp_id);
      formData.append('accession_no', alldata.accession_no);
      formData.append('return_entry_by', this.entry_by);
      formData.append('college_id', this.college_id);
      formData.append('id', alldata.id);
      formData.append('return_document', this.selectedFileforreturnfordept);

      this.service.BookReturn(formData).subscribe((res:any)=>{
        console.log(res);
        alert(res);
        this.getDepartmentalissuedBooks();
        this.getdeptIssuedData()
        this.getAccessionNoCollegeWisewithDeptIssue();

      },(err:any)=>{
        alert('Something Went Wrong')
        console.log(err);

      })
    } else {
      const formData = new FormData();
      formData.append('emp_id', alldata.emp_id);
      formData.append('accession_no', alldata.accession_no);
      formData.append('return_entry_by', this.entry_by);
      formData.append('college_id', this.college_id);
      formData.append('id', alldata.id);
      this.service.BookReturn(formData).subscribe((res:any)=>{
        alert(res);
        this.getDepartmentalissuedBooks();
        this.getdeptIssuedData()
        this.getAccessionNoCollegeWisewithDeptIssue();

      },(err:any)=>{
        alert("something went wrong")
        console.log('Something Went Wrong');

      })

    }
  }







}
