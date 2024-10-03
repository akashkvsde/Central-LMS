import { Component, ViewChild, ElementRef } from '@angular/core';
import { bookStatus } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-status-report',
  templateUrl: './book-status-report.component.html',
  styleUrls: ['./book-status-report.component.css']
})
export class BookStatusReportComponent {

  constructor(private service:AllDataService){}

  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.fetchBookDetails();

  }
  BookStatus:any[] = ["Issued", "Inlibrary", "Lost", "Damaged"];
  downloadedImageUrl: string = 'assets/img/logo.jpeg';

  BookDetails: any;
college_id:any;
college_data:any
fetchBookDetails(){
  this.service.BookStatus(this.college_id).subscribe((res:any)=>{
    console.log(res);
    this.BookDetails=res;
    this.college_data=res[0];
  })
}


  bookstatus = new bookStatus()
  bookStatusReport(){
    console.log(this.bookstatus.book_status);
    if(this.bookstatus.book_status){
      this.service.BookStatusReport(this.bookstatus.book_status,this.college_id).subscribe((res:any)=>{
       if(res.status===1){
        this.BookDetails=res[0]
       }else{
        alert('No Data Found')
       }

      },(err:any)=>{
        // alert('Something went wrong')
      })
    }else{
      this.fetchBookDetails();
    }

  }

  //  for excel
  exportToExcel(): void {

    const selectedData = this.BookDetails.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name,'Author ': item.author_name,'Editor': item.editor, 'Book Status': item.book_status, 'College Name': item.college_name  }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `book-status-report.xlsx`);
  }

  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    // const printContents = this.printableDiv.nativeElement.innerHTML;
    // const originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // location.reload()
    window.print()
  }
   // pagination

   p:any=1;
   page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];

   onTableDataChange(event: any) {
     this.page = event;

   }
   onTableSizeChange(event: any): void {
     this.tableSize = event.target.value;
     this.page = 1;
   }
   }
