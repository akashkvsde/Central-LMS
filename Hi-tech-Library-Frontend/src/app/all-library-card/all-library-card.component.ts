
import { Component ,ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import {AllDataService} from '../Services/all-data.service'
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-all-library-card',
  templateUrl: './all-library-card.component.html',
  styleUrls: ['./all-library-card.component.css']
})
export class AllLibraryCardComponent {
  @ViewChildren('barcode') barcodeElements!: QueryList<ElementRef>;
constructor (private service:AllDataService){}
imgPath:any
imagePath2:any
//session area 
college_id:any
entry_by:any
//session area ended
ngOnInit(){
  this.college_id=sessionStorage.getItem('college_id')
  this.entry_by=sessionStorage.getItem('user_id')
this.getDepartMentAll()
let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();

        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');

        this.imgPath = `${baseUrl}/studentphoto/`;
        this.imagePath2 = `${baseUrl}/AuthorisedSignature/`;

        console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }
}





//get all depart ments
departments:any
notfound:any
hide:boolean = true;
getDepartMentAll(){
  this.service.getDept(this.college_id).subscribe((data:any)=>{
if(data!= 0){
  this.departments = data;
  this.notfound = null
}else{
  this.hide= false;
  this.notfound = "data is not found"
}
  })
}

//call all library card
lib_cards:any
nofound_card:any
all_lib_area:boolean = true
batchyear:any
getCarddata(batch_year: any, dpt_id: any) {
  this.batchyear=batch_year
  this.service.allLibcard(batch_year, dpt_id).subscribe(
    (data:any) => {
     if(data!=0){
      this.lib_cards = data  //fetching all libcard  data
      this.all_lib_area = false
      this.nofound_card=null;
this.ngAfterViewInit()
      
     }else{
      this.nofound_card=' No data found!! ';
      this.lib_cards = null 
      this.all_lib_area = true
     }
    },
    (error:any) => {
      // Error handling here without logging to the console
      this.nofound_card=' No data found!!An error occurred. Please try again. ';
    }
  );

  if(batch_year == 0){
    this.nofound_card = null
    this.all_lib_area = true
  }
}


ngAfterViewInit(): void {
  // console.log(this.barcodeData);

  if (this.batchyear) {
    setTimeout(() => {
      this.barcodeElements.forEach((element:any, index:any) => {
        JsBarcode(element.nativeElement, this.lib_cards[index]?.library_card_number);
      });
    }, 1000); // Delay for 1 second (adjust as needed)
  }
}


//print area 

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
