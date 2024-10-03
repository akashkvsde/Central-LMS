import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { departmentWise, subjectWise } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-deptwise-cataloging-report',
  templateUrl: './deptwise-cataloging-report.component.html',
  styleUrls: ['./deptwise-cataloging-report.component.css']
})
export class DeptwiseCatalogingReportComponent implements OnInit{

  Subject:any;
  downloadedImageUrl: string = 'assets/img/logo.jpeg';
  BookDetails: boolean = false;

  constructor(private service:AllDataService){}

  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.getSubject();
  }

  college_id:any;

  getSubject(){
    this.service.getSub(this.college_id).subscribe((res:any)=>{
      // console.log(res);
      this.Subject=res;
    })
  }


  subwise = new subjectWise();
  alldata:any
  college_data:any
    Search(){
      if(this.subwise.subject_id){
      this.service.getBookBySub(this.college_id,this.subwise.subject_id).subscribe((res:any)=>{
        // console.log(res.msg);
        console.log(res);
        if(res.status===1){
          this.college_data=res[0][0];
          this.alldata=res[0];
          this.BookDetails=true
        }else{
          alert('Data not Found')
          this.BookDetails=false


        }
      })
    }
  }


//  for excel
exportToExcel(): void {

  const selectedData = this.alldata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name,'Editor': item.editor,'Author ': item.author_name, 'Call No.': item.call_no, 'Accession No.':item.accession_no,'College Name': item.college_name,'Subject':item.subject_name }));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `deptwise-cataloging-report.xlsx`);
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
