// auth.guard.ts
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AllDataService } from '../Services/all-data.service';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { navPagenames } from '../Models/all-model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,OnInit  {
  currentUrlName:any
  current_url:any
  constructor(private router: Router,private service:AllDataService,private routes:ActivatedRoute) {}
  user_id: any;
  college_id: any;
  actualUrl:any
  beforeLastSegment:any

  ngOnInit(): void {
    this.getFullUrl()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.user_id = sessionStorage.getItem('user_id');
    this.college_id = sessionStorage.getItem('college_id');
    // this.getFullUrl();
  
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Get the actual current URL without URL encoding
        this.current_url = decodeURIComponent(this.router.url);
        this.actualUrl=this.current_url.split('/')
        this.beforeLastSegment=  this.actualUrl[this.actualUrl.length - 2];

        // console.log(this.beforeLastSegment);

        this.service.getAllNavpages(this.user_id).subscribe((res:any)=>{
          // console.log(res);
          const nav_page_names=res.map((item:any)=>item.nav_page_name);
          // console.log(nav_page_names);
          
          if (nav_page_names.includes(this.beforeLastSegment)) {
            return true
          } else {
            this.router.navigate(['Dashboard']);            
            return false;
            // Return false if there's no match
          }
          
        })
        
      }
    });
    
    if (!this.user_id || !this.college_id) {
      return false;
    } else {
      return true;
    }
  }


  getFullUrl(){
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Get the actual current URL without URL encoding
        this.current_url = decodeURIComponent(this.router.url);
        // console.log(this.current_url);
       
        this.actualUrl=this.current_url.split('/').pop()
        
      }
    });
  }
}














// -----------------------15-09-2022-----------------------------------------
// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   const navigationId = route.data['navigationId'];
  //   console.log(navigationId);
  
  
  //   // test
  //   const navigationIdd = state.url.split('/').pop();
  //   console.log(navigationIdd);
  
  //   const user_id = sessionStorage.getItem('user_id');
  
//   if (this.service.isLoggedIn() && user_id) {
//     return this.hasPermissionForNavigation(user_id, navigationId);
//   } else {
  //     this.router.navigate(['/login']);
  //     return of(false);
  //   }
  // }
  
  // private hasPermissionForNavigation(user_id: any, navigationId: any): Observable<boolean> {
    //   return this.service.getAllNavpages(user_id).pipe(
      //     map((res: any) => {
        //       console.log(res);
        //       // Check if the user has permission for the specified navigationId
        //       const hasPermission = res && res.some((navPage: any) => navPage.nav_page_name === navigationId);
        //       return hasPermission;
        //     })
        //   );
        // }
        
        
// -----------------------15-09-2022 end-----------------------------------------
        
        
    // if (!user_id || !college_id || !name) {
    //   return false
    //   alert('You are not authenticated');
    // } 
    // this.service.getAllNavpages(user_id).subscribe((res:any)=>{
    //   console.log(res);
    //   this.navPageModel.navpages= res;

    // })
// console.log(this.navPageModel.navpages);

    // //Get Roles
    // this.service.getUserRoleBYuserID(user_id).subscribe((res:any)=>{
    //   console.log(res[0].user_role);
    //   this.user_role_id=res[0].user_role_id;
    //   console.log(this.user_role_id); 

    //   //get Pages on Role
    //   this.service.getnavigationBasedonRoleandCollegeID(this.user_role_id,college_id).subscribe((navPages:any)=>{
    //     console.log(navPages);
    //     this.navpages=navPages
    //     console.log(this.user_role_id);
        
    //   })
    // })

  // }


// }

  



// this.service.getUserRoleBYuserID(user_id).subscribe((res: any) => {
//   const user_role_id = res[0].user_role_id;
//   const user_role = res[0].user_role;
//   console.log("user role id",user_role);


//   this.service.getnavigationBasedonRoleandCollegeID(user_role_id, college_id).subscribe((navRes: any) => {
//     const navPagesNames = navRes.map((item: any) => item.nav_page_name);
//     // console.log(navPagesNames);

//       const requestedRoute = route.data['roles'];
//       console.log(requestedRoute);
//       const foundRole = requestedRoute.find((role:any) => role === user_role);
//       if(foundRole){
//         return true
//       }else{
//         return false
//         alert('404 This type of URL not Found')
//       }
    
//   });
// });



















  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
  //   if (sessionStorage.getItem('user_id')|| sessionStorage.getItem('name') || sessionStorage.getItem('college_id')) {

  //   this.service.getAllNavpages(sessionStorage.getItem('user_id')).subscribe((res:any)=>{
  //     console.log(res);
      
  //   })

    
  //     return true;
  //   } else {
  //     this.router.navigate(['login']);
  //     alert('You are not authenticated') // Redirect to an unauthorized page or login page
  //     return false;
  //   }
  // }















    

  //   if (userID) {
  //     // Fetch navigation pages based on user ID
  //     return this.service.getAllNavpages(userID).pipe(
  //       map((navpages: any[] | any) => {
  //         if (Array.isArray(navpages)) {
  //           // Check if the user has access to the requested page
  //           if (navpages.some(navpage => navpage.nav_page_name === pageName)) {
  //             return true;
  //           } else {
  //             // Redirect to unauthorized page
  //             return this.router.createUrlTree(['/unauthorized']);
  //           }
  //         } else {
  //           return this.router.createUrlTree(['/unauthorized']);
  //         }
  //       }),
  //       catchError(() => {
  //         // Redirect to unauthorized page
  //         return of(this.router.createUrlTree(['/unauthorized']));
  //       })
  //     );
  //   } else {
  //     // Redirect to login page
  //     this.router.navigate(['login']);
  //     alert('You are not authenticated');
  //     return of(false);
  //   }
  // }
// }

















//grt Current url 

// this.router.events.subscribe((event) => {
//   if (event instanceof NavigationEnd) {
//     // Get the current URL
//     const currentURL = this.router.url;
//     const parts = currentURL.split('/');
//     if (parts.length >= 3) {
//       const afterSecondSlash = parts[2];
//       console.log(afterSecondSlash);
//       // this.service.sendData(afterSecondSlash);
//       this.currentUrlName=afterSecondSlash
//     }
//   }
// });