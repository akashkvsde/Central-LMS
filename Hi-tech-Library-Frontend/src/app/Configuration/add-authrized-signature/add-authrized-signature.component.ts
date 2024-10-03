import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AuthorisedPersonModel, AuthrizedSignatures } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-authrized-signature',
  templateUrl: './add-authrized-signature.component.html',
  styleUrls: ['./add-authrized-signature.component.css']
})
export class AddAuthrizedSignatureComponent implements OnInit{
constructor(private service:AllDataService){}
imagePath:any;
AuthorisedPersonModel = new AuthorisedPersonModel()
entry_by:any
college_id:any
isSuperAdmin:any
ngOnInit(): void {
  this.entry_by=sessionStorage.getItem('user_id')
  this.college_id=sessionStorage.getItem('college_id')
  this.isSuperAdmin= this.service.isSuperAdmin()
  this.fetchData();
  this.getAllCollege()
  // interval(5000).subscribe(() => {
  //   this.fetchData();
  //   this.getAllCollege();
  // });


  let imgUrl = sessionStorage.getItem('url');

  if (imgUrl) {
      // Split the URL by "/"
      const urlSegments = imgUrl.split('/');
      urlSegments.pop();

      // Join the remaining segments back into a URL
      const baseUrl = urlSegments.join('/');

      this.imagePath = `${baseUrl}/AuthorisedSignature/`;
      // this.docPath = `${baseUrl}/studentDocument/`;

      console.log(baseUrl);
  } else {
      console.error('imgUrl is null');
  }
}
selectedImage: string | null = null;
  fileName: string | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.SignatureModel.signature=file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.fileName = null;
      this.selectedImage = null;
    }
  }

  allCollege:any
getAllCollege(){
  this.service.getCollege().subscribe((res:any)=>{
    console.log(res);
    this.allCollege=res

  })
}
selectedCollege:any
onCollegeChange(selectedCollegeId: any) {
  if (selectedCollegeId) {
    this.selectedCollege = selectedCollegeId;
    // console.log(this.collegeID);

  }
  }




SignatureModel=new AuthrizedSignatures()
addSignature(formvalid:any){
  if (formvalid.valid) {
    const formData = new FormData();
    formData.append('name', this.SignatureModel.name);
    formData.append('designation', this.SignatureModel.designation);
    formData.append('signature',  this.SignatureModel.signature);
    formData.append('entry_by', this.entry_by);
    formData.append('college_id', this.college_id);


    this.service.addSignature(formData).subscribe(
      (res: any) => {
        // console.log(res)
        alert(res);

        formvalid.reset();
      },
      (error: any) => {
        alert('Something went wrong !')
      }
    );
  }
}

data_table:any
fetchData(){
this.AuthorisedPersonModel.college_id = this.college_id
this.AuthorisedPersonModel.entry_by = this.entry_by

this.service.GetSignature(this.college_id).subscribe((data:any)=>{
this.data_table = data
},(err:any)=>{
alert("Something went wrong!!")
})

}

editAuthorise(data:any){
this.AuthorisedPersonModel = data
console.log(this.AuthorisedPersonModel);
}

getFile(ev:any){
  // console.log(ev.target.files[0]);
  if(ev){
    this.AuthorisedPersonModel.signature=ev.target.files[0];
  }
}


update(){
  const fomData= new FormData()
  fomData.append('id',this.AuthorisedPersonModel.id)
  fomData.append('name',this.AuthorisedPersonModel.name)
  fomData.append('designation',this.AuthorisedPersonModel.designation)
  fomData.append('authorise_status',this.AuthorisedPersonModel.authorise_status)
  fomData.append('signature',this.AuthorisedPersonModel.signature)
  fomData.append('college_id',this.AuthorisedPersonModel.college_id)
  fomData.append('entry_by',this.entry_by)


 this.service.updateSignature(this.AuthorisedPersonModel.id,fomData).subscribe((res:any)=>{
  alert(res);
  this.fetchData()

 })
}
}
