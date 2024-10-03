import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Authors, Billdetails, BooksRegistration, Booktitles, Currency, Department, DocType, Location, Publishers, Subject, Vendors } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit{
constructor(private service:AllDataService,private cdr: ChangeDetectorRef){
  this.quantity = 1;
  this.isbnNumbers = new Array(this.quantity).fill('');
}
entry_by:any
collegeID:any
ngOnInit(): void {
  this.collegeID=sessionStorage.getItem('college_id')
  this.entry_by=sessionStorage.getItem('user_id')

  this.getAllBooks();
  this.getLastAccessionNo();
  this.getBookTitle();
  this.getAuthors();
  this.getPublisher();
  this.getVendor();
  this.getDocumenttype();
  this.getColleg();
  // this.getdepartment();
  this.getSubjects();
  this.getCurrency();
  this.getLocations();
  this.getSingleCourses();
  // interval(5000).subscribe(() => {
  //   this.getAllBooks();
  // this.getLastAccessionNo();
  // this.getBookTitle();
  // this.getAuthors();
  // this.getPublisher();
  // this.getVendor();
  // this.getDocumenttype();
  // this.getColleg();
  // // this.getdepartment();
  // this.getSubjects();
  // this.getCurrency();
  // this.getLocations();
  // this.getSingleCourses();
  // });
}
  BookDetails: boolean = true;
 
 
  currentStep = 1;
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }


  previewImage: string = 'https://www.hi-techgroup.org/logos/Hi-Tech_Medical_College_&_Hospital.png';
  fileName2: any;
bookImage:any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.bookImage=file
    // console.log( this.BooksModel.book_image);
    
    if (file) {
      this.fileName2 = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewImage = 'https://www.hi-techgroup.org/logos/Hi-Tech_Medical_College_&_Hospital.png';
      this.fileName2 = null;
    }
  }

  fields: any[] = [{inputField:''  }];
  
  addField() {
    if (this.fields.length >= 3) {
      alert("You can't add more than three input fields.");
      return;
    }

    this.fields.push({ inputField: null });
  }

  removeField(index: number) {
    if (this.fields.length > 1) {
      this.fields.splice(index, 1);
    }
  }

//prerequisite
//All Book Titles
BookTitles:any;
getBookTitle(){
  this.service.getBookTitles(this.collegeID).subscribe((res:any)=>{
    this.BookTitles=res;
  })
}

//All Authors
Authors:any;
getAuthors(){
  this.service.getAuthors(this.collegeID).subscribe((res:any)=>{
    this.Authors=res;
  })
}
//All Authors
Publishers:any;
getPublisher(){
  this.service.getPublishers(this.collegeID).subscribe((res:any)=>{
    this.Publishers=res;
  })
}
//All Vendors

Vendors:any;
getVendor(){
  this.service.getVendors(this.collegeID).subscribe((res:any)=>{
    this.Vendors=res;
    // console.log(res);
    
  })
}
//All Document Type
documentType:any;
getDocumenttype(){
  this.service.getDocType(this.collegeID).subscribe((res:any)=>{
    this.documentType=res;
  })
}
selectedVendorID:any;
onVendorChange(ev:any){
  console.log(ev);
  this.selectedVendorID=ev
  this.getBillNo()
  
}
//All Bill Details
Billno:any;
getBillNo(){
  if(this.selectedVendorID){
    this.service.getBillDetailsByVendorAndClg(this.selectedVendorID,this.collegeID).subscribe((res:any)=>{
      console.log(res);
      
      this.Billno=res;
    })
  }
}
//All Colleges
College:any;
getColleg(){
  this.service.getCollege(this.collegeID).subscribe((res:any)=>{
    this.College=res;
  })
}
//All Department
subjects:any;

getSubjects(){
 if(this.collegeID){
  // console.log(this.collegeID);
  
  this.service.getSubject(this.collegeID).subscribe((res:any)=>{
    this.subjects=res;
    // console.log(res);
    
  })
 }
}
//All Currency
currency:any;
getCurrency(){
  this.service.getCurrency(this.collegeID).subscribe((res:any)=>{
    this.currency=res;
  })
}
//All Location
location:any;
getLocations(){
  this.service.getLocation(this.collegeID).subscribe((res:any)=>{
    // console.log(res);
    this.location = res.map((locationItem: any) => {
      locationItem.label = `Almirah: ${locationItem.almirah_no}, Shelf: ${locationItem.shelf_no}`;
      return locationItem;
    });
  })
}

//Add-Classification
onDepartmentModalChange(ev:any){
  
}






BooksModel=new BooksRegistration()

