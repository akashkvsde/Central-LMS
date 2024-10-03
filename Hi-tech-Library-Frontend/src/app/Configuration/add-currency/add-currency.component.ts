import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Currency } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css']
})
export class AddCurrencyComponent implements OnInit {
  constructor(private service: AllDataService) { }
  p: number = 1;
  entry_by:any
  college_id:any

isSuperAdmin:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.service.isSuperAdmin()
    this.getCurrency();
    // interval(5000).subscribe(() => {
    //   this.getCurrency();
    // });
  }
  currency_search:any;
  CurrencyModel = new Currency()

  AddCurrency(validForm: any) {
    // console.log(this.CurrencyModel);
    this.CurrencyModel.entry_by=this.entry_by
    this.CurrencyModel.college_id=this.college_id
    if (validForm.valid) {
      this.service.addCurrency(this.CurrencyModel).subscribe((res: any) => {
        alert(res);
        this.getCurrency();
        validForm.reset();
      },
      (err:any)=>{
        alert('Something went Wrong')
      })
    } else {
      if (validForm.controls.curr_type.invalid) {
        alert('Please enter currency type.');
      }
    }

  }

  currency: any;
  getCurrency() {
    this.service.getCurrency(this.college_id).subscribe((res: any) => {
      this.currency = res;
      // console.log(res);
    })
  }


  EditCollege(college: any) {
    college.isEditing = true;
  }
  CancelEdit(college: any) {
    college.isEditing = false;
    // You might want to revert any changes made to the input fields
  }

  //Update
  UpdateCollege(currency: any,id:any) {
    console.log(currency);

    currency.isEditing = false;
    this.service.updCurrency(id,currency).subscribe((res:any)=>{
          alert(res);
          this.getCurrency();
      },
      (error) => {
        alert('Something Went Wrong');
      }

    );
  }

  //Delete
  DeleteCollege(id: any) {
    const confirmation = confirm("Are you sure you want to delete this currency?");
    if (confirmation) {
      this.service.delCurrency(id).subscribe((res: any) => {
          alert(res);
          this.getCurrency();
      },(err:any)=>{
        alert('Something went wrong')
      });
    }
  }
}
