import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vendor-list-report',
  templateUrl: './vendor-list-report.component.html',
  styleUrls: ['./vendor-list-report.component.css']
})
export class VendorListReportComponent implements OnInit{

  constructor(private service:AllDataService){}
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.showVendors();
  }

  downloadedImageUrl: string = 'assets/img/logo.jpeg';

  VendorDetails: boolean = true;
  SearchVendor(){
    this.VendorDetails = !this.VendorDetails;
  }


venders:any;
college_id:any;
college_data:any

showVendors(){
  this.service.getVendors(this.college_id).subscribe((res:any)=>{
    // console.log(res);
    this.college_data=res[0];
    this.venders=res;
  })
}
 //  for excel
 exportToExcel(): void {
  const selectedData = this.venders.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Vendor Name': item.vendor_name,'Email ': item.vendor_email,'Contact': item.vendor_contact, 'Address': item.vendor_address }));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `vendor-list-report.xlsx`);
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

