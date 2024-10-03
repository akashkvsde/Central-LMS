import { Component,ElementRef, OnInit, QueryList, ViewChildren  } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import { assignLibraryCard } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
@Component({
  selector: 'app-assignlibrarycard',
  templateUrl: './assignlibrarycard.component.html',
  styleUrls: ['./assignlibrarycard.component.css']
})
export class AssignlibrarycardComponent {

  entry_by:any ;
  college_id:any;
  isSuperAdmin:any
  p: number = 1;
  imgPath:any;
  Search_Users:any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  filteredUsers: any[] = [];
currentView: string | null = null;


batchyears: { batchYear: number }[] = [];
currentYear: number = new Date().getFullYear();
@ViewChildren('barcodeLib') barcodelibElements!: QueryList<ElementRef>;
selectedYear: number | null = null;
  constructor(private service:AllDataService) {
   }
  ngOnInit() {
    this.college_id=sessionStorage.getItem('college_id');
    this.entry_by=sessionStorage.getItem('user_id')
    this.generateYears();
    this.currentView = 'barCodePrint';
    this.currentView = 'assignLibraryCard';
    this.isSuperAdmin= this.service.isSuperAdmin()
   
    this.getUsersData();

    let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();
  
        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');
  
        this.imgPath = `${baseUrl}/studentphoto/`;
        // this.docPath = `${baseUrl}/studentDocument/`;
  
        // console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }
    
    }

    ngAfterViewInit(): void {
      // Initialize barcodes if needed
      this.generateLibBarcodes();
    }

  allUsers:any[]=[];
  getUsersData(): void {
    this.service.viewStdOnly(this.college_id).subscribe((res: any) => {
      this.allUsers = res;
      this.filterUsers(); // Apply filter and pagination
    });
  }

  filterUsers(): void {
    if (!this.Search_Users) {
      this.filteredUsers = this.allUsers;
    } else {
      const searchTerm = this.Search_Users.toLowerCase();
      this.filteredUsers = this.allUsers.filter(user =>
        (user.name ? user.name.toLowerCase().includes(searchTerm) : false) ||
        (user.email ? user.email.toLowerCase().includes(searchTerm) : false) ||
        (user.library_card_number ? user.library_card_number.toLowerCase().includes(searchTerm) : false)
      );
    }
    
    // Update pagination data
    this.totalItems = this.filteredUsers.length;
    this.setPage(1); // Reset to first page when filter changes
  }

  get paginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(total, this.currentPage + 2);

    if (this.currentPage <= 3) {
      end = Math.min(5, total);
    } else if (this.currentPage >= total - 2) {
      start = Math.max(total - 4, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }



  LibraryCardNo:any
  AssignModal=new assignLibraryCard();
  singleUserdata:any;
  getingleData(data:any){
       this.AssignModal=data;        
      //  console.log(this.AssignModal.user_id);
       
  }

  UpdateLibraryCard(libCard: HTMLInputElement) {
    // Check if the library card number is provided
    if (!libCard.value || libCard.value.trim() === '') {
        alert('Library card number cannot be empty!');
        return; // Exit if the library card number is not provided
    }

    // Log the library card number and user ID for debugging
    console.log('Library Card Number:', libCard.value);
    console.log('User ID:', this.AssignModal.user_id);

    // Prepare form data for the request
    const data = {
      library_card_number: libCard.value,
      entry_by: this.entry_by
  };

    // Make the service call to update the library card number
    this.service.updateLibraryCard(this.AssignModal.user_id, data).subscribe(
        (res: any) => {
            // console.log('Response:', res);
            alert(res.message); // Show success message
            this.getUsersData();
        },
        (err: any) => {
            console.error('Error:', err);
            alert('An error occurred while updating the library card number.'); // Show error message
        }
    );
}



  // collegeShortName:any;




handleClick(view: string) {
  this.currentView = view;
}


generateYears() {
  for (let year = 2005; year <= this.currentYear; year++) {
    this.batchyears.push({ batchYear: year });
    // console.log(this.batchyears);
    
  }
}
  printbarcode() {
    window.print();
  }



  getRange(FromRange: any, ToRange: any) {
    // Pad FromRange and ToRange to ensure they are 6 digits
    const paddedFrom = FromRange.padStart(6, '0');
    const paddedTo = ToRange.padStart(6, '0');

    // Convert paddedFrom and paddedTo to numbers
    const fromNumber = parseInt(paddedFrom, 10);
    const toNumber = parseInt(paddedTo, 10);

    // Generate the range of strings
    const rangeStrings = [];
    for (let i = fromNumber; i <= toNumber; i++) {
      const currentRange = i.toString().padStart(6, '0');
      const rangeString = `LIB${this.selectedYear}${this.college_id}${currentRange}`;
      rangeStrings.push(rangeString);
    }

    // Generate barcodes for the list of generated strings
    this.generateLibBarcodes(rangeStrings);
    
    // Log or use the list of generated strings
    console.log('Generated Strings:', rangeStrings);

    // Return the list of generated strings
    return rangeStrings;
  }

  generateLibBarcodes(barcodeStrings: string[] = []) {
    if (this.barcodelibElements) {
      this.barcodelibElements.forEach((element, index) => {
        if (index < barcodeStrings.length) {
          JsBarcode(element.nativeElement, barcodeStrings[index], {
            format: 'CODE128', // Or any other barcode format you prefer
            displayValue: true,
            fontSize: 40
          });
        }
      });
    }
  }


  


  
}







 




