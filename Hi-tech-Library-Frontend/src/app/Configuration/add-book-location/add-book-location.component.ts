import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Location } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-book-location',
  templateUrl: './add-book-location.component.html',
  styleUrls: ['./add-book-location.component.css']
})
export class AddBookLocationComponent implements OnInit {
  constructor(private service:AllDataService){}
  entry_by:any
  collegeID:any
  isSuperAdmin:any
  ngOnInit(): void {
    this.collegeID=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getLocation();
    // interval(5000).subscribe(() => {
    //   this.getLocation();
    // });
  }
  Location_search:any;

  LocationModel=new Location();

  addLocation(validForm: any) {
    // alert(this.collegeID)
    this.LocationModel.college_id=this.collegeID
    this.LocationModel.entry_by=this.entry_by
    console.log(this.LocationModel);
    
    if (validForm.valid) {
      this.service.addLocation(this.LocationModel).subscribe((res:any)=>{
        console.log(res);
        alert(res);
        this.getLocation();
        validForm.reset();
      },(err:any)=>{
        alert('Something went wrong');
      })
    }else {
      if (validForm.controls.almirah_no.invalid) {
        alert('Please enter the Almirah no.');
      }
      if (validForm.controls.shelf_no.invalid) {
        alert('Please enter the Shelf no.');
      }
      if (validForm.controls.rack_no.invalid) {
        alert('Please enter the Rack no.');
      }
     
    }
    
  }
  Location: any;
  getLocation() {
    this.service.getLocation(this.collegeID).subscribe((res: any) => {
      this.Location = res;
    })
  }


  EditLocation(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  UpdateLocation(locationData: any,id:any) {
    // console.log(locationData);
    locationData.isEditing = false;
    this.service.updLocation(id,locationData).subscribe((res:any)=>{
          alert(res);
         
          this.getLocation();
        },
      (error:any) => {
        alert('Something Went Wrong');
        
    
      }
      
    );

    // Perform update logic here, e.g., send update request to server
  }

  DeleteLocation(id: any) {
    // console.log(id);
    
    const confirmation = confirm("Are you sure you want to delete this Location?");
    if (confirmation) {
      this.service.delLocation(id).subscribe((res: any) => {
          alert(res);
          
          this.getLocation();
   

      },
      (error:any) => {
        alert('Something Went Wrong');  
    
      });
    }
  }
  }