quantity: any = 0;
  isbnNumbers: any;
  
  addBooks(formvalid:any){
    if(this.isbnNumbers){
     // const selectedIsbnNumbers = this.isbnNumbers.filter(isbn => isbn.trim() !== '');
     this.BooksModel.isbn_no=this.isbnNumbers
    }
       // console.log( this.BooksModel.isbn_no);
     // console.log(this.BooksModel);
     
     const formData = new FormData();
       formData.append('accession_no', this.BooksModel.accession_no);
       formData.append('book_title_id', this.BooksModel.book_title_id);
       if( this.BooksModel.first_author_id){
         formData.append('first_author_id', this.BooksModel.first_author_id);
       }else{
         formData.append('first_author_id', '');
       }
       formData.append('second_author_id', this.fields[1] ? this.fields[1].inputField : '');
       formData.append('third_author_id', this.fields[2] ? this.fields[2].inputField : '');
       formData.append('publisher_id', this.BooksModel.publisher_id);
       formData.append('volume', this.BooksModel.volume);
       formData.append('editor', this.BooksModel.editor);
       formData.append('edition', this.BooksModel.edition);
       formData.append('edition_year', this.BooksModel.edition_year);
       formData.append('translator', this.BooksModel.translator);
       formData.append('compiler', this.BooksModel.compiler);
       formData.append('publish_year', this.BooksModel.publish_year);
       formData.append('no_of_pages', this.BooksModel.no_of_pages);
       formData.append('isbn_no', this.BooksModel.isbn_no);
       formData.append('language', this.BooksModel.language);
       formData.append('series', this.BooksModel.series);
       formData.append('source', this.BooksModel.source);
       formData.append('content', this.BooksModel.content);
       formData.append('currency_id', this.BooksModel.currency_id);
       formData.append('document_id', this.BooksModel.document_id);
       formData.append('subject_id', this.BooksModel.subject_id);
       
      if(this.selectedVendorID){
       formData.append('vendor_id', this.selectedVendorID);
      }
       formData.append('bill_id', this.BooksModel.bill_id);
       formData.append('suppl_copies', this.BooksModel.suppl_copies);
       formData.append('abstract', this.BooksModel.abstract);
       formData.append('nature_of_binding', this.BooksModel.nature_of_binding);
       // formData.append('entry_date', this.BooksModel.entry_date);
       formData.append('notes', this.BooksModel.notes);
       formData.append('keywords', this.BooksModel.keywords);
       formData.append('call_no', this.BooksModel.call_no);
       formData.append('book_price', this.BooksModel.book_price);
       // formData.append('college_id', this.BooksModel.college_id);
       formData.append('location_id', this.BooksModel.location_id);
       formData.append('accession_no_from', this.lastAcc);
       formData.append('accession_no_to', this.result);
       formData.append('college_id', this.collegeID);
       formData.append('book_image',  this.bookImage);
       formData.append('num_copies',  this.quantity);
       formData.append('entry_by', this.entry_by);
       // formData.append('bill_doc', this.BooksModel.bill_doc);
   
       this.service.addAllBooks(formData).subscribe((res:any)=>{
         console.log(res.message);
         alert(res.message)
         this.getLastAccessionNo();
         this.result = 0;
         this.quantity=1;
       },(err:any)=>{
         console.log(err);
         
         alert('Something Went wrong');
       })
   }
   

range(quantity: number) {
  return Array.from(Array(quantity).keys());
}

ResetBtn(formvalid:any){
formvalid.reset();
// alert()
this.fileName2 = '';
this.getLastAccessionNo()
}

AllBooks:any;
getAllBooks(){
  this.service.getAllBooks(this.collegeID).subscribe((res:any)=>{
    this.AllBooks=res;

 
  })
}

LastAccessioNo:any;
lastAcc:any;
getLastAccessionNo() {
  this.service.getLastAccessionNo(this.collegeID).subscribe((res: any) => {
    this.lastAcc=res;
    // Use a regular expression to extract only numbers from the response
    const numbers = res.match(/\d+/);

    if (numbers) {
      // If numbers were found, convert them to a number
      this.LastAccessioNo = parseInt(numbers[0]);
      this.result=this.LastAccessioNo + 1;
      // console.log(this.LastAccessioNo);
    } else {
      // Handle the case where no numbers were found
      console.log('No numbers found in the response');
    }
  });
}

