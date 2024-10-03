import { Component, ElementRef, Renderer2 } from '@angular/core';
import { College, Login } from '../Models/all-model';
import { AllDataService } from '../Services/all-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  imagePath: any = "http://45.114.50.218:8090/BookImage/"
  constructor(private service: AllDataService, private route: Router, private renderer: Renderer2, private el: ElementRef) {
    this.getColleges()
  }
  searchBookTitle:any
  showMobileNumber: boolean = false;


  toggleMobileNumberVisibility() {
    this.showMobileNumber = !this.showMobileNumber;
  }

  LoginModel = new Login();
  Login(loginForm: any) {
    if (loginForm.valid) {
      this.service.LibraryLogin(this.LoginModel).subscribe((res: any) => {
        // console.log(res);

        if (res.status === 1) {
          if (res[1].length === 0) {
            alert("Pages are not assigned to this user");
          } else {
            localStorage.setItem('userrole', JSON.stringify(res[2]));
            sessionStorage.setItem('token', res[3])
            // const userID = res[0].user_id;
            // this.route.navigate(['Dashboard'])
            window.location.href = 'Dashboard/Dashboard Charts';
            //   queryParams: { userID: userID }
            // });
            sessionStorage.setItem('user_id', res[0].user_id)
            sessionStorage.setItem('name', res[0].name)
            sessionStorage.setItem('college_id', res[0].college_id)
          }
        } else {
          alert(res[0]); // Assuming the response contains a 'message' field
        }
      },(error:any)=>alert(error.error[0]));
    }
  }

  CourseModel = new College()
  allColleges: any[] = [];
  getColleges() {
    this.service.getCollege().subscribe((res: any) => {
      // console.log(res);
      this.allColleges = res
    })
  }






p:any=1;
allBooksData: any[]=[];
hideshow=false;
  openModal(ev: any) {
    if (ev) {
      this.service.getAllBooks(ev).subscribe((res: any) => {
        // console.log(res);
        if (res.length === 0) {
          alert("No Books Found")
          this.allBooksData = [];
          this.hideshow=false
        } else {
          this.allBooksData = this.removeDuplicates(res, ['book_title_name', 'author_name', 'edition', 'volume']);
          console.log(this.allBooksData);

        this.hideshow=true
          const modalElement = this.el.nativeElement.querySelector('#myModal');
          this.renderer.addClass(modalElement, 'show'); // Show the modal
          this.renderer.setStyle(modalElement, 'display', 'block'); // Display the modal
          this.renderer.setStyle(document.body, 'padding-right', '0');
        }


      })
    }else{
      this.allBooksData = [];
      this.hideshow=false
    }
  }


  removeDuplicates(array: any[], keys: string[]): any[] {
    const uniqueMap = new Map<string, any>();
    for (const item of array) {
      const key = keys.map(key => item[key]).join('|');
      // console.log(key);

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    }
    return Array.from(uniqueMap.values());
  }




  closeModal() {
    const modalElement = this.el.nativeElement.querySelector('#myModal');
    this.renderer.removeClass(modalElement, 'show'); // Hide the modal
    this.renderer.setStyle(modalElement, 'display', 'none'); // Hide the modal
    this.renderer.removeStyle(document.body, 'padding-right');
  }






}

