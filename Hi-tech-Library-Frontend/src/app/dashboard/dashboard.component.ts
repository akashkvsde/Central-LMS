import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AllDataService } from '../Services/all-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  imgpath: any;
  loginid: any;
  navpagesName: any[] = [];
  username: any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AllDataService
  ) {
    this.user_id = sessionStorage.getItem('user_id');
    this.college_id = sessionStorage.getItem('college_id');
   }
  college_id: any
  user_id: any
  random: any;
  current_url: any
  isSuperAdmin:any;
  ngOnInit() {

    this.username = sessionStorage.getItem('name');
    this.isSuperAdmin= this.service.isSuperAdmin()
    // this.route.queryParams.subscribe(params => {
    //   if (params['userID']) {
    //     this.loginid = params['userID'];
    //     this.getNavigations();
    //   }
    // });
    this.getCollegeDropDown();
    this.getNavigations()
    this.getUserDataBasedonID()
    this.getUserImage()


    //Url Changing ----------------------Start
    this.random = this.service.generateRandomId()

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the actual current URL without URL encoding
        this.current_url = decodeURIComponent(this.router.url);
        // console.log(this.current_url);

        const urlSegments = this.current_url.split('/');
        const beforeLastSegment: string = urlSegments[urlSegments.length - 2];

        // console.log(beforeLastSegment);


      }
    });



    // -----------------------------------End----------------
    let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();

        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');

        this.imgpath = `${baseUrl}/studentphoto/`;

        console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }
  }

  navigateWithRandomId(routePath: string) {
    this.router.navigate([routePath, this.random]);
    // console.log( this.router.navigate([routePath, this.random]));

  }



  getNavigations() {
    let userId = sessionStorage.getItem('user_id');
    if (userId) {
      this.service.getAllNavpages(userId).subscribe((res: any) => {
        // Your logic to filter and set navigation pages
        // console.log(res);

        this.navpagesName = res;
      });
    } else {
      alert('User Not authenticated');
      sessionStorage.clear();
      this.router.navigateByUrl('login');
    }
  }

  getUserDataBasedonID() {
    this.service.GetuserDatabasedonID(this.user_id).subscribe((res: any) => {
      // console.log(res);
      // this.username=res[0].name

    })
  }

  isPagePresent(pageName: string): boolean {
    return this.navpagesName.some((page: any) => page.nav_page_name === pageName);
  }

  sbNavFixed: boolean = true;

  toggleSidenav() {
    this.sbNavFixed = !this.sbNavFixed;
  }

  @HostListener('window:keydown.control.b', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault(); // Prevent default browser behavior
    this.toggleSidenav();
  }

  Logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login')
  }

  userImage: any
  getUserImage() {
    if (this.user_id) {
      this.service.getUserProfile(this.user_id).subscribe((res: any) => {
        // console.log(res);
        this.userImage = res[0]

      },(err:any)=>{
        console.log(err);

      })
    }


  }


  back(){
    window.history.back();
    // this.sbNavFixed = !this.sbNavFixed;

  }
  sack(){
    //  this.sbNavFixed = !this.sbNavFixed;
    window.history.forward();
  }


  clgData: any[] = [];
  collegeChangeID:any;
  getCollegeDropDown() {
    this.service.getCollege().subscribe((res: any) => {
      this.clgData = res;

      // Retrieve the stored college_id from session storage
      const storedCollegeId = sessionStorage.getItem('college_id');

      // If college_id is stored, set it as the selected value
      if (storedCollegeId) {
        this.collegeChangeID = storedCollegeId;
      }
    });
  }

  onCollegeChange(selectedCollege: any) {
    this.collegeChangeID = selectedCollege.target.value;
    
    sessionStorage.setItem('college_id', this.collegeChangeID);
    location.reload();
  }


}






