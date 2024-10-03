import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { DocType } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.css']
})
export class AddDocumentTypeComponent {
  constructor(private service:AllDataService){}
  p: number = 1;
  entry_by:any
  college_id:any
  isSuperAdmin:any
  ngOnInit(): void {

    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getDocType();
    // interval(5000).subscribe(() => {
    //   this.getDocType();
    // });
  }
  Author_search:any;

  DocTypeModel=new DocType();

  addDocType(validForm: any) {
    this.DocTypeModel.college_id=this.college_id;
    this.DocTypeModel.entry_by=this.entry_by;
    if (validForm.valid) {
      this.service.adddocumentType(this.DocTypeModel).subscribe((res:any)=>{
        alert(res);
        console.log(res);

        this.getDocType();
        validForm.reset();
      },(err:any)=>{
        alert(err)
      })
    }else {
      if (validForm.controls.document_type.invalid) {
        alert('Please enter the Document type.');
      }

    }

  }
  allDoctype: any;
  getDocType() {
    this.service.getdocumentType(this.college_id).subscribe((res: any) => {
      this.allDoctype = res;
      // console.log(res);

    })
  }


  EditDocType(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateDocType(userrole: any,id:any) {
    // console.log(userrole);

    userrole.isEditing = false;
    this.service.upddocumentType(id,userrole).subscribe((res:any)=>{
          alert(res);
          console.log(res);
          this.getDocType();
      },
      (error:any) => {
        alert('Something Went Wrong');


      }

    );

  }

  DeleteDocType(id: any) {
    // alert(id)
    const confirmation = confirm("Are you sure you want to delete ?");
    if (confirmation) {
      this.service.deldocumentType(id).subscribe((res: any) => {
        console.log(res);

      alert(res)
          this.getDocType();
      },(error:any) => {
        alert('Something Went Wrong');

      });
    }
  }
}
