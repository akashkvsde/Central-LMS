import { Component } from '@angular/core';
import { AllDataService } from '../Services/all-data.service';
import { userUpdateModel } from '../Models/all-model';
import { interval } from 'rxjs';
 declare const myFun:any;
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  constructor (private allService:AllDataService){}
  p: number = 1;
  imgPath:any
docPath:any
  Search_Users:any
  entry_by:any ;
  college_id:any;
  isSuperAdmin:any
  ngOnInit(){
    // this.epClick()
    this.college_id=sessionStorage.getItem('college_id');
    this.entry_by=sessionStorage.getItem('user_id')
    this.isSuperAdmin= this.allService.isSuperAdmin()
    this.stClick()
    this.getCourse()
  //  this.getCollege()

  // interval(5000).subscribe(() => {
  //   this.stClick()
  //   this.getCourse()
  // });
  let imgUrl = sessionStorage.getItem('url');

  if (imgUrl) {
      // Split the URL by "/"
      const urlSegments = imgUrl.split('/');
      urlSegments.pop();

      // Join the remaining segments back into a URL
      const baseUrl = urlSegments.join('/');

      this.imgPath = `${baseUrl}/studentphoto/`;
      this.docPath = `${baseUrl}/studentDocument/`;

      console.log(baseUrl);
  } else {
      console.error('imgUrl is null');
  }
  
  }


  getUserdata:any;
  //toggle
  color:any = "#274472";
  bccolor:any = "white";
  color_ep:any = "";
  bccolor_ep:any = "";
  brad:any = "15px";
  pd:any = "3px";
  brad_ep:any = "";
  pd_ep:any = "";
  st:boolean = false;
  ep:boolean = true;

  click_value:any
  stClick(){
    this.click_value = 1;
    this.color = "#274472";
    this.bccolor = "white";
    this.brad = "15px";
    this.pd = "3px";
    this.color_ep = "";
    this.bccolor_ep = "";
    this.brad_ep = "";
    this.pd_ep = "";
    this.st = false;
    this.ep = true;
    //get student data
    this.allService.viewStdOnly(this.college_id).subscribe((data)=>{
     console.log(data);
     this.getUserdata = data;
    },(err:any)=>{
      // alert("Some thing went wrong Please again" + err)
    })
    }



    epClick(){
      this.click_value = 2;
    this.color = "";
    this.bccolor = "";
    this.brad = "";
    this.pd = "";
    this.color_ep = "#274472";
    this.bccolor_ep = "white";
    this.brad_ep = "25px";
    this.pd_ep = "3px";
    this.st = true;
    this.ep = false;
 //get employee data
    this.allService.viewEmpOnly(this.college_id).subscribe((data)=>{
      console.log(data);
      this.getUserdata = data;
    },(err:any)=>{
      // alert("Some thing went wrong Please again" + err)
      console.log(err);

    })
    }
    //toggle ended



    //====================Delete User===========================


    deleteUser(userId: any): void {
      const confirmation = window.confirm('Are you sure you want to delete?'); // Show confirmation dialog

      if (confirmation) {
        // Perform delete action
        this.allService.deleteUser(userId).subscribe(
          (data) => {
            alert(data);
            this.epClick();
            this.stClick();
          },
          (err) => {
            // alert("Something went wrong. Please try again. " + err);
            console.log(err);

          }
        );
      } else {
        // User clicked 'No' or closed the dialog
        console.log('User deletion cancelled.');
      }
    }

//used for session entry

