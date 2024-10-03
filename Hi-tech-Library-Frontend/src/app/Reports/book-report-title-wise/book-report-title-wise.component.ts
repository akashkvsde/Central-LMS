import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { titlewiseReport } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-report-title-wise',
  templateUrl: './book-report-title-wise.component.html',
  styleUrls: ['./book-report-title-wise.component.css'],
})
export class BookReportTitleWiseComponent implements OnInit{
  constructor(private service:AllDataService){}
  college_id:any

//  dtoptions:DataTables.Settings={}
//   dtTrigger:Subject<any>=new Subject<any>()

  ngOnInit(): void {
   

    this.college_id=sessionStorage.getItem('college_id')
    this.getBookTitleClg();
   this.getBookTitle();
  }


  downloadedImageUrl: string = 'assets/img/logo.jpeg';
  BookDetails: boolean = true;

  title:any;
  college_data:any;
  BookTitles:any;


getBookTitleClg(){
  this.service.getTitle(this.college_id).subscribe((res:any)=>{
    this.BookTitles=res;
    // console.log(res);
  })
}

getBookTitle(){
  this.service.bookTitleReport(this.college_id).subscribe((res:any)=>{
    console.log(res);
    this.college_data=res[0]
    this.title=res;
    // this.dtTrigger.next(null);
    // console.log(res);
  })

}

//  clgId=1;
//  title_search:any
titlewise=new titlewiseReport()
searchBookTitleReport() {
  console.log(this.titlewise.bookTitle_id)
// console.log(this.titlewise.bookTitle_id);
if(this.titlewise.bookTitle_id){
  // alert()
  this.service.bookTitleSearch(this.college_id,this.titlewise.bookTitle_id).subscribe((res:any)=>{
    console.log(res);
    if(res.status===1){
      this.title=res[0];
    }else{
      alert('Data not Found')
    }
  },(err:any)=>{
    // alert('Something went wrong')
  })
}else{
  this.getBookTitle();
}

}

  //  for excel
  exportToExcel(): void {
    const selectedData = this.title.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Author': item.author_name, 'Editor':item.editor,'Subject':item.subject,'No. of Copies':item.no_of_copies,'Accession No.':item.accession_no,'College Name':item.college_name}));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `book-titlewise-report.xlsx`);
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
