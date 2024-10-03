import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-of-college',
  templateUrl: './list-of-college.component.html',
  styleUrls: ['./list-of-college.component.css']
})
export class ListOfCollegeComponent implements OnInit{

  downloadedImageUrl: string = 'assets/img/logo.jpeg';

  constructor(private service:AllDataService){}
  ngOnInit(): void {
    // this.college_id=sessionStorage.getItem('college_id')
    this.getClg();
  }

college:any;
getClg(){
  this.service.getCollege().subscribe((res:any)=>{
    this.college=res;
  });
}

  //  for excel
  exportToExcel(): void {
    const selectedData = this.college.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'College Name': item.college_name,'College Email': item.college_email,'Phone No. ': item.phone_no,'Address': item.college_address,   }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `college-list-report.xlsx`);
  }
  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    // const printContents = this.printableDiv.nativeElement.innerHTML;
    // const originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // location.reload()
    window.print();
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
