import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Publishers } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
declare const myFun:any;

@Component({
  selector: 'app-add-publishers',
  templateUrl: './add-publishers.component.html',
  styleUrls: ['./add-publishers.component.css']
})
export class AddPublishersComponent implements OnInit {
  constructor(private service:AllDataService){}
  college_id:any
  entry_by:any
  p: number = 1;
  isSuperAdmin:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getAllPublisher();
    // interval(5000).subscribe(() => {
    //   this.getAllPublisher();
    // });
  }
  Publisher_search:any;

  PublishersModel=new Publishers();

  addPublisher(validForm: any) {
    this.PublishersModel.college_id=this.college_id
    this.PublishersModel.entry_by=this.entry_by
      if (validForm.valid) {
        this.service.addPublishers(this.PublishersModel).subscribe((res:any)=>{
          // console.log(res);
          alert(res);
          this.getAllPublisher();
          validForm.reset();
        })
      }else {
        if (validForm.controls.publisher_name.invalid) {
          alert('Please enter the Publisher name.');
        }
        if (validForm.controls.publisher_place.invalid) {
          alert('Please enter the Publisher Place.');
        }


      }

    }


    Publisher: any;
    getAllPublisher() {
      this.service.getPublishers(this.college_id).subscribe((res: any) => {
        this.Publisher = res;
      })
    }



    EditPublisher(college: any) {
      college.isEditing = true;
    }
    CancelEdit(college: any) {
      college.isEditing = false;
      // You might want to revert any changes made to the input fields
    }

    UpdatePublisher(publish: any,id:any) {
      publish.isEditing = false;
      this.service.updPublishers(id,publish).subscribe((res:any)=>{
            alert(res);
            this.getAllPublisher();

        },
        (error) => {
          alert('Something Went Wrong');

        }

      );


    }

    DeletePublisher(id: any) {
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        this.service.delPublishers(id).subscribe((res: any) => {
            alert(res);
            this.getAllPublisher();

        },(err:any)=>{
          alert('Something went wrong !')
        });
      }
    }
  }
