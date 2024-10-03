import { Component, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-report-common',
  templateUrl: './report-common.component.html',
  styleUrls: ['./report-common.component.css']
})
export class ReportCommonComponent {
  downloadedImageUrl: string = 'assets/img_my/hitech_logo.jpeg';

  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    const printContents = this.printableDiv.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload()
  }
}
