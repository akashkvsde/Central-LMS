import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import { debounceTime } from 'rxjs/operators';
import { updateBookIndividual } from 'src/app/Models/all-model';

@Component({
  selector: 'app-edit-book-idividual',
  templateUrl: './edit-book-idividual.component.html',
  styleUrls: ['./edit-book-idividual.component.css']
})
export class EditBookIdividualComponent implements OnInit {
  Search_Books:any;
  college_id: any;
  entry_by: any;
  isSuperAdmin: any;
  imgPath: any;
  p: number = 1;
  Books: any[] = [];
 
  constructor(private service: AllDataService) { }

  ngOnInit(): void {
    this.college_id = sessionStorage.getItem('college_id');
    this.entry_by = sessionStorage.getItem('user_id');
    this.isSuperAdmin = this.service.isSuperAdmin();
    this.getBooks();
    this.getBookTitles();
    this.getAuthors();
    this.getCurrency();
    this.getPublishers();
    this.getDocTypes()
    this.getSubjects()
    this.getLocations()


    let imgUrl = sessionStorage.getItem('url');
    if (imgUrl) {
      const urlSegments = imgUrl.split('/');
      urlSegments.pop();
      const baseUrl = urlSegments.join('/');
      this.imgPath = `${baseUrl}/BookImage/`;
      // console.log(baseUrl);
    } else {
      console.error('imgUrl is null');
    }
  }











  // Get All Books
  getBooks() {
    this.service.getAllBooks(this.college_id).subscribe((res: any) => {
      this.Books = res;
    });
  }

// Model
updatemodel=new updateBookIndividual();
 // For Book Titles
 bookTitles: any[] = [];
 filteredTitles: any[] = [];
 showTitleSuggestions: boolean = false;
 inputValue: string = '';
 selectedBookId: number | null = null;

 // For Authors
 authors: any[] = [];
 filteredAuthors: any[] = [];
 showAuthorSuggestions: boolean[] = [false, false, false]; // For each author field
 firstAuthor: string = '';
 secondAuthor: string = '';
 thirdAuthor: string = '';

 // For Publisher
 publishers: any[] = [];
 filteredPublishers: any[] = [];
 showPublisherSuggestions: boolean = false;
 publisher: string = '';


 // For Vendor
 vendors: any[] = [];
 filteredVendors: any[] = [];
 showVendorSuggestions: boolean = false;
 vendor: string = '';

 // For Bill Details
 selectedVendor: any = null;
 billDetails: any = '';
 filteredBillDetails: any[] = [];
 showBillDetailsSuggestions: boolean = false;

  // For Doc Type
  docTypes: any[] = [];
  filteredDocTypes: any[] = [];
  showDocTypeSuggestions: boolean = false;
  docType: string = '';

 // For Subjects
 subjects: string = '';
 filteredSubjects: any[] = [];
 showSubjectsSuggestions: boolean = false;

 // For Locations
 locations: string = '';
 filteredLocations: any[] = [];
 showLocationsSuggestions: boolean = false;

 // For Currency
 currency: string = '';
 filteredCurrency: any[] = [];
 showCurrencySuggestions: boolean = false;



 getBookTitles() {
   this.service.getTitle(this.college_id).subscribe((res: any) => {
     this.bookTitles = res;
   });
 }

 filterTitles(event: any) {
   const input = event.target.value.trim();
   if (input === '') {
     this.showTitleSuggestions = false;
     return;
   }
   this.service.getTitle(this.college_id)
     .pipe(debounceTime(200)) // Debounce input to improve speed
     .subscribe((res: any) => {
       this.filteredTitles = res.filter((title: any) => title.book_title_name.toLowerCase().includes(input.toLowerCase()));
       this.showTitleSuggestions = true;
     });
 }

 selectTitle(title: any) {
   this.inputValue = title.book_title_name;
  //  this.selectedBookId = title.book_title_id;
   this.updatemodel.book_title_id = title.book_title_id;
   
   this.showTitleSuggestions = false;
 }


