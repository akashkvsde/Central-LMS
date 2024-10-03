import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { departmentWise } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-book-cost-report',
  templateUrl: './book-cost-report.component.html',
  styleUrls: ['./book-cost-report.component.css']
})
export class BookCostReportComponent implements OnInit{

  constructor(private service:AllDataService){}

  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.getSubject();
    this.fetchBookDetails();
  }

  BookTitles:any;
  downloadedImageUrl: string = 'assets/img/logo.jpeg';
  subject:any;
  BookDetails: any;
  college_id:any;
  college_data:any;

  // getDepartment(){
  //   this.service.getDept(this.college_id).subscribe((res:any)=>{
  //     console.log(res);
  //     this.subject=res;
  //   })
  // }

  getSubject(){
    this.service.getSub(this.college_id).subscribe((res:any)=>{
      console.log(res);
      this.subject=res;
    })
  }

  fetchBookDetails(){
    this.service.getBookDetails(this.college_id).subscribe((res:any)=>{
      console.log(res);
      this.BookDetails=res;
      this.college_data=res[0];

    })
  }

  deptwise=new departmentWise();
  bookdata:any;

  bookCostReport() {
    console.log(this.deptwise.department_id)
  // console.log(this.titlewise.bookTitle_id);
  if(this.deptwise.department_id){
    // alert()
    this.service.BookCostReport(this.college_id,this.deptwise.department_id).subscribe((res:any)=>{
      console.log(res);
      if(res.status===1){
        this.BookDetails=res[0];
      }else{
        alert('Data not Found')
      }
    },(err:any)=>{
      // alert('Something went wrong')
    })
  }else{
    // alert('Please select book title');
    this.fetchBookDetails();
    
  }
}

  //  for excel
  exportToExcel(): void {
    const selectedData = this.BookDetails.map((item: any, index:any) => ({ 'Sl. No.': index + 1,'Subject':item.subject_name, 'Book Title': item.book_title_name,'Author ': item.author_name,'Editor': item.editor, 'Publisher': item.publisher_name, 'Publish Year':item.publish_year,'Book Cost':item.book_price,'College Name': item.college_name  }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `book-cost-report.xlsx`);
  }

  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    // const printContents = this.printableDiv.nativeElement.innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // location.reload()
    window.print()
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
