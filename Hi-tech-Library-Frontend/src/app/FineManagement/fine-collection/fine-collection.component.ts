import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { FineCollection } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-fine-collection',
  templateUrl: './fine-collection.component.html',
  styleUrls: ['./fine-collection.component.css']
})
export class FineCollectionComponent implements OnInit {
  paidAmount:any

  constructor(private service: AllDataService) { }
  entry_by:any
  ngOnInit(): void {
    this.college_id = sessionStorage.getItem('college_id');
    this.entry_by = sessionStorage.getItem('user_id');
    this.getLibraryCardNO();
    // interval(5000).subscribe(() => {
    //   this.getLibraryCardNO();
    // });
  }
  college_id: any
  libraryCardNo: any
  getLibraryCardNO() {
    this.service.getLibraryCardNobasedOnclg(this.college_id).subscribe((res: any) => {
      console.log(res);
       this.libraryCardNo = res.filter((forsuperadmin: any) => forsuperadmin.library_card_number !== 'SUPERADMINHERE');

    })
  }

 

  selectedLibraryCard: any
  onLibraryCardnoChange(ev: any) {
    console.log(ev);
    this.selectedLibraryCard = ev;
    this.getAccessioNo()
    this.getUserdata();

  }
  userID:any
  getUserdata() {
    if (this.libraryCardNo) {
      this.service.getAllusersdata(this.selectedLibraryCard).subscribe((res: any) => {
        if (res && res.length > 0 && res[0].user_id) {
          this.userID = res[0].user_id;
        } else {
          // console.error('Invalid response structure:', res);
        }
      });
    }
  }
  accessionNo: any
  getAccessioNo() {
    this.service.getissuedBooksbasedonLibraryCard(this.selectedLibraryCard).subscribe((res: any) => {
      // console.log(res);
      this.accessionNo = res;

    })
  }
  selectedAccessionNo: any
  IssuedBooksAccessionNo(ev: any) {
    console.log(ev);
    this.selectedAccessionNo = ev;
    this.getFineamount();
  }

  fineAmount:any
  fine_policy_id:any
  getFineamount() {
    this.service.getFineAmountForIndivialAccessionNo(this.selectedLibraryCard, this.selectedAccessionNo).subscribe((res: any) => {
      // console.log(res.fine_policy_id);
      this.fineAmount=res.fine_amount
      this.fine_policy_id=res.fine_policy_id

    })
  }
  fileName:any;
  document:any
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName=file.name;
      this.document=file;
   
    }
  }

  FineCollection=new FineCollection()
  FineCollect(validForm: any) {
    
    if(validForm.valid){
      if(this.selectedLibraryCard || this.selectedAccessionNo || this.fineAmount || this.fine_policy_id){
        if(this.fineAmount >0){
          const formData = new FormData();
        formData.append('accession_id', this.selectedAccessionNo);
        formData.append('library_card_no', this.selectedLibraryCard);
        formData.append('fine_amount', this.fineAmount);
        formData.append('paid_amount', this.paidAmount);
        formData.append('fine_policy_id', this.fine_policy_id);
        formData.append('reason', this.FineCollection.reason);
        formData.append('entry_by', this.entry_by);
        formData.append('user_id', this.userID);
        formData.append('college_id', this.college_id);
        if(this.document){
          formData.append('document', this.document);
        }
        this.service.FineCollectionn(formData).subscribe((res:any)=>{
          alert(res)
          // console.log(res);
          validForm.reset()
          
          
        },(err:any)=>{
          alert("Something went wrong")
        })
        }else{
          alert('Fine amount is 0, so no amount should be collected.');
    
        }
        
      }else{
        alert("Please Fill All Fields")
      }
    }
       
      }
}
