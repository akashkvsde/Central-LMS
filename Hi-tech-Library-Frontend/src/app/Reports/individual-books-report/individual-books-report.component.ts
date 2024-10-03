import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-individual-books-report',
  templateUrl: './individual-books-report.component.html',
  styleUrls: ['./individual-books-report.component.css']
})
export class IndividualBooksReportComponent implements OnInit {

  college_id:any;

 constructor(private service:AllDataService){}

 ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
   this.getData();
   this.getAccessionNo()
 }

 downloadedImageUrl: string = 'assets/img/logo.jpeg';
 BookDetails: boolean = true;
 bookdata:any;
collegedata:any;
getData(){
 this.service.getBook(this.college_id).subscribe((res:any)=>{
   this.bookdata=res;
   this.collegedata=res[0]
   console.log(res);
 })
}


 individual(){
   // this.BookDetails = !this.BookDetails;

   if(this.college_id && this.accessioNo){
     this.service.getindividualBooksByAccessionNO(this.college_id,this.accessioNo).subscribe((res:any)=>{
       console.log(res);
       if(res.status===1)
         {
           this.bookdata=res[0];
           console.log(this.bookdata);
         }else{
           alert('data not found')
         }
     },(err:any)=>{
      //  alert(err);
     })
   }else{
     alert('something went wrong')
   }

 }


 getAccessionNo(){
   this.service.getallAccessionNo(this.college_id).subscribe((res:any)=>{
//  console.log(res);

   })
 }
 accessioNo:any
// getindividualBooks(){

// }

//  for excel
exportToExcel(): void {

 const selectedData = this.bookdata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Accession No.': item.accession_no, 'Author':item.author_name,'Publisher':item.publisher_name,'Subject':item.subject_name,'Entry Date':item.entry_date,'Book Price':item.book_price,'College Name': item.college_name}));
 const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 XLSX.writeFile(wb, `individual-book-report.xlsx`);
}

 @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

 printDiv() {
  //  const printContents = this.printableDiv.nativeElement.innerHTML;
  //  const originalContents = document.body.innerHTML;

  //  document.body.innerHTML = printContents;
   window.print();
  //  document.body.innerHTML = originalContents;
  //  location.reload()
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


