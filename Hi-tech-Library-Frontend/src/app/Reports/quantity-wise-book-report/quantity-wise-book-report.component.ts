import { Component, ViewChild, ElementRef } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-quantity-wise-book-report',
  templateUrl: './quantity-wise-book-report.component.html',
  styleUrls: ['./quantity-wise-book-report.component.css']
})
export class QuantityWiseBookReportComponent {

 constructor(private service:AllDataService){}
 ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
   this.getBookstitlewise()
   this.getBookTitles()
   this.getBookQuantitwise()
 }
 BookTitles:any;
 getBookTitles(){
   this.service.getTitle(this.college_id).subscribe((res:any)=>{
    //  console.log(res);
     this.BookTitles=res

   })
 }

 downloadedImageUrl: string = 'assets/img/logo.jpeg';
 BookDetails: boolean = true;
 SearchBooks(){
   // this.BookDetails = !this.BookDetails;
   console.log(this.title_name);
   this.getBookstitlewise()

 }
 college_id:any;
 books:any
 college_data:any
getBookQuantitwise(){
 this.service.getbookReportQuantitywise(this.college_id).subscribe((res:any)=>{
   console.log(res);
   this.books=res
   this.college_data=res[0]
 })
}
title_name:any
getBookstitlewise(){
if(this.title_name){
 this.service.getbookReportTitleQuantitywise(this.college_id,this.title_name).subscribe((res:any)=>{
   // this.books=res[0]
   if (res.length > 0) {
     this.books = res[0];
     this.college_data=res[0][0]
     // console.log(res.length);
   } else {
     // Show an alert or perform some other action
     alert('Data not available.');

   }

 },(err:any)=>{
   // alert(err.msg)
 })
}else{
  this.getBookQuantitwise()
}
}

//  for excel
exportToExcel(): void {
 const selectedData = this.books.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name,'Author ': item.author_name,'Editor': item.editor,  'Accession No.':item.accession_no,'Quantity': item.total,'College Name': item.college_name}));
 const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 XLSX.writeFile(wb, `quantitywise-book-report.xlsx`);
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
