import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Billdetails } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';


@Component({
  selector: 'app-add-bill-details',
  templateUrl: './add-bill-details.component.html',
  styleUrls: ['./add-bill-details.component.css']
})
export class AddBillDetailsComponent implements OnInit {
constructor(private service:AllDataService){}
entryBy:any
collegeID:any
p: number = 1;
imagePath:any;
isSuperAdmin:any
  ngOnInit(): void {
    this.collegeID = Number(sessionStorage.getItem('college_id'))
    this.entryBy = Number(sessionStorage.getItem('user_id'))
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getVendors();
    this.getBills();

    // interval(5000).subscribe(() => {
    //   this.getVendors();
    //   this.getBills();
    // });

    let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();

        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');

        this.imagePath = `${baseUrl}/Bill_doc/`;

        console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }
  }
  Billdetails_search:any;
  

  inputType = 'text';

  fileName:any;
  BillDocs:any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // You can perform any additional processing on the selected file here.
      // console.log('Selected file:', file);
      this.fileName=file.name;
      this.BilldetailsModel.bill_doc=file;
      // console.log(this.BillDocs);

    }
  }

  AllVendors:any;
getVendors(){
  this.service.getVendors(this.collegeID).subscribe((res:any)=>{
    // console.log(res);
    this.AllVendors=res;

  })
}

BilldetailsModel=new Billdetails()

addBilldetails(formvalid: any) {
  if (formvalid.valid) {
    const formData = new FormData();
    formData.append('bill_num', this.BilldetailsModel.bill_num);
    formData.append('vendor_id', this.BilldetailsModel.vendor_id);
    formData.append('bill_date', this.BilldetailsModel.bill_date);
    formData.append('entry_by', this.entryBy);
    formData.append('bill_doc', this.BilldetailsModel.bill_doc);
    formData.append('college_id', this.collegeID);

    this.service.addBillDetails(formData).subscribe(
      (res: any) => {
        // console.log(res);

        alert(res);
        this.getBills();

        formvalid.reset();
      },
      (error: any) => {
        alert('Something went wrong !')
      }
    );
  }else {
    if (formvalid.controls.bill_num.invalid) {
      alert('Please enter the Bill Number.');
    }
    if (formvalid.controls.bill_date.invalid) {
      alert('Please enter the Bill Date.');
    }
    if (formvalid.controls.bill_doc.invalid) {
      alert('Please upload Bill Receipt.');
    }
    if (formvalid.controls.vendor_id.invalid) {
      alert('Please Select Vendor Name.');
    }
  }
}

billDetails:any;
getBills(){
  this.service.getBillDetails(this.collegeID).subscribe((res:any)=>{
    this.billDetails=res;
    // console.log(res);

  })
}

getImageSource(billDoc: any | undefined): any {
  if (!billDoc) {
    return 'assets/img_my/notfoundfile.jpg';
  }

  const lastDotIndex = billDoc.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return 'assets/img_my/notfoundfile.jpg';
  }

  const fileExtension = billDoc.substring(lastDotIndex + 1).toLowerCase();

  if (fileExtension === 'pdf') {
    return 'assets/img_my/pdf.png';
  } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
    return this.imagePath + billDoc;
  }else if (fileExtension === 'doc' || fileExtension === 'docx') {
    return 'assets/img_my/word.png';
  } 
  else if (['xlsx', 'xlsm'].includes(fileExtension)) {
    return 'assets/img_my/excell.png';
  } else {
    return 'assets/img_my/notfoundfile.jpg';
  }
}


getDownloadLink(billDoc: string): string {
  return `${this.imagePath}/${billDoc}`;
}


EditBillDetails(college: any) {
  college.isEditing = true;
}
CancelEdit(college: any) {
  college.isEditing = false;
  // You might want to revert any changes made to the input fields
}
upBillDocs:any={}
  upBillFile:any;
  onupdatedFileSelected(event: any, bill: any) {
    const file: File = event.target.files[0];
    if (file) {
      bill.bill_doc = file;
      this.upBillFile=bill.bill_doc
    }
  }
UpdateBillDetails(billDetails: any,id:any) {
  // console.log(billDetails);
  // alert(id)
  billDetails.isEditing = false;
  const formData = new FormData();
    // formData.append('bill_id', id);
    if(billDetails.bill_num){
      formData.append('bill_num', billDetails.bill_num);
    }
    if(billDetails.vendor_id){
      formData.append('vendor_id', billDetails.vendor_id);
    }
    if(billDetails.bill_date){
      formData.append('bill_date', billDetails.bill_date);
    }
    if(this.upBillFile){
      formData.append('bill_doc', this.upBillFile);
    }
    formData.append('entry_by', this.entryBy);
    formData.append('college_id', this.collegeID);
    this.service.updBillDetails(id,formData).subscribe(
      (res: any) => {
        alert(res);
        this.getBills();
      },
      (error: any) => {
        alert('Something went wrong !')
      }
    );
}

DeleteBillDetails(id: any) {
  // console.log(id);

  const confirmation = confirm("Are you sure you want to delete this Bill?");
  if (confirmation) {
    this.service.delBillDetails(id).subscribe((res: any) => {
        alert(res);
        this.getBills();
    },(err:any)=>{
      alert('Something went wrong !')
    });
  }
}

}
