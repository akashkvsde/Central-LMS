import { Component, ElementRef, ViewChild } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-of-department',
  templateUrl: './list-of-department.component.html',
  styleUrls: ['./list-of-department.component.css']
})
export class ListOfDepartmentComponent {

downloadedImageUrl: string = 'assets/img/logo.jpeg';
college_id:any

constructor(private service:AllDataService){}
ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
  this.getDept();
}

department:any;
college_data:any;

getDept(){
this.service.getDept(this.college_id).subscribe((res:any)=>{
  this.college_data=res[0];
  this.department=res;
});
}

//  for excel
exportToExcel(): void {
  const selectedData = this.department.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Department Name': item.dept_name,'College Name': item.college_name,'Course Name': item.course_name  }));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `department-list-report.xlsx`);
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