//used for session entry

    //====================Edit user=====================
    editModel  = new  userUpdateModel            //model declared
    editUser(data:any){
      this.editModel.address          =     data.address
      this.editModel.batch_year       =     data.batch_year
      this.editModel.college_address     =     data.college_address
      this.editModel.college_email      =     data.college_email
      this.editModel.college_id      =     data.college_id
      this.editModel.college_name      =     data.college_name
      this.editModel.contact      =     data.contact
      this.editModel.course_id     =     data.course_id
      this.editModel.course_name     =     data.course_name
      this.editModel.dept_id       =     data.dept_id
      this.editModel.dept_name       =     data.dept_name
      this.editModel.designation     =     data.designation
      this.editModel.email       =     data.email
      this.editModel.entry_by     =     data.entry_by
      this.editModel.gender      =     data.gender
      this.editModel.image        =     data.image
      this.editModel.library_card_number      =     data.library_card_number
      this.editModel.name      =     data.name
      this.editModel.user_id      =     data.user_id
      this.editModel.user_role       =     data.user_role
      this.editModel.user_status       =     data.user_status
      this.editModel.document       =     data.document
      this.editModel.user_role_id =     data.user_role_id

      console.log(this.editModel);
    //  const demoCour = [{'course_id':data.course_id,
    // 'course_name':data.course_name}]
    //   this.viewCourse.push(demoCour[0])

      const demoDpt= [{'dept_id':data.dept_id,
     'dept_name':data.dept_name}]
      this.viewdePart.push(demoDpt[0])

    }

    //=========================update user====================
    updateUser(){
      this.editModel.entry_by = this.entry_by
      console.log(this.editModel);

      const formData = new FormData();
      formData.append('address', this.editModel.address);
      formData.append('batch_year', this.editModel.batch_year);
      formData.append('college_address', this.editModel.college_address);
      formData.append('college_email', this.editModel.college_email);
      formData.append('college_id', this.editModel.college_id);
      formData.append('college_name', this.editModel.college_name);
      formData.append('contact', this.editModel.contact);
      formData.append('course_id', this.editModel.course_id);
      formData.append('course_name', this.editModel.course_name);
      formData.append('dept_id', this.editModel.dept_id);
      formData.append('dept_name', this.editModel.dept_name);
      formData.append('designation', this.editModel.designation);
      formData.append('email', this.editModel.email);
      formData.append('entry_by', this.editModel.entry_by);
      formData.append('gender', this.editModel.gender);
      formData.append('image', this.editModel.image);
      formData.append('library_card_number', this.editModel.library_card_number);
      formData.append('name', this.editModel.name);
      formData.append('user_id', this.editModel.user_id);
      formData.append('user_role', this.editModel.user_role);
      formData.append('user_status', this.editModel.user_status);
      formData.append('document', this.editModel.document);
      formData.append('user_role_id', this.editModel.user_role_id);

      this.allService.updateUser(formData).subscribe((data)=>{
        alert(data);
        console.log(data);
        if(this.click_value == 1){
          this.stClick()
        }else if(this.click_value == 2){
          this.epClick()
        }

      },(err:any)=>{
        // alert("Something Went wrong try after some time")
      })


    }


    //===========================college course department============
    // viewCollege: any
    // getCollege() {
    //   this.allService.viewCollege().subscribe((result) => {
    //     this.viewCollege = result
    //   })
    // }


    viewCourse: any
    getCourse() {
      this.allService.viewCourse(this.college_id).subscribe((result) => {
        this.viewCourse = result
      })
    }

    viewdePart:  any =[]
    viewDepartment(data: any,fieldset:any) {
      console.log(data);
      fieldset.controls.dept_id.reset();
      this.allService.viewDepartment(data).subscribe((result) => {
        this.viewdePart = result
      })
    }


    //===image and doc section
    getFile(ev: any) {
      if (ev) {
        this.editModel.image = ev.target.files[0];
      }

    }

    getDoc(ev: any) {
      if (ev) {
        this.editModel.document = ev.target.files[0];
      }

    }


    //=============================Active and inactive
    swiTch(sth:any){
      console.log(sth);

    }



//Active and Inactive
statusValue: boolean = false;

sendactiveInactiveValue(id: any, status: any) {
  const newStatus = status ? 'inactive' : 'active';
  alert('Status Updated');
  this.allService.updateStatusSession(id).subscribe((res: any) => {
    console.log(res);
    if(this.click_value == 1){
      this.stClick()
    }else if(this.click_value == 2){
      this.epClick()
    }
  });
}



//SHOW iMAGE pdf doc 
getImageSource(userDoc: any | undefined): any {
  if (!userDoc) {
    return 'assets/img_my/notfoundfile.jpg';
  }

  const lastDotIndex = userDoc.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return 'assets/img_my/notfoundfile.jpg';
  }

  const fileExtension = userDoc.substring(lastDotIndex + 1).toLowerCase();

  if (fileExtension === 'pdf') {
    return 'assets/img_my/pdf.png';
  } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
    return this.docPath + userDoc;
  }else if (fileExtension === 'doc' || fileExtension === 'docx') {
    return 'assets/img_my/word.png';
  }
   else if (['xlsx', 'xlsm'].includes(fileExtension)) {
    return 'assets/img_my/excell.png';
  } else {
    return 'assets/img_my/notfoundfile.jpg';
  }
}


getDownloadLink(userDoc: any): string {
  return `${this.docPath}${userDoc}`;
}
}
