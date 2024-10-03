import { Component, ViewChild, ElementRef } from '@angular/core';
import { AllDataService } from '../Services/all-data.service';
import { userUpdateModel } from '../Models/all-model';
declare const myFun:any;
import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.css']
})
export class LibraryCardComponent {
  Search_Users:any
  constructor (private allService:AllDataService){}
  editModel  = new  userUpdateModel            //model declared
  //session area
  college_id:any;
  //session area ended
p:any=1;

  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    const printContents = this.printableDiv.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    // location.reload()
  }

  imgPath:any;
  SignatureimgPath:any;
  ngOnInit(){
    this.college_id=sessionStorage.getItem('college_id')
    // this.epClick()
    this.stClick()
    let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();

        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');

        this.imgPath = `${baseUrl}/studentphoto/`;
        this.SignatureimgPath = `${baseUrl}/AuthorisedSignature/`;

        console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }
  }
   table:boolean= false;
   card:boolean = true;

   //card generation ........
   card_no:any
   img_card:any
   authorised_signature:any
   card_college:any
   card_name:any
   card_course:any
   getSignature:any

   signatureImage:any
   card_dpt:any
   card_designition:any
   card_bth_year:any
   mob_no:any
   address_card:any
   cardGenerate(data:any){
    this.table= true;
    this.card =false;
    //cardfetch
    this.img_card =  data.image
    this.authorised_signature =  data.authorised_signature
    this.card_no=  data.library_card_number
    this.card_college=  data.college_name
    this.card_name=  data.name
    this.card_course=  data.course_name
    this.getSignature=data.signature
    this.card_dpt=  data.dept_name
    // this.signatureImage=data[0].signature
    this.card_designition=  data.designation
    this.card_bth_year=  data.batch_year
    this.mob_no=  data.contact
    this.address_card=  data.address
     //barcode area
     JsBarcode('#barcode', data.library_card_number, {
      format: 'CODE128', // Specify the barcode format (e.g., CODE128)
      displayValue: true // Show the data below the barcode
    });
   }
   backTotable(){
    this.table= false;
    this.card = true;
   }
  //toggle
  color:any = "#274472";
  bccolor:any = "white";
  color_ep:any = "";
  bccolor_ep:any = "";
  brad:any = "15px";
  pd:any = "3px";
  brad_ep:any = "";
  pd_ep:any = "";
  st:boolean = false;
  ep:boolean = true;
  stClick(){
    this.color = "#274472";
    this.bccolor = "white";
    this.brad = "15px";
    this.pd = "3px";
    this.color_ep = "";
    this.bccolor_ep = "";
    this.brad_ep = "";
    this.pd_ep = "";
    this.st = false;
    this.ep = true;
    //get student data
    this.allService.viewStdOnly(this.college_id).subscribe((data:any)=>{
     console.log(data);
     this.getUserdata = data;
    },(err:any)=>{
      alert("Some thing went wrong Please again" + err)
    })

    }
    epClick(){
      this.color = "";
      this.bccolor = "";
      this.brad = "";
      this.pd = "";
      this.color_ep = "#274472";
      this.bccolor_ep = "white";
      this.brad_ep = "25px";
      this.pd_ep = "3px";
      this.st = true;
      this.ep = false;
   //get employee data
      this.allService.viewEmpOnly(this.college_id).subscribe((data:any)=>{
        // console.log(data[0].signature);
        // this.getSignature=data[0].signature

        this.getUserdata = data;
      },(err:any)=>{
        alert("Some thing went wrong Please again" + err)
      })
    }
    //toggle ended

    getUserdata:any;


}