result:any=0;
// quantity:any;
takeQuantity() {
  if (this.quantity < 0) {
    this.quantity = 0; // Set quantity to 0 if it's negative
  }
  const parsedLastAccessionNo = parseInt(this.LastAccessioNo.toString());
  const parsedQuantity = parseInt(this.quantity.toString());

  if (!isNaN(parsedLastAccessionNo) && !isNaN(parsedQuantity)) {
    this.result = parsedLastAccessionNo + parsedQuantity;
  } else {
    this.result = 0;
  }
  this.cdr.detectChanges();
}





// ---------------------------Configuration-----------------------
// Add ------Book TItle

BooktitlesModel=new Booktitles();
addBookTitle(validForm: any) {
  this.BooktitlesModel.college_id=this.collegeID
  this.BooktitlesModel.entry_by=this.entry_by
  if (validForm.valid) {
    this.service.addBookTitles(this.BooktitlesModel).subscribe((res:any)=>{
      // console.log(res);
      alert(res);
      validForm.reset();
      this.getBookTitle();
    },
    (error:any) => {
      alert('Something Went Wrong');
      
    })
  }else {
    if (validForm.controls.book_title_name.invalid) {
      alert('Please enter the Book Title Name.');
    }
   
  }
  
}


//Add-------Authers

AuthorModel=new Authors();
  

addAuthors(validForm: any) {
  this.AuthorModel.college_id = this.collegeID;
  this.AuthorModel.entry_by = this.entry_by;
  if (validForm.valid) {
    this.service.addAuthors(this.AuthorModel).subscribe((res: any) => {
      alert(res);
      validForm.reset();
      this.getAuthors();
    }, (err: any) => {
      alert(err);
    });
  } else {
    if (validForm.controls.author_name.invalid) {
      alert('Please enter the Author name.');
    }
  }
}


//Add---Publisher

PublishersModel=new Publishers();
  
addPublisher(validForm: any) {
  this.PublishersModel.college_id=this.collegeID
  this.PublishersModel.entry_by=this.entry_by
    if (validForm.valid) {
      this.service.addPublishers(this.PublishersModel).subscribe((res:any)=>{
        // console.log(res);
        alert(res);
        this.getPublisher();
        validForm.reset();
      })
    }else {
      if (validForm.controls.publisher_name.invalid) {
        alert('Please enter the Publisher name.');
      }
      if (validForm.controls.publisher_place.invalid) {
        alert('Please enter the Publisher Place.');
      }
     
     
    }
    
  }




//Add-------Vendors
VendorsModel=new Vendors();

  addVendor(validForm: any) {
    // console.log(this.VendorsModel);
    this.VendorsModel.college_id=this.collegeID
    this.VendorsModel.entry_by=this.entry_by
    if (validForm.valid) {
        this.service.addVendors(this.VendorsModel).subscribe(
            (res: any) => {
               console.log(res);
                   alert(res);
                   this.getVendor();
                    // this.getAllVendors();
            },
            (error:any) => {
               alert('Something went wrong');
               
            }
        );
        validForm.reset();
    }else {
      if (validForm.controls.vendor_name.invalid) {
        alert('Please enter the Vendor name.');
      }
      if (validForm.controls.vendor_email.invalid) {
        alert('Please enter the Vendor Email.');
      }
      if (validForm.controls.vendor_contact.invalid) {
        alert('Please enter the Vendor Contact.');
      }
      if (validForm.controls.vendor_address.invalid) {
        alert('Please enter the Vendor Address.');
      }
    }
}  


// Add-------- Bill Details
inputType = 'text';

fileNameforbill:any;
BillDocs:any;
onFileSelectedforBill(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    // You can perform any additional processing on the selected file here.
    console.log('Selected file:', file);
    this.fileNameforbill=file.name;
    this.BilldetailsModel.bill_doc=file;
    // console.log(this.BillDocs);
    
  }
}



BilldetailsModel=new Billdetails()

addBilldetails(formvalid: any) {
if (formvalid.valid) {
  const formData = new FormData();
  formData.append('bill_num', this.BilldetailsModel.bill_num);
  formData.append('vendor_id', this.BilldetailsModel.vendor_id);
  formData.append('bill_date', this.BilldetailsModel.bill_date);
  formData.append('entry_by', this.entry_by);
  formData.append('bill_doc', this.BilldetailsModel.bill_doc);
  formData.append('college_id', this.collegeID);

  this.service.addBillDetails(formData).subscribe(
    (res: any) => {
      // console.log(res);
      
      alert(res);
      // this.getBills();
      this.getBillNo();
      
      formvalid.reset();
      
    },
    (error: any) => {
      alert('Something went wrong !')
    }
  );
}else {
  if (formvalid.controls.bill_num.invalid) {
    alert('Please enter the Bill Number.');
  }
  if (formvalid.controls.bill_date.invalid) {
    alert('Please enter the Bill Date.');
  }
  if (formvalid.controls.bill_doc.invalid) {
    alert('Please upload Bill Receipt.');
  }
  if (formvalid.controls.vendor_id.invalid) {
    alert('Please Select Vendor Name.');
  }
}
}


