import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-userwise-book-report',
  templateUrl: './userwise-book-report.component.html',
  styleUrls: ['./userwise-book-report.component.css']
})
export class UserwiseBookReportComponent implements OnInit{

 constructor(private service:AllDataService){}
 ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
   this.getBookTrans()
 }
 FineColDetails:boolean=false
 college_data:any
 college_id:any ;
 libraryCardNo:any

 getUserdata:any
 getBookTrans(){
   if(this.libraryCardNo){
     this.service.bookTranOnuserLib(this.college_id,this.libraryCardNo).subscribe((res:any)=>{
       // console.log(res);
       if(res.status===1){
         this.getUserdata = res[0];
         this.college_data=res[0][0];
         this.FineColDetails=true
       }else{
         alert('No Data Found')
         this.FineColDetails=false
       }
       })
   }

   }



 //  for excel
 exportToExcel(): void {
   const selectedData = this.getUserdata.map((item: any, index:any) => ({ 'Sl. No.': index + 1,'User Name':item.name,'Library Card No.':item.library_card_number, 'Book Title': item.book_title_name,'Author ': item.author_name,'Editor': item.editor, 'Accession No.': item.accession_no, 'Transaction Type':item.book_issue_status,'Book Transaction Date':item.issue_date,'College Name': item.college_name  }));
   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   XLSX.writeFile(wb, `book-transaction-report-on-user.xlsx`);
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
