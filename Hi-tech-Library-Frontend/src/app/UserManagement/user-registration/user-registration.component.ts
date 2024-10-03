import { Component } from '@angular/core';
import { StudentRegistreModel, empRegistreModel } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  entry_by: any;
  college_id:any ;
  ngOnInit() {
    // this.getCollege()
    this.college_id=sessionStorage.getItem('college_id');
    this.entry_by=sessionStorage.getItem('user_id')
    this. getCourse()
     this.getStduserroleValue()
    this.generatePassword()
  }
  regidata: any = "Student";
  hide: boolean = false;
  hide_emp: boolean = true;

  color: any = "#274472";
  bccolor: any = "white";
  brad: any = "15px";
  pd: any = "3px";

  color_ep: any = "";
  bccolor_ep: any = "";
  brad_ep: any = "";
  pd_ep: any = "";

  stClick() {
    this.color = "#274472";
    this.bccolor = "white";
    this.brad = "15px";
    this.pd = "3px";

    this.regidata = "Student";

    this.hide = false;
    this.hide_emp = true;

    this.color_ep = "";
    this.bccolor_ep = "";
    this.brad_ep = "";
    this.pd_ep = "";
  }


  epClick() {
    this.hide = true;
    this.hide_emp = false;

    this.color = "";
    this.bccolor = "";
    this.brad = "";
    this.pd = "";

    this.regidata = "Employee";

    this.color_ep = "#274472";
    this.bccolor_ep = "white";
    this.brad_ep = "25px";
    this.pd_ep = "3px";
  }
  //================================================Registration Process==================================
  constructor(private allService: AllDataService) { }

  studentResmodel = new StudentRegistreModel;
  empRegistreModel = new empRegistreModel;

  allRole: any
  //session 

 //session ended

 //=================get student and college individual
getStduserroleValue() {
  console.log(this.college_id);

  // Request 1: Get student user role
  this.allService.studentUserIdonly(this.college_id).subscribe(
    (result: any) => {
      this.studentResmodel.emp_role = result[0].user_role_id;
      console.log(this.studentResmodel.emp_role);
    },
    (error: any) => {
      console.error('Error getting student user role:', error);
      // Handle the error here, such as showing an error message to the user
    }
  );

  // Request 2: Get all roles except student admin
  this.allService.exceptStdAdm(this.college_id).subscribe(
    (result:any) => {
      this.allRole = result;
      console.log(result);
    },
    (error:any) => {
      console.error('Error getting roles except student admin:', error);
      // Handle the error here, such as showing an error message to the user
    }
  );
}

  //password generation
  generatedPassword: string = '';

  generatePassword(): void {
    const length = 8; // Password length
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@';
    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    this.generatedPassword = newPassword;
  }
  //password generation completed


  //registration part
  studentRegister(formvalidation: any) {
    // console.log(this.studentResmodel);
    
    if (formvalidation.valid) {
      this.studentResmodel.password = this.generatedPassword;
      this.studentResmodel.college_id = this.college_id;
      this.studentResmodel.entry_by = this.entry_by;
      // console.log(this.studentResmodel);
      const formData = new FormData();
      formData.append('name', this.studentResmodel.name);
      formData.append('email', this.studentResmodel.email);
      formData.append('contact', this.studentResmodel.contact);
      formData.append('address', this.studentResmodel.address);
      formData.append('gender', this.studentResmodel.gender);
      formData.append('batch_year', this.studentResmodel.batch_year);
      formData.append('course_id', this.studentResmodel.course_id);
      formData.append('dept_id', this.studentResmodel.dept_id);
      formData.append('college_id', this.studentResmodel.college_id);
      formData.append('password', this.studentResmodel.password);
      formData.append('entry_by', this.studentResmodel.entry_by);
      formData.append('image', this.studentResmodel.image);
      formData.append('user_role_id', this.studentResmodel.emp_role);
      
      console.log(formData);
      this.allService.stuEmpRegistration(formData).subscribe((result: any) => {
        alert(result);
        console.log(result);
      }, (err: any) => {
        alert('Something Went Wrong' + err)
      })
      formvalidation.reset();
    }
    else{
      if (formvalidation.controls.name.invalid) {
        console.log('Please fill name the field')
      }
    }
  }



  empRegister(formvalid_emp:any) {
    ;
    if (formvalid_emp.valid) {
      this.empRegistreModel.password = this.generatedPassword;
      this.empRegistreModel.college_id = this.college_id;
      this.empRegistreModel.entry_by = this.entry_by;

      console.log(this.empRegistreModel)
  
      const formData = new FormData();
      formData.append('name', this.empRegistreModel.name);
      formData.append('email', this.empRegistreModel.email);
      formData.append('contact', this.empRegistreModel.contact);
      formData.append('address', this.empRegistreModel.address);
      formData.append('gender', this.empRegistreModel.gender);
      formData.append('college_id', this.empRegistreModel.college_id);
      formData.append('password', this.empRegistreModel.password);
      formData.append('entry_by', this.empRegistreModel.entry_by);
      formData.append('image', this.empRegistreModel.image);
      formData.append('user_role_id', this.empRegistreModel.emp_role);
      formData.append('designation', this.empRegistreModel.designation);
      formData.append('document', this.empRegistreModel.document);
     
      this.allService.stuEmpRegistration(formData).subscribe((result: any) => {
        alert(result);
        console.log(result);
        
        formvalid_emp.reset();
      }, (err: any) => {
        console.log(err);
        
        alert('Something Went Wrong' + err)
      })

    }else{
      if (formvalid_emp.invalid) {
        console.log('Field is required')
      }
    }
  }



  getFile(ev: any) {
    if (ev) {
      this.studentResmodel.image = ev.target.files[0];
      this.empRegistreModel.image = ev.target.files[0];
    }

  }

  getDoc(ev: any) {
    if (ev) {
      this.empRegistreModel.document = ev.target.files[0];
    }

  }

  // viewCollege: any
  // getCollege() {
  //   this.allService.viewCollege().subscribe((result) => {
  //     this.viewCollege = result
  //   })
  // }

  viewCourse: any
  getCourse() {
    this.allService.viewCourse(this.college_id).subscribe((result:any) => {
      this.viewCourse = result
    })
  }

  viewdePart: any
  viewDepartment(data: any,fieldset:any) {
    console.log(data);
    fieldset.controls.dept_id.reset();
    this.allService.viewDepartment(data).subscribe((result:any) => {
      this.viewdePart = result
    })
  }


}
