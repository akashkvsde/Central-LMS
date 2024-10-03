import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fine-collection-report',
  templateUrl: './fine-collection-report.component.html',
  styleUrls: ['./fine-collection-report.component.css']
})
export class FineCollectionReportComponent implements OnInit {


  constructor(private service:AllDataService){}
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.getFineCollection()
  }

  libraryCardNo:any
  downloadedImageUrl: string = 'assets/img/logo.jpeg';
  FineColDetails: boolean = true;
  FineCol(){
    // this.FineColDetails = !this.FineColDetails;
    if(this.libraryCardNo){
      this.getFineCollectionS();
    }
  }
  num:any
  college_id:any
  college_data:any;
  finecollectionData:any
  getFineCollection(){
    // this.total=null;
  this.service.getFineCollectionReport(this.college_id).subscribe((res:any)=>{
  this.college_data=res[0]
  this.finecollectionData=res;
  console.log(res);
  
  this.calculateTotal();

})
  }

  total:any =0;

  getFineCollectionS(){
this.service.getFineCollectionReportSearch(this.college_id,this.libraryCardNo).subscribe((res:any)=>{
  this.finecollectionData=res[0]
  // console.log(this.finecollectionData);
  this.calculateTotal();

  })
}

// Define a separate function to calculate the total fine amount
calculateTotal() {
  this.total = 0; // Initialize total to 0
  for (let i = 0; i < this.finecollectionData.length; i++) { // Use < instead of <=
    this.total += Number(this.finecollectionData[i].fine_amount);
    // console.log(this.total);
  }
}

  //  for excel
  exportToExcel(): void {

    const selectedData = this.finecollectionData.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'User Name':item.name,'College':item.college_name,'College Name':item.college_name,'Subject': item.subject_name,'Library Card No.': item.library_card_no,'Book Title': item.book_title_name,  'Accession No.':item.accession_id,'Reason':item.reason,'Collected Amount':item.fine_amount }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `fine-collection-report.xlsx`);
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
