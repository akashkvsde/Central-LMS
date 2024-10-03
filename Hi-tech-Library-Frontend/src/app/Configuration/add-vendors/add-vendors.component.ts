import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Vendors } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-vendors',
  templateUrl: './add-vendors.component.html',
  styleUrls: ['./add-vendors.component.css']
})
export class AddVendorsComponent implements OnInit {
constructor(private service:AllDataService){}
p: number = 1;
entry_by:any
college_id:any;
isSuperAdmin:any
ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id')
  this.entry_by=sessionStorage.getItem('user_id')
  this.isSuperAdmin= this.service.isSuperAdmin()
   console.log(this.college_id,this.entry_by);
  this.getAllVendors();
  // interval(5000).subscribe(() => {
  //   this.getAllVendors();
  // });
  
}
vendor_search:any;

VendorsModel=new Vendors();

  addVendor(validForm: any) {
    // console.log(this.VendorsModel);
    this.VendorsModel.college_id=this.college_id
    this.VendorsModel.entry_by=this.entry_by
    if (validForm.valid) {
        this.service.addVendors(this.VendorsModel).subscribe(
            (res: any) => {
               console.log(res);
                   alert(res);
                    this.getAllVendors();
            },
            (error:any) => {
               alert('Something went wrong');
               
            }
        );
        validForm.reset();
    }else {
      if (validForm.controls.vendor_name.invalid) {
        alert('Please enter the Vendor name.');
      }
      if (validForm.controls.vendor_email.invalid) {
        alert('Please enter the Vendor Email.');
      }
      if (validForm.controls.vendor_contact.invalid) {
        alert('Please enter the Vendor Contact.');
      }
      if (validForm.controls.vendor_address.invalid) {
        alert('Please enter the Vendor Address.');
      }
    }
}

  Vendors: any;
  getAllVendors() {
    // console.log(this.collegeID);
    
    this.service.getVendors(this.college_id).subscribe((res: any) => {
      this.Vendors = res;
      console.log(res);

      
      
    })
  }



  EditVendor(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateVendor(userrole: any,id:any) {
    userrole.isEditing = false;
    // console.log(userrole);
    
    this.service.updVendors(id,userrole).subscribe((res:any)=>{
      // console.log(res);
          alert(res);
          this.getAllVendors();
      },
      (error) => {
        alert('Something Went Wrong');
        
    
      }
      
    );

    // Perform update logic here, e.g., send update request to server
  }

  DeleteVendor(id: any) {
    const confirmation = confirm("Are you sure you want to delete this vendor?");
    if (confirmation) {
      this.service.delVendors(id).subscribe((res: any) => {
          alert(res);
          this.getAllVendors();
      },(err:any)=>{
        alert('Something went wrong !')
      });
    }
  }
}
