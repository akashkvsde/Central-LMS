import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-log-report',
  templateUrl: './user-log-report.component.html',
  styleUrls: ['./user-log-report.component.css']
})
export class UserLogReportComponent implements OnInit{

  constructor(private service:AllDataService){}
  inputType2:any='text'
  inputType:any='text'
  p:any=1
  college_id: any
    ngOnInit(): void {
      this.college_id=sessionStorage.getItem('college_id')
    }
    downloadedImageUrl: string = 'assets/img/logo.jpeg';

  fetchdata: any;
  UserDetails: boolean = true;
  college_data:any;

  SearchUsers(cid: any, fDate: any, tDate: any) {

     if(fDate && tDate){
      this.service
        .userLogReport(cid, fDate, tDate)
        .subscribe((res: any) => {
          console.log(res);
          if(res.status===1){
            console.log(res[0]);
            this.fetchdata=res[0];
            this.college_data=res[0][0];
            this.UserDetails=false
          }else{
            alert(res.msg)
            this.UserDetails=true
          }

        },(err:any)=>{
          console.log(err);

        });
     }

  }

   //  for excel
   exportToExcel(): void {
    const selectedData = this.fetchdata.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Username': item.name, 'Library Card No.': item.library_card_number, 'IP Address':item.ip_address,'Process':item.process,'Process Time':item.process_time,'College Name':item.college_name }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet( wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `user-log-report.xlsx`);
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

    printDiv() {
      window.print();
    }
    
    }
