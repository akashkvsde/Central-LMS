import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-book-stock-report',
  templateUrl: './book-stock-report.component.html',
  styleUrls: ['./book-stock-report.component.css']
})
export class BookStockReportComponent implements OnInit{
  constructor(private service:AllDataService){}
  college_id:any;
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.bookStock();
  }

  downloadedImageUrl: string = 'assets/img/logo.jpeg';
   //session area
  stock:any
  college_data:any
  bookStock(){
    this.service.bookStockReport(this.college_id).subscribe((res:any)=>{
      console.log(res[0]);
      this.college_data =res[0];
      this.stock =res;
    })
  }



  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  // printDiv() {
  //   const printContents = this.printableDiv.nativeElement.innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  //   // location.reload()
  // }

printDiv(){
  window.print();
}

//For Export Excell
exportToExcel(): void {
  const selectedData = this.stock.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Author Name':item.author_name,'Editor':item.editor, 'Total': item.total, 'Availability':item.Availability,'College Name':item.college_name }));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `book-stock-report.xlsx`);
}


//For PDF

@ViewChild('printableDiv', { static: false }) el!: ElementRef;
public openPDF(): void {
  let pdf  = new jsPDF('p','pt','a1');
  pdf.html(this.el.nativeElement,{
    callback:(pdf)=>{
      pdf.save("book-stock-report.pdf");
    }
  })
}


//For Pagination
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