 selectedfirstAuthorID:any;
 selectedsecondAuthorID:any;
 selectedthirdAuthorID:any;
 getAuthors() {
   this.service.getAuthor(this.college_id).subscribe((res: any) => {
     this.authors = res;
   });
 }

 filterAuthors(event: any, index: number) {
   const input = event.target.value.trim();
   if (input === '') {
     this.showAuthorSuggestions[index] = false;
     return;
   }
   this.service.getAuthor(this.college_id)
     .pipe(debounceTime(200)) // Debounce input to improve speed
     .subscribe((res: any) => {
       this.filteredAuthors[index] = res.filter((author: any) => author.author_name.toLowerCase().includes(input.toLowerCase()));
       this.showAuthorSuggestions[index] = true;
     });
 }

 selectAuthor(author: any, index: number) {
   switch (index) {
     case 0:
       this.firstAuthor = author.author_name;
      //  this. selectedfirstAuthorID = author.author_id;
      this.updatemodel.first_author_id=author.author_id;
       break;
     case 1:
       this.secondAuthor = author.author_name;
      //  this. selectedsecondAuthorID = author.author_id;
       this. updatemodel.second_author_id = author.author_id;
       break;
     case 2:
       this.thirdAuthor = author.author_name;
      //  this. selectedthirdAuthorID = author.author_id;
       this. updatemodel.third_author_id = author.author_id;
       break;
     default:
       break;
   }
  //  console.log(author);
   
   this.showAuthorSuggestions[index] = false;
 }

 selectedpublisherID:any
 getPublishers() {
   this.service.getPublisher(this.college_id).subscribe((res: any) => {
     this.publishers = res;
   });
 }

 filterPublishers(event: any) {
   const input = event.target.value.trim();
   if (input === '') {
     this.showPublisherSuggestions = false;
     return;
   }
   this.service.getPublisher(this.college_id)
     .pipe(debounceTime(200)) // Debounce input to improve speed
     .subscribe((res: any) => {
       this.filteredPublishers = res.filter((publisher: any) => publisher.publisher_name.toLowerCase().includes(input.toLowerCase()));
       this.showPublisherSuggestions = true;
     });
 }

 selectPublisher(publisher: any) {
   this.publisher = publisher.publisher_name;   
  //  this.selectedpublisherID = publisher.publisher_id;
   this.updatemodel.publisher_id = publisher.publisher_id;
   this.showPublisherSuggestions = false;
 }

