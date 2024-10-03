import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { departmentWise } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-departmental-issue-book-report',
  templateUrl: './departmental-issue-book-report.component.html',
  styleUrls: ['./departmental-issue-book-report.component.css']
})
export class DepartmentalIssueBookReportComponent implements OnInit{
 
constructor(private service:AllDataService){}
college_id:any

ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
  this.getDepartment();
}
collegeData:any
BookDetails: boolean = false;
Departments:any;
getDepartment(){
  this.service.getDept(this.college_id).subscribe((res:any)=>{
    // console.log(res[0]);
    this.collegeData=res[0];
    this.Departments=res;
  })
}



deptwise = new departmentWise();

IssueBookDeptWise(){
  // console.log(this.deptwise.department_id);
}

allfetch_data:any
getAlldata(dpt_id:any){
 if(dpt_id){
  this.service.getbookDepartmentWise(this.college_id,dpt_id).subscribe((res:any)=>{
    // console.log(res);
    if(res.status===1){
      this.allfetch_data=res[0];
      // console.log(res[0]);
      this.BookDetails=true
      
    }else{
      alert('Data Not Found')
      this.BookDetails=false
    }
  },(err:any)=>{
    // console.log(err);
    
  })
 }
}
 //  for excel
exportToExcel(): void {
const selectedData = this.allfetch_data.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Book Title': item.book_title_name, 'Author': item.author_name, 'Editor':item.editor,'Accession No.':item.accession_no,'Department':item.dept_name,'Issued Date':item.issue_date,'Issued By':item.name}));
const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
const wb: XLSX.WorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
XLSX.writeFile(wb, `departmental-issue-report.xlsx`);
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
