import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-list-report',
  templateUrl: './book-list-report.component.html',
  styleUrls: ['./book-list-report.component.css']
})
export class BookListReportComponent implements OnInit{
  constructor(private service:AllDataService){}

ngOnInit(){
  this.college_id=sessionStorage.getItem('college_id')
this.getBookList();
}

downloadedImageUrl: string = 'assets/img/logo.jpeg';
BookDetails: boolean = true;
books:any;
college_id:any;//session area

bookListDetails:any;
accessionnoFrom:any
accessionnoTo:any
getBookList(){
  this.service.bookListReport(this.college_id).subscribe((res:any)=>{
    // console.log(res[0].college_name);
    this.books = res
    this.Search();

  })

}

Search(){
  if(this.accessionnoFrom && this.accessionnoTo || this.college_id){
    this.service.bookListReportByAccNo(this.college_id,this.accessionnoFrom,this.accessionnoTo).subscribe((res:any)=>{
      // console.log(res);
      if(res.status===1){
        // console.log(res[0]);
        this.books=res[0]
        
        this.BookDetails=false
      }else{
        // alert(res.msg)
        this.BookDetails=true
        this.accessionnoFrom=''
        this.accessionnoTo=''
      }
    },(err:any)=>{
      console.log(err);
    });
  }
}

//  for excel
exportToExcel(): void {

const selectedData = this.books.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Author': item.author_name, 'Edition':item.edition,'Publisher':item.publisher_name,'No. of Copies':item.no_of_copies,'Accession No.':item.accession_no,'Subject':item.subject_name,'College Name':item.college_name}));
const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
const wb: XLSX.WorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
XLSX.writeFile(wb, `book-list-report.xlsx`);
}

@ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

printDiv() {
  // const printContents = this.printableDiv.nativeElement.innerHTML;
  // const originalContents = document.body.innerHTML;
  // document.body.innerHTML = printContents;
  window.print();
  // document.body.innerHTML = originalContents;
  // location.reload()
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