 selectedVendorID:any
 getVendors() {
  this.service.getVendors(this.college_id).subscribe((res: any) => {
    this.vendors = res;
  });
}

filterVendors(event: any) {
  const input = event.target.value.trim();
  if (input === '') {
    this.showVendorSuggestions = false;
    return;
  }
  this.service.getVendors(this.college_id)
    .pipe(debounceTime(200))
    .subscribe((res: any) => {
      this.filteredVendors = res.filter((vendor: any) => vendor.vendor_name.toLowerCase().includes(input.toLowerCase()));
      this.showVendorSuggestions = true;
    });
}
selectVendor(vendor: any) {
  this.selectedVendor = vendor.vendor_name;
  // this.selectedVendorID = vendor.vendor_id;
  this.updatemodel.vendor_id=vendor.vendor_id;
  console.log(this.selectedVendor);
  
  
  this.getBillDetailsByVendor(vendor.vendor_id); 
  this.showVendorSuggestions = false;
}


getCurrency() {
  this.service.getCurrency(this.college_id).subscribe(
    (res: any) => {
      this.filteredCurrency = res;
      // console.log(res);
      
    },
    (error: any) => {
      console.error('Error fetching currencies:', error);
      // Handle error, e.g., show a message to the user
    }
  );
}

filterCurrency(event: any) {
  const input = event.target.value.trim();
  if (input === '') {
    this.showCurrencySuggestions = false;
    return;
  }
  this.service.getCurrency(this.college_id)
    .pipe(debounceTime(200))
    .subscribe(
      (res: any) => {
        this.filteredCurrency = res.filter((currency: any) => currency.curr_type.toLowerCase().includes(input.toLowerCase()));
        this.showCurrencySuggestions = true;
      },
      (error: any) => {
        console.error('Error fetching currencies:', error);
        // Handle error
      }
    );
}

selectCurrency(currencyType: any) {
  // console.log(currencyType);
  
  this.currency = currencyType.curr_type;
  this.updatemodel.currency_id=currencyType.curr_id;
  this.showCurrencySuggestions = false;
}






selectedBillID:any;
getBillDetailsByVendor(vendorId: number) {
  // console.log(vendorId);
  
  this.service.getBillDetailsByVendorAndClg(vendorId,this.college_id).subscribe((res: any) => {
    this.billDetails = res;
    // console.log(res);
    
  });
}

filterBillDetails(event: any) {
  const input = event.target.value.trim();
  if (input === '') {
    this.showBillDetailsSuggestions = false;
    return;
  }
  this.filteredBillDetails = this.billDetails.filter((billDetail: any) =>
    billDetail.bill_number.toLowerCase().includes(input.toLowerCase())
  );
  this.showBillDetailsSuggestions = true;
}

selectBillDetail(event: any) {
  const selectedBillId = event.target.value;
  const selectedBillDetail = this.billDetails.find((billDetail: any) => billDetail.bill_id === selectedBillId);
  if (selectedBillDetail) {
    this.selectedBillID = selectedBillDetail.bill_id;
    console.log(this.selectedBillID);
    
  }
  this.showBillDetailsSuggestions = false;
}


selecteddocTypeID:any
getDocTypes() {
  this.service.getDocType(this.college_id).subscribe((res: any) => {
    this.docTypes = res;
  });
}

filterDocTypes(event: any) {
  const input = event.target.value.trim();
  if (input === '') {
    this.showDocTypeSuggestions = false;
    return;
  }
  this.service.getDocType(this.college_id)
    .pipe(debounceTime(200))
    .subscribe((res: any) => {
      this.filteredDocTypes = res.filter((docType: any) => docType.document_type.toLowerCase().includes(input.toLowerCase()));
      this.showDocTypeSuggestions = true;
    });
}

selectDocType(docType: any) {
  this.docType = docType.document_type;
  this.selecteddocTypeID = docType.document_id;
  this.showDocTypeSuggestions = false;
}


selectedsubjectID:any;
getSubjects() {
  this.service.getSubject(this.college_id).subscribe((res: any) => {
    this.filteredSubjects = res;
  });
}

filterSubjects(event: any) {
  const input = event.target.value.trim();
  if (input === '') {
    this.showSubjectsSuggestions = false;
    return;
  }
  this.service.getSubject(this.college_id)
    .pipe(debounceTime(200))
    .subscribe((res: any) => {
      this.filteredSubjects = res.filter((subject: any) => subject.subject_name.toLowerCase().includes(input.toLowerCase()));
      this.showSubjectsSuggestions = true;
    });
}

selectSubject(subject: any) {
  this.subjects = subject.subject_name;
  this.updatemodel.subject_id = subject.subject_id;
  this.showSubjectsSuggestions = false;
}

getLocations() {
  this.service.getLocation(this.college_id).subscribe((res: any) => {
    this.filteredLocations = res;
    // console.log(res);
    
  });
}

filterLocations(event: any) {
  const input = event.target.value.trim();
  if (input === '') {
    this.showLocationsSuggestions = false;
    return;
  }
  this.service.getLocation(this.college_id)
    .pipe(debounceTime(200))
    .subscribe((res: any) => {
      this.filteredLocations = res.filter((location: any) => location.almirah_no.toLowerCase().includes(input.toLowerCase()));
      this.showLocationsSuggestions = true;
    });
}
selectedlocationsID:any

selectLocation(location: any) {
  this.locations = location.almirah_no;
  this.updatemodel.location_id = location.location_id;
  this.showLocationsSuggestions = false;
}

singleBook: any = {};

// Single Book Data Get
EditBook(data:any){
  this.updatemodel=data;
    this.singleBook=data;
    // this.updatemodel.book_id=data.book_id;
    // this.updatemodel.accession_no=data.accession_no;
    // this.updatemodel=data;      
    // console.log(this.singleBook);
    

}

getFile(ev: any) {
  if (ev) {
    this.updatemodel.book_image = ev.target.files[0];
    // console.log(this.updatemodel.book_image);
    
  }
}


onSubmit(){
console.log(this.updatemodel);

this.updatemodel.entry_by = this.entry_by
const formData = new FormData();
formData.append('book_id', this.updatemodel.book_id);
formData.append('accession_no', this.updatemodel.accession_no);
formData.append('book_title_id', this.updatemodel.book_title_id);
formData.append('first_author_id', this.updatemodel.first_author_id);
formData.append('second_author_id', this.updatemodel.second_author_id);
formData.append('third_author_id', this.updatemodel.third_author_id);
formData.append('publisher_id', this.updatemodel.publisher_id);
formData.append('volume', this.updatemodel.volume);
formData.append('subject_id', this.updatemodel.subject_id);
formData.append('editor', this.updatemodel.editor);
formData.append('translator', this.updatemodel.translator);
formData.append('edition', this.updatemodel.edition);
formData.append('edition_year', this.updatemodel.edition_year);
formData.append('publish_year', this.updatemodel.publish_year);
formData.append('no_of_pages', this.updatemodel.no_of_pages);
formData.append('isbn_no', this.updatemodel.isbn_no);
formData.append('language', this.updatemodel.language);
formData.append('series', this.updatemodel.series);
formData.append('source', this.updatemodel.source);
formData.append('content', this.updatemodel.content);
formData.append('currency_id', this.updatemodel.currency_id);
formData.append('document_id', this.updatemodel.document_id);
formData.append('vendor_id', this.updatemodel.vendor_id);
formData.append('bill_id', this.updatemodel.bill_id);
formData.append('suppl_copies', this.updatemodel.suppl_copies);
formData.append('abstract', this.updatemodel.abstract);
formData.append('nature_of_binding', this.updatemodel.nature_of_binding);
formData.append('entry_date', this.updatemodel.entry_date);
formData.append('notes', this.updatemodel.notes);
formData.append('keywords', this.updatemodel.keywords);
formData.append('call_no', this.updatemodel.call_no);
formData.append('book_price', this.updatemodel.book_price);
formData.append('book_image', this.updatemodel.book_image);
formData.append('college_id', this.college_id);
formData.append('location_id', this.updatemodel.location_id);
formData.append('book_status', this.updatemodel.book_status);
formData.append('entry_by', this.entry_by);


this.service.updateBookIndvidual(formData).subscribe((data:any)=>{
// console.log(data)
alert(data)
location.reload();
this.getBooks()
},(err:any)=>{
  // console.log(err);
alert("Something went wrong try after some time!")
this.getBooks()
})
}








 // ---------------Pagination------------------
 pageSize:number = 8;
 currentPage = 1;

 get paginatedBooks() {
   const startIndex = (this.currentPage - 1) * this.pageSize;
   return this.Books.slice(startIndex, startIndex + this.pageSize);
 }

 onPageChange(pageNumber: number) {
  const totalPages = Math.ceil(this.Books.length / this.pageSize);
  
  // Ensure the new page is within the valid range
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    this.currentPage = pageNumber;
  }
}

 
//  pageArray:any[]=[1,2,3,4,5,6,7,8,9]
getPages() {
  const totalPages = Math.ceil(this.Books.length / this.pageSize);
  const currentPageIndex = this.currentPage - 1;
  const middlePageIndex = Math.floor(9 / 2);

  let startPage = Math.max(1, currentPageIndex - middlePageIndex);
  let endPage = Math.min(startPage + 8, totalPages);

  if (endPage - startPage < 8) {
    startPage = Math.max(1, endPage - 8);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}



}