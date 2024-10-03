import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-transaction-report',
  templateUrl: './book-transaction-report.component.html',
  styleUrls: ['./book-transaction-report.component.css']
})
export class BookTransactionReportComponent implements OnInit{


constructor(private service:AllDataService){}
ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
}
inputType:any='text'
inputType2:any='text'

downloadedImageUrl: string = 'assets/img/logo.jpeg';

TransactionDetails: boolean = true;
fetchdata: any;
BookDetails: boolean = true;
college_data:any;

college_id:any;
Search(cid: any, fDate: any, tDate: any){
  if(fDate && tDate){
    this.service.bookTransReport(cid, fDate, tDate).subscribe((res:any)=>{
      console.log(res);

      if(res.status===1){
        console.log(res[0]);
        this.fetchdata=res[0]
        this.college_data =res[0][0];
        this.TransactionDetails=false
      }else{
        alert(res.msg)
        this.TransactionDetails=true
      }
    },(err:any)=>{
      console.log(err);

    });
  }
}

//  for excel
exportToExcel(): void {

  const selectedData = this.fetchdata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Author': item.author_name, 'Editor':item.editor,'Book Transaction Type':item.issue_type,'Username': item.name,'Book Transaction Date': item.issue_date,'College Name':item.college_name}));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `book-transaction-report.xlsx`);
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