//Add--------Departments



// allCollege: any[] = [];
// getAllCollege() {
//   this.service.getCollege(this.collegeID).subscribe((res: any) => {
//     this.allCollege = res
//   })
// }


// onCollegeChange(selectedCollegeId: any) {
//   this.filteredCourses = []; 
//   if (selectedCollegeId) {
//     this.college_idd = selectedCollegeId;
//     // console.log(this.collegeID);
    
//     this.getSingleCourses();
//   }
// }

filteredCourses:any = [];
getSingleCourses() {
  this.service.getSingleCourseBasedOncollege(this.collegeID).subscribe((res: any) => {
    this.filteredCourses = res;
    // console.log(res);
  });
}
DeptModel = new Department();
//Add Department
AddDepartment(validForm: any) {
  this.DeptModel.entry_by = this.entry_by;
  this.DeptModel.college_id = this.collegeID;

  // // Debugging: Log values
  // console.log('DeptModel:', this.DeptModel);
  // console.log('validForm:', validForm.value);

  if (validForm.valid) {
    this.service.adddept(this.DeptModel).subscribe((res: any) => {
      alert(res);
      console.log(res);
      // this.getdepartment();
    }, (err: any) => {
      alert('Something went wrong');
    });
    validForm.reset();
  } else {
    
    if (validForm.controls.course_id.invalid) {
      alert('Please fill the course name.');
    }
    if (validForm.controls.Department_name.invalid) {
      alert('Please fill the department name.');
    }
  }
}




//aDD------------dOCTYPE


DocTypeModel=new DocType();

addDocType(validForm: any) {
  this.DocTypeModel.college_id=this.collegeID;
  this.DocTypeModel.entry_by=this.entry_by;
  if (validForm.valid) {
    this.service.adddocumentType(this.DocTypeModel).subscribe((res:any)=>{
      alert(res);
      console.log(res);
      validForm.reset();
      this.getDocumenttype();
    },(err:any)=>{
      alert(err)
    })
  }else {
    if (validForm.controls.document_type.invalid) {
      alert('Please enter Document Type.');
    }
   
  }
  
}


//add----------book location

LocationModel=new Location();

  addLocation(validForm: any) {
    // alert(this.collegeID)
    this.LocationModel.college_id=this.collegeID
    this.LocationModel.entry_by=this.entry_by
    console.log(this.LocationModel);
    
    if (validForm.valid) {
      this.service.addLocation(this.LocationModel).subscribe((res:any)=>{
        console.log(res);
        alert(res);
        this.getLocations();
        validForm.reset();
      },(err:any)=>{
        alert('Something went wrong');
      })
    }else {
      if (validForm.controls.almirah_no.invalid) {
        alert('Please enter the Almirah no.');
      }
      if (validForm.controls.shelf_no.invalid) {
        alert('Please enter the Shelf no.');
      }
      if (validForm.controls.rack_no.invalid) {
        alert('Please enter the Rack no.');
      }
     
    }
    
  }


//Add-----------Currency
CurrencyModel = new Currency()

AddCurrency(validForm: any) {
  // console.log(this.CurrencyModel);
  this.CurrencyModel.entry_by=this.entry_by
  this.CurrencyModel.college_id=this.collegeID
  if (validForm.valid) {
    this.service.addCurrency(this.CurrencyModel).subscribe((res: any) => {
      alert(res);
      this.getCurrency();
      validForm.reset();
    },
    (err:any)=>{
      alert('Something went Wrong')
    })
  } else {
    if (validForm.controls.curr_type.invalid) {
      alert('Please enter currency type.');
    }
  }

}


SubjectMOdel = new Subject()

AddSubject(validForm: any) {
  // console.log(this.CurrencyModel);
  this.SubjectMOdel.entry_by=this.entry_by
  this.SubjectMOdel.college_id=this.collegeID
  if (validForm.valid) {
    this.service.addSubject(this.SubjectMOdel).subscribe((res: any) => {
      alert(res);
      this.getSubjects();
      validForm.reset();
    },
    
    (err:any)=>{
      alert('Something went Wrong')
    })
  } else {
    if (validForm.controls.subject_name.invalid) {
      alert('Please enter subject name.');
    }
  }

}


}
