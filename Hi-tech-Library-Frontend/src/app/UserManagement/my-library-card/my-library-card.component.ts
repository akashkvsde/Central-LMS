import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'app-my-library-card',
  templateUrl: './my-library-card.component.html',
  styleUrls: ['./my-library-card.component.css']
})
export class MyLibraryCardComponent implements OnInit{
  user_id:any
  imgPath:any
  imagePath2:any
  constructor(private service:AllDataService){}
  college_id:any
  ngOnInit(): void {
    this.user_id=sessionStorage.getItem('user_id');
    this.college_id=sessionStorage.getItem('college_id');
    this.getAllUsers()

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
  allData:any
  getAllUsers(){
   if(this.user_id && this.college_id){
    this.service.getUserProfilewithcollegewisewithsignature(this.user_id,this.college_id).subscribe((res:any)=>{
      console.log(res);
      this.allData=res[0];

      JsBarcode('#barcode', this.allData.library_card_number, {
        format: 'CODE128', // Specify the barcode format (e.g., CODE128)
        displayValue: true // Show the data below the barcode
      });

    })
   }
  }

}
