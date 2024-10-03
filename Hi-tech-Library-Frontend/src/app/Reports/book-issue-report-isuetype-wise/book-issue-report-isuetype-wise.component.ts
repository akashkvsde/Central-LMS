import { Component, ElementRef, ViewChild } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-issue-report-isuetype-wise',
  templateUrl: './book-issue-report-isuetype-wise.component.html',
  styleUrls: ['./book-issue-report-isuetype-wise.component.css']
})
export class BookIssueReportIsuetypeWiseComponent {


  BookDetails: boolean = false;
  Departments:any

  college_id:any;  //session area

  constructor(private service:AllDataService){}

  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
  this.IssueType();
  this.getCollegeName()
  }


  issue_data:any

  IssueType(){
    this.service.issueType(this.college_id).subscribe((data:any)=>{
      this.issue_data = data

    })
  }
  collegeData:any
getCollegeName(){
 if(this.college_id){
  this.service.getSingleCollege(this.college_id).subscribe((res:any)=>{
    console.log(res);
    this.collegeData=res[0]

  })
 }
}

  //get data in table=====================
  getdata:any
  getReportData(iss:any){
   if(iss){
    this.service.getbookdataIssueTypeWise(iss).subscribe((data:any)=>{
      // console.log(data);
      // console.log(data.status);
      if(data.status===1){
        this.getdata = data[0]
        this.BookDetails=true
      }

     },(err:any)=>{
       alert("Something Went Wrong!!")
       this.BookDetails=false
     })
   }
  }
 //  for excel
 exportToExcel(): void {
  const selectedData = this.getdata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Author': item.author_name, 'Editor':item.editor,'Accession No.':item.accession_no,'Usertype':item.user_type,'Issue Type':item.issue_type,'Issued Date':item.issue_date,'Issued By':item.name,'College Name':item.college_name}));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `book-issuetype-report.xlsx`);
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
  }
