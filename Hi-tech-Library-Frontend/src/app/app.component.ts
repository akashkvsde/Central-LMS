import { Component,HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AllDataService } from './Services/all-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hi_tech_library_project';
  process: any
  user_id: any
  random: any;
  current_url:any
  constructor(private service: AllDataService, private router: Router) { }
  isInspectDisabled: boolean = true;
  ngOnInit(): void {
    // console.clear()
    this.user_id = sessionStorage.getItem('user_id')
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the current URL
        const currentURL = this.router.url;
        const parts = currentURL.split('/');
        if (parts.length >= 3) {
          const afterSecondSlash = parts[2];
          const decodedValue = decodeURIComponent(afterSecondSlash); // Decode the URL parameter
          console.log(decodedValue);
          this.addLodata()
          this.process = decodedValue;
          // this.service.sendData(decodedValue);
        }
      }
    });
  
    // this.service.getData().subscribe((data) => {
    //  console.log(data);
    // });
  
    // this.getIP(); 
  }

  
//   @HostListener('contextmenu', ['$event'])
// onContextMenu(event: MouseEvent): void {
//   event.preventDefault();
// }

// @HostListener('document:keydown', ['$event'])
// onKeyPress(event: KeyboardEvent): void {
//   if (event.keyCode == 123) { // F12 key
//     event.preventDefault();
//     // alert('F12 is disabled');
//   }else if (event.ctrlKey && event.keyCode === 85) {
//     event.preventDefault();
//     // alert('Ctrl+U is disabled');
//   } else if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
//     event.preventDefault();
//     // alert('Ctrl+Shift+C is disabled');
//   } else if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
//     event.preventDefault();
//     // alert('Ctrl+Shift+I is disabled');
//   }  else if (event.ctrlKey && event.shiftKey && event.keyCode === 74) {
//     event.preventDefault();
//     // alert('Ctrl+Shift+J is disabled');
//   }else if (event.keyCode === 116) {
//     event.preventDefault();
//     // alert('F5 is disabled');
//   } else if (event.ctrlKey && event.shiftKey && event.keyCode === 82) {
//     event.preventDefault();
//     // alert('Ctrl+Shift+R is disabled');
//   } else if (event.shiftKey && event.keyCode === 116) {
//     event.preventDefault();
//     // alert('Shift+F5 is disabled');
//   }
// }
  pagename: any


  // ipAddress:any; 


  // getIP()  
  // {  

  //   let a="<?php $localip=getHostByName(php_uname('n'));?>"
  //   console.log(a);

  //   // this.service.getIPAddress().subscribe((res:any)=>{  
  //   //   this.ipAddress=res.ip;  
  //   //   console.log(this.ipAddress);

  //   // });  
  // }  



  addLodata() {
    if (this.user_id && this.process) {
      const formData = new FormData();
      formData.append('process', this.process);
      formData.append('user_id', this.user_id);
      this.service.addLogdetails(formData).subscribe((res: any) => {
        // console.log(res);
      })
    }
  }
}
