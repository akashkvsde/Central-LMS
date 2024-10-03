import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {  subjectWise } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-subjectwise-report',
  templateUrl: './book-subjectwise-report.component.html',
  styleUrls: ['./book-subjectwise-report.component.css']
})
export class BookDepartmentwiseReportComponent implements OnInit{


  constructor(private service:AllDataService){}
  college_id:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this. getSubject();
    // this.getBookSubject();
    // this.getBookDeptWise();
   }

  downloadedImageUrl: string = 'assets/img/logo.jpeg';
  Subjects:any;
  BookDetails: boolean = false;
  college_data:any;


  getSubject(){
    this.service.getSub(this.college_id).subscribe((res:any)=>{
      // console.log(res);
      this.Subjects=res;
    })
  }

  // getBookSubject(){
  //   this.service.bookSubWiseReport(this.college_id,this.subwise.subject_id).subscribe((res:any)=>{
  //     console.log(res);
  //     this.sub=res;
  //   })
  // }
  


  subwise = new subjectWise();
  sub:any;
  SearchBookSubWise(){
    console.log(this.subwise.subject_id);
    if(this.subwise.subject_id){
       this.service.bookSubWiseSearch(this.college_id,this.subwise.subject_id).subscribe((res:any)=>{
        console.log(res[0]);
       
        if (res.status === 1) {
    
          this.sub = res[0];
          this.college_data = res[0][0];
          this.BookDetails=true;
          // this.getBookDeptWise()
          
        } else {
          // Show an alert or perform some other action
          // alert('Data not available.');
          this.BookDetails=false;
          alert('Data Not Found')
        }
    })
    }

  

  }

  //  for excel
  exportToExcel(): void {

    const selectedData = this.sub.map((item: any, index:any) => ({ 'Sl. No.': index + 1,
    'Subject':item.subject_name, 'Book Title': item.book_title_name, 'Author': item.author_name, 'Editor':item.editor,'No. of Copies':item.no_of_copies,'College Name':item.college_name}));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `departmentwise-book-report.xlsx`);
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
