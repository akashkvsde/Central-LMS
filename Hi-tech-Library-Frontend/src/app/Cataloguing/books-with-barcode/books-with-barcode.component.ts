import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'app-books-with-barcode',
  templateUrl: './books-with-barcode.component.html',
  styleUrls: ['./books-with-barcode.component.css']
})
export class BooksWithBarcodeComponent  implements AfterViewInit{
constructor(private service:AllDataService){
  this.college_id=sessionStorage.getItem('college_id');
  this.getAllBooks();
}
  bookTitle_search:any
  p:any=1;
  college_id:any
  @ViewChildren('barcode') barcodeElements!: QueryList<ElementRef>;
  barcodeData: any[] = [];

 
  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    const printContents = this.printableDiv.nativeElement.innerHTML;
    const printWindow = window.open('', '_blank')!;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              .barcode-svg {
                width: 12% !important;
                height: auto !important;
                /* Add any additional styles for your SVG elements */
              }
  
              .pk {
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto; /* Add this property to enable horizontal scrolling if needed */
              }
  
              .col-lg {
                flex: 0 0 auto;
                margin-right: 10px; /* Adjust the margin as needed */
              }
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
  
    // You can add an event listener to close the print window after printing
    if (printWindow) {
      printWindow.addEventListener('afterprint', () => {
        printWindow.close();
      });
  
      printWindow.print();
    }
  }


  
 
  getAllBooks() {
    this.service.getAllBooks(this.college_id).subscribe((res: any) => {
      // console.log(res);
      this.barcodeData = res.map((result: any) => ({
        accession_no: result.accession_no,
        book_title_name: result.book_title_name
      }));
      // console.log("barcodes", this.barcodeData);
      // Move ngAfterViewInit call inside the subscription
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.barcodeData);
  
    if (typeof JsBarcode !== 'undefined') {
      setTimeout(() => {
        this.barcodeElements.forEach((element, index) => {
          JsBarcode(element.nativeElement, this.barcodeData[index]?.accession_no);
        });
      }, 1000); // Delay for 1 second (adjust as needed)
    }
  }


  accession_no_from:any
  accession_no_to:any
  filteraccessionNowise() {
    if (this.accession_no_from && this.accession_no_to) {
      this.service.getBookAccessionNoRange(this.accession_no_from, this.accession_no_to,this.college_id).subscribe(
        (res: any) => {
          this.barcodeData = res.map((result: any) => ({
            accession_no: result.accession_no,
            book_title_name: result.book_title_name
          }));
          this.ngAfterViewInit();
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      this.getAllBooks();
    }
    }

 
}
