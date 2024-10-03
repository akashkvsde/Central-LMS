import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-details-report',
  templateUrl: './user-details-report.component.html',
  styleUrls: ['./user-details-report.component.css']
})
export class UserDetailsReportComponent implements OnInit{


constructor(private service:AllDataService){}
college_id:any
ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
  this.getUserrole()
}

  hideStudentDetails:any=true
  hideEmployeeDetails:any
  downloadedImageUrl: string = 'assets/img/logo.jpeg';
  userRole:any='student'
  StudentDetails(){
    this.hideStudentDetails = !this.hideStudentDetails;
    this.hideEmployeeDetails=false;
    this.userRole='student'
    // console.log(this.userRole);
    this.getUserrole()
  }

  EmployeeDetails(){
    this.hideEmployeeDetails = !this.hideEmployeeDetails;
    this.hideStudentDetails=false;
    this.userRole='employee'
    // console.log(this.userRole);
    this.getUserrole()

  }

userdata:any;

  college_data:any;
 getUserrole(){
  if(this.userRole){
    this.service.getUserDetailsReport(this.college_id,this.userRole).subscribe((res:any)=>{
      this.userdata=res;
      this.college_data=res[0];
      console.log(res);

    })
  }else{
    alert('No Data Found');
  }
 }


  //  for excel
  exportToExcel(): void {
    const selectedData = this.userdata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Name': item.name, 'Library Card No.': item.library_card_number, 'Batch Year':item.batch_year,'Department':item.dept_name,'Course':item.course_name,'User Type':item.user_role,'College Name':index === 0 ? item.college_name : '' }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `student-details-report.xlsx`);
  }

  exportToExcel2(): void {
    const selectedData = this.userdata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Name': item.name, 'Library Card No.': item.library_card_number, 'Department':item.dept_name,'Course':item.course_name,'User Type':item.user_role,'College Name':index === 0 ? item.college_name : '' }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `employee-details--report.xlsx`);
  }

  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;
  // printDiv() {
  //   const printContents = this.printableDiv.nativeElement.innerHTML;
  //   const originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  //   // location.reload()
  // }

  printDiv(){
    window.print()
  }

  @ViewChild('printableDiv2', { static: false }) printableDiv2!: ElementRef;
  // printDiv2() {
  //   const printContents = this.printableDiv2.nativeElement.innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  //   // location.reload()
  // }

  printDiv2(){
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

