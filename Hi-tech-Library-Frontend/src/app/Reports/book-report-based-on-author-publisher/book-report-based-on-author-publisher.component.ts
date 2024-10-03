import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-book-report-based-on-author-publisher',
  templateUrl: './book-report-based-on-author-publisher.component.html',
  styleUrls: ['./book-report-based-on-author-publisher.component.css']
})
export class BookReportBasedOnAuthorPublisherComponent implements OnInit {

  constructor(private service:AllDataService){}
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.getBooksReportAUTH_PUb()
  }
  BookTitles:any[] = ["Human Anatomy", "Morphology", "ABCD", "Hi-tech Dental College"];
  hideAuthorDetails:any=true
  hidePublisherDetails:any

  downloadedImageUrl: string = 'assets/img/logo.jpeg';
  ChangeStatus:any='author'
  AuthorDetails(){
    this.hideAuthorDetails = !this.hideAuthorDetails;
    this.hidePublisherDetails=false;
    this.ChangeStatus='author';
    this.getBooksReportAUTH_PUb();

  }

  PublisherDetails(){
    this.hidePublisherDetails = !this.hidePublisherDetails;
    this.hideAuthorDetails=false;
    this.ChangeStatus='publisher';
    this.getBooksReportAUTH_PUb();
  }



  IssuePage:any;

  IssuePageShow(){
    this.IssuePage = !this.IssuePage;
  }


  fileName:any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // You can perform any additional processing on the selected file here.
      // console.log('Selected file:', file.name);
      this.fileName=file.name;
    }
  }
  BookDetails: any;
  college_data:any;
  college_id:any
  getBooksReportAUTH_PUb(){
    this.service.getBooksBasedOnAuther_Publisher(this.college_id,this.ChangeStatus).subscribe((res:any)=>{
      console.log(res);
      if(res.status===1){
        this.BookDetails=res[0];
        this.college_data=res[0][0];
      }else{
        alert('No Data Found')
      }
    })
  }

  //  for excel AUTHOR
  exportToExcel(): void {
    const selectedData = this.BookDetails.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Author ': item.author_name,'Book Title': item.book_title_name,'Editor': item.editor, 'Subject': item.subject_name, 'No. of Copies':item.no_of_copies,'College Name': item.college_name  }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `based-on-author-report.xlsx`);
  }

  // FOR PUBLISHER

  exportToExcel2(): void {
    const selectedData = this.BookDetails.map((item: any, index:any) => ({ 'Sl. No.': index + 1, 'Publisher Name': item.publisher_name,'Book Title': item.book_title_name,'Author ': item.author_name,'Editor': item.editor,  'Subject':item.subject_name,'No. of Copies':item.no_of_copies,'College Name': item.college_name  }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `based-on-publisher-report.xlsx`);
  }

  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;
  printDiv() {
    // const printContents = this.printableDiv.nativeElement.innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // location.reload();
    window.print()
  }

  @ViewChild('printableDiv2', { static: false }) printableDiv2!: ElementRef;
  printDiv2() {
    // const printContents = this.printableDiv2.nativeElement.innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // location.reload();
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
