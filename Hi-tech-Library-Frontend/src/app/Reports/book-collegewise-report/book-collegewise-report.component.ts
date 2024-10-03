import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { collegeWise, titlewiseReport } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-collegewise-report',
  templateUrl: './book-collegewise-report.component.html',
  styleUrls: ['./book-collegewise-report.component.css']
})
export class BookCollegewiseReportComponent implements OnInit{

constructor(private service:AllDataService){}
ngOnInit(): void {
  this.getClg();
  this. getBookCollege();
}

downloadedImageUrl: string = 'assets/img/logo.jpeg';
BookDetails: boolean = false;
collegeName:any;
title:any;
college_data:any;
college_id=1;

getClg(){
  this.service.getCollege().subscribe((res:any)=>{
    console.log(res);
    this.collegeName=res;
  })
}

getBookCollege(){
  this.service.bookCollegewiseReport(this.college_id).subscribe((res:any)=>{
    console.log(res);
    this.title=res;
  })
}

collegewise = new collegeWise();
alldata:any

searchBookTitleReport(){
// console.log(this.collegewise.college_id);

if(this.collegewise.college_id){
  this.service.bookCollegewiseReport(this.collegewise.college_id).subscribe((res:any)=>{
    console.log(res);
    this.college_data=res[0]
    this.alldata=res
    if(res.length===0){
      this.BookDetails=false
      alert('Data Not Found')
    }else{
      this.BookDetails=true
    }
  })
}
}


 //  for excel
 exportToExcel(): void {

  const selectedData = this.alldata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Author': item.author_name, 'Editor':item.editor,'No. of Copies':item.no_of_copies,'College Name':item.college_name}));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `collegewise-book-report.xlsx`);
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

