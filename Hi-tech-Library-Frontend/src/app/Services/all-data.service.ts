import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, retryWhen, take, throwError } from 'rxjs';

@Injectable({
  providedIn: `root`
})
export class AllDataService {
  private data: any;
  // private headers: HttpHeaders;
  apiUrl='http://yourapiurlputhere:5001/api';

  // apiUrl:any=sessionStorage.getItem('url');











  UserRole:any
  parsedUserRoles:any
  constructor(private http:HttpClient) {
    // this.initializeApiUrl();
    sessionStorage.setItem('url',this.apiUrl)
    // this.headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    this.UserRole=localStorage.getItem('userrole');
    this.parsedUserRoles=JSON.parse(this.UserRole)
  
   }

  //  async initializeApiUrl() {
  //   try {
  //     const response: any = await this.http.get('https://api64.ipify.org?format=json').toPromise();
  //     const ipAddress = response.ip;
  //     this.apiUrl = `http://${ipAddress}:8090/api`;
  //     // console.log(this.apiUrl);
      
  //     sessionStorage.setItem('url',this.apiUrl)

  //     // Continue with the rest of your initialization logic

  //   } catch (error) {
  //     console.error('Unable to retrieve public IP address', error);
  //   }
  // }


   isSuperAdmin(): boolean {
    return this.parsedUserRoles.some((role:any) => role.user_role === 'superadmin');
  }
  isStudentOrFaculty(): boolean {
    //  console.log(this.parsedUserRoles);
      return this.parsedUserRoles.some((role: any) => role.user_role === 'Student' || role.user_role === 'Faculty');
    }

  generateRandomId(): string {
    // Function to generate a random UUID-like identifier
    return `x=xxxxxxxxxxxxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 26) | 0,
        v = c === `x` ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }


  



// -----------------------------------------------COLLEGE---------------------------------------------------
  //Add College
  addCollege(data: any) {
    
    return this.http.post(`${this.apiUrl}/addCollege`, data);
  }
  //get All Colleges
  getCollege(id?:any): Observable<any> {
    // 
    if (id) {
    return this.http.get(`${this.apiUrl}/getCollege/`+id);
    }else{
      return this.http.get(`${this.apiUrl}/getCollege`);
    }
  }


  //get Update Colleges
  updateCollege(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updateCollege/` + id,data);
  }
  //get Delete Colleges
  deleteCollege(id:any) {
    
    return this.http.delete(`${this.apiUrl}/delCollege/` + id);
  }
// -----------------------------------------------COURSE---------------------------------------------------
  //Add Course
  addCourse(data: any) {
    
    return this.http.post(`${this.apiUrl}/add/courses`, data);
  }
  //get All Course
  getCourse(id:any) {
    
    return this.http.get(`${this.apiUrl}/get/courses/`+id);
  }

  //get Single Course
  getSingleCourse(id:any) {
    
    return this.http.get(`${this.apiUrl}/coursesSingleData/` +id);
  }
  //get Single Course based on CollegeId
  getSingleCourseBasedOncollege(id:any) {
    
    return this.http.get(`${this.apiUrl}/get_course_data/` +id);
  }

  //get Update Course
  updateCourse(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updt/courses/` + id,data);
  }
  //get Delete Course
  deleteCourse(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/courses/` + id);
  }
// -----------------------------------------------DEPARTMENT---------------------------------------------------
  //Add Department
  adddept(data: any) {
    
    return this.http.post(`${this.apiUrl}/adddepartment/`, data);
  }
  //get All Department
  // getdept(id:any) {
    // 
  //   return this.http.get(`${this.apiUrl}/getdepartment/`+ id);
  // }
  getdept(id?: number): Observable<any> {
    
    if (id) {
      return this.http.get(`${this.apiUrl}/getdepartment/`+ id);
    } else {
      return this.http.get(`${this.apiUrl}/getdepartment`);
    }
  }

  //get Update Department
  updatedept(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updatedepartment/` + id,data);
  }
  //get Delete Department
  deletedept(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deletedepartment/` + id);
  }


  // ===============================Currency================================
   //Add Currency
   addCurrency(data: any) {
    
    return this.http.post(`${this.apiUrl}/addCurrency`, data);
  }
  //get All Currency
  getCurrency(id:any) {
    
    return this.http.get(`${this.apiUrl}/getCurrency/`+id);
  }

  //get Update Currency
  updCurrency(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updateCurrency/` + id,data);
  }
  //get Delete Currency
  delCurrency(id:any) {
    
    return this.http.delete(`${this.apiUrl}/delCurrency/` + id);
  }
  // ===============================Fine policy================================
   //Add Fine policy
   addFinePolicy(data: any) {
    
    return this.http.post(`${this.apiUrl}/addFinePolicy/`, data);
  }
  //get All Fine policy
  getFinePolicy(id:any) {
    
    return this.http.get(`${this.apiUrl}/getFinePolicy/`+id);
  }

  //get Update Fine policy
  updFinePolicy(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updateFinePolicy/` + id,data);
  }
  //get Delete Fine policy
  delFinePolicy(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deleteFinePolicy/` + id);
  }
  //get Delete Fine policy
  updateStatusFinepolicy(id:any) {
    
    return this.http.get(`${this.apiUrl}/update_status_finepolicy/` + id);
  }
  // ===============================Add Signature================================
   //Add Signature
   addSignature(data: any) {
    
    return this.http.post(`${this.apiUrl}/add_authorised_signature/`, data);
  }
   //edit Signature
   EditSignature(college_id: any) {
    
    return this.http.get(`${this.apiUrl}/edit_authorised_signature/`+college_id);
  }

  GetSignature(college_id: any) {
    
    return this.http.get(`${this.apiUrl}/get_authorised_signature/`+college_id);
  }
   //Update Signature
   updateSignature(id: any,data:any) {
    
    return this.http.post(`${this.apiUrl}/update_authorised_signature/`+id,data);
  }
  //get All Signature
  getSignature(id:any) {
    
    return this.http.get(`${this.apiUrl}/getFinePolicy/`+id);
  }

  //get Update Signature
  updSignature(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updateFinePolicy/` + id,data);
  }
  //get Delete Signature
  delSignature(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deleteFinePolicy/` + id);
  }
  //get Delete Signature
  updateStatusSignature(id:any) {
    
    return this.http.get(`${this.apiUrl}/update_status_finepolicy/` + id);
  }

  // ==================================User Role========================
   //Add User Role
   addUserRole(data: any) {
    
    return this.http.post(`${this.apiUrl}/adduserrole/`, data);
  }
  //get All User Role
  getUserRole(id:any) {
    
    return this.http.get(`${this.apiUrl}/getuserrole/`+ id);
  }

  //get Update User Role
  updUserRole(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updateuserrole/` + id,data);
  }
  //get Delete User Role
  delUserRole(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deleteuserrole/` + id);
  }
  // ==================================Issue Type========================
   //Add Issue Type
   addIssueType(data: any) {
    
    return this.http.post(`${this.apiUrl}/addisuetype/`, data);
  }
  //get All Issue Type
  getIssueType(id:any) {
    
    return this.http.get(`${this.apiUrl}/getissuetype/` +id);
  }

  //get Update Issue Type
  updIssueType(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updateissuetype/` + id,data);
  }
  //get Delete Issue Type
  delIssueType(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deleteissuetype/` + id);
  }
  // ==================================Issue Policy========================
   //Add Issue Policy
   addIssuePolicy(data: any) {
    
    return this.http.post(`${this.apiUrl}/addisuepilicies`, data);
  }
  //get All Issue Policy
  getIssuePolicy(id:any) {
    
    return this.http.get(`${this.apiUrl}/getissuepolicies/`+id);
  }

  //get Update Issue Policy
  updIssuePolicy(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updateisuepilicies/` + id,data);
  }
  //get Delete Issue Policy
  delIssuePolicy(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deleteisuepilicies/` + id);
  }
  // ==================================Vendors========================
   //Add Vendors
   addVendors(data: any) {
    
    return this.http.post(`${this.apiUrl}/addvender`, data);
  }
  //get All Vendors
  getVendors(id:any) {
    
    return this.http.get(`${this.apiUrl}/getvenders/` + id);
  }

  //get Update Vendors
  updVendors(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updatevender/` + id,data);
  }
  //get Delete Vendors
  delVendors(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deletevender/` + id);
  }
  // ==================================Publishers========================
   //Add Publishers
   addPublishers(data: any) {
    
    return this.http.post(`${this.apiUrl}/addpublisher`, data);
  }
  //get All Publishers
  getPublishers(id:any) {
    
    return this.http.get(`${this.apiUrl}/getpublisher/`+id);
  }

  //get Update Publishers
  updPublishers(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updatepublisher/` + id,data);
  }
  //get Delete Publishers
  delPublishers(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deletepublisher/` + id);
  }
  // ==================================Authors========================
   //Add Authors
   addAuthors(data: any) {
    
    return this.http.post(`${this.apiUrl}/add/author`, data);
  }
  //get All Authors
  getAuthors(id:any) {
    
    return this.http.get(`${this.apiUrl}/get/author/`+ id);
  }

  //get Update Authors
  updAuthors(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updt/author/` + id,data);
  }
  //get Delete Authors
  delAuthors(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/author/` + id);
  }
   //Add Doctype
   adddocumentType(data: any) {
    
    return this.http.post(`${this.apiUrl}/adddocumenttype`, data);
  }
  //get All Doctype
  getdocumentType(id:any) {
    
    return this.http.get(`${this.apiUrl}/getdocumenttype/`+id);
  }

  //get Update Doctype
  upddocumentType(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updatedocumenttype/` + id,data);
  }
  //get Delete Doctype
  deldocumentType(id:any) {
    
    return this.http.delete(`${this.apiUrl}/deletedocumenttype/${id}`);
  }
  // ==================================Bill Details========================
   //Add Bill Details
   addBillDetails(data: any) {
    
    return this.http.post(`${this.apiUrl}/add/bill_details`, data);
  }
  //get All Bill Details
  getBillDetails(id:any) {
    
    return this.http.get(`${this.apiUrl}/get/bill_details/${id}`);
  }

  getBillDetailsByVendorAndClg(vendorID:any,ClgID:any) {
    
    return this.http.get(`${this.apiUrl}/get_bill_by_vendor/${vendorID}/${ClgID}` );
  }

  //get Update Bill Details
  updBillDetails(id:any,data:any) {
    
    return this.http.post(`${this.apiUrl}/updt/bill_details/${id}`,data);
  }
  //get Delete Bill Details
  delBillDetails(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/bill_details/${id}`);
  }
// ==================================bOOK tITLE========================
  //Add bOOK tITLE
   addBookTitles(data: any) {
    
    return this.http.post(`${this.apiUrl}/add/book_ttl`, data);
  }
  //get All bOOK tITLE
  getBookTitles(clgid:any) {
    
    return this.http.get(`${this.apiUrl}/get/book_ttl/${clgid}`);
  }
  //get Update bOOK tITLE
  updBookTitles(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updt/book_ttl/${id}`,data);
  }
  //get Delete bOOK tITLE
  delBookTitles(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/book_ttl/${id}`);
  }

// ==================================Location========================
   //Add Location
   addLocation(data: any) {
    
    return this.http.post(`${this.apiUrl}/add/book_loc`, data);
  }
  //get All Location
  getLocation(id:any) {
    
    return this.http.get(`${this.apiUrl}/get/book_loc/${id}`);
  }

  //get Update Location
  updLocation(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updt/book_loc/${id}`,data);
  }
  //get Delete Location
  delLocation(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/book_loc/${id}`);
  }
// ==================================Document Type========================
   //Add Document Type
   addDocType(data: any) {
    
    return this.http.post(`${this.apiUrl}/adddocumenttype`, data);
  }
  //get All Document Type
  getDocType(id:any) {
    
    return this.http.get(`${this.apiUrl}/getdocumenttype/${id}`);
  }

  //get Update Document Type
  updDocType(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updatedocumenttype/${id}`,data);
  }
  //get Delete Document Type
  delDocType(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/book_loc/${id}`);
  }
// ==================================Navigation Pages========================
   //Add Document Type
   addnavPage(data: any) {
    
    return this.http.post(`${this.apiUrl}/add/nav_page`, data);
  }
  //get All Document Type
  getnavPage() {
    
    return this.http.get(`${this.apiUrl}/get/nav_page`);
  }

  //get Update Document Type
  updnavPage(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updt/nav_page/` + id,data);
  }
  //get Delete Document Type
  delnavPage(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/nav_page/` + id);
  }

//---------------------------CATALOGUING----------------------------------------------

 //get Books Location
 getAllBooks(id:any) {
  
  // return this.http.get(`${this.apiUrl}/view_all_books`);
  return this.http.get(`${this.apiUrl}/getBook/` + id);
}
 //get Books Location
 addAllBooks(data:any) {
  
  return this.http.post(`${this.apiUrl}/addBook`,data);
}
 //get Books Last Accession no
 getLastAccessionNo(college_id:any) {
  
  return this.http.get(`${this.apiUrl}/last_accession_number/${college_id}`);
}

 //get All Password
 getUserandPassword() {
  
  return this.http.get(`${this.apiUrl}/wsp`);
}

// getAllPasswords(collegeId?: any): Observable<any> {
//   const url = collegeId ? `${this.apiUrl}/wsp?college_id=${collegeId}` : `${this.apiUrl}/password_list`;
//   return this.http.get(url);
// }


getAllUsers(libraryCard:any){
  
  return this.http.get(`${this.apiUrl}/maximum_book/`+ libraryCard)
}

getIssudeBookstouserInnum(libraryCard:any){
  
  return this.http.get(`${this.apiUrl}/issued_book/`+ libraryCard)
}
getemployees(){
  
  return this.http.get(`${this.apiUrl}/view_employee`)
}


//Login API using email and password
 //get Books Location
 LibraryLogin(data:any) {
  return this.http.post(`${this.apiUrl}/login`,data);
}
getAllNavpages(id: any): Observable<any> {
  
  return this.http.get(`${this.apiUrl}/navigation_page_name/` + id).pipe(
    retryWhen((errors:any) =>
      errors.pipe(
        // Retry only when a 429 status code is received
        catchError((error: any) => {
          if (error.status === 429) {
            const retryAfter = parseInt(error.headers.get('Retry-After')) || 5; // Default to a 5-second delay
            console.log(`Received 429 error. Retrying after ${retryAfter} seconds...`);
            return throwError(error).pipe(delay(retryAfter * 1000));
          }
          return throwError(error);
        }),
        take(3)
      )
    )
  );

}

GetuserDatabasedonID(id:any){
  
  return this.http.get(`${this.apiUrl}/edituser/${id}`)
}


//GetAllusers id and Password

getAllIDPassword(){
  
  return this.http.get(`${this.apiUrl}/wsp`)
}

//GetAllusers id and Password

getAllPasswords(collegeId?: any): Observable<any> {
  
  const url = collegeId ? `${this.apiUrl}/wsp?college_id=${collegeId}` : `${this.apiUrl}/wsp`;
  return this.http.get(url);
}



// =============================User Management========================================

//student registration
stuEmpRegistration(stdata:any){
  
  return this.http.post(`${this.apiUrl}/adduser`,stdata);
}

viewCollege(){
  
  return this.http.get(`${this.apiUrl}/getCollege`)
}
viewCourse(college_id:any){
  
  return this.http.get(`${this.apiUrl}/get_course_data/` +college_id)
}
viewDepartment(cour_id:any){
  
  return this.http.get(`${this.apiUrl}/get_dept_data/` +cour_id)
}
studentUserIdonly(college_id:any){
  
  return this.http.get(`${this.apiUrl}/student_role_id/`+college_id)
}
exceptStdAdm(college_id:any){
  
  return this.http.get(`${this.apiUrl}/without_std_admin/`+college_id)
}

//Assign navigation
assignNav(data:any){
  
  console.log(typeof data);
  return this.http.post(`${this.apiUrl}/add/assign_nav`,data);
}

 //delete Assignnav all
 deleteAll_nav(id:any) {
    
  return this.http.delete(`${this.apiUrl}/delete_all_navigations/` + id);
}


AllUserRole(college_id:any){
  
  return this.http.get(`${this.apiUrl}/getuserrole/`+college_id);
}
navPage(){
  
  return this.http.get(`${this.apiUrl}/get/nav_page`)
}
searchAssignNav(id:any){
  
  return this.http.get(`${this.apiUrl}/search/search_nav/`+id)
}
deleteAssignNav(id:any){
  
  return this.http.delete(`${this.apiUrl}/del/assign_nav/`+id)
}


//Assign role
getEmpRole(college_id:any){
  
  return this.http.get(`${this.apiUrl}/employee_details_with_college_id/`+ college_id);
}

assignRole(data:any){
  
return this.http.post(`${this.apiUrl}/add/assign_role`,data);
}

fetChIndassignrole(user_id:any){
  
return this.http.get(`${this.apiUrl}/name_role_assignrole/`+ user_id);
}

deleteAssignrole(id:any,user_id:any){ 
  return this.http.delete(`${this.apiUrl}/del/assign_role/`+id +'/'+user_id);
  }


//View User
viewStdOnly(college_id:any){
  
  return this.http.get(`${this.apiUrl}/view_student/`+college_id);
}

viewEmpOnly(college_id:any){
  
  return this.http.get(`${this.apiUrl}/view_employee/`+college_id);
}

deleteUser(data:any){
  
  return this.http.delete(`${this.apiUrl}/deleteuser/`+data);
}

updateUser(data:any){
  
  return this.http.post(`${this.apiUrl}/updateuser`,data);
}
updateStatusSession(id:any){
  
  // console.log(id);

  return this.http.get(`${this.apiUrl}/update_status/`+ id)
}


// user profile
getUserProfile(user_id:any){
  
  return this.http.get(`${this.apiUrl}/get_user_profile/${user_id}`);
}

getUserProfilewithcollegewisewithsignature(user_id:any,college_id:any){
  
  return this.http.get(`${this.apiUrl}/get_user_profile/`+user_id+'/'+college_id);
}

// change password
changePassword(cpModel:any){
  
  return this.http.post(`${this.apiUrl}/change_password`,cpModel);
}

//STD_EMP ISSUE
BookIssue(data:any){
  
  return this.http.post(`${this.apiUrl}/std_emp_book_issue`,data);
  }
//DEPT ISSUE
DeptBookIssue(data:any){
  
  return this.http.post(`${this.apiUrl}/department_book_issue`,data);
  }
// DEPT_ISSUE
getDeptBasedOnClgandCourse(clgID:any,CourseID:any) {
  
  return this.http.get(`${this.apiUrl}/find_dept_id/` +clgID + `/` +CourseID);
}
getLibraryCardNobasedOnclg(clgID:any) {
  
  return this.http.get(`${this.apiUrl}/library_card_list/` +clgID);
}

getAllusersdata(libraryCard:any){
  
  return this.http.get(`${this.apiUrl}/user_dtls_LibCardNo/` + libraryCard)
}




//Return Books
getissuedBooksbasedonLibraryCard(libCard:any){
  
  return this.http.get(`${this.apiUrl}/bookreturn_search/`+libCard);
}
getissuedBooksbasedonaccesion_no(accession_no:any){
  
  return this.http.get(`${this.apiUrl}/user_data_based_on_accession_number/`+accession_no);
}

//getIssuedBooksforFinecollectionbased on library card
getIssuedBookDataByLibCardno(libCardNumber: any){
  
  return this.http.get(`${this.apiUrl}/issued_books_accession_number/`+libCardNumber)
}

BookReturn(data:any){
  
  return this.http.post(`${this.apiUrl}/book_return`,data);
}

FineCollectionn(data:any){
  
  return this.http.post(`${this.apiUrl}/addFinecollection`,data)
}
getFineAmountForIndivialAccessionNo(libCrd:any,acs_no:any){
  
  return this.http.get(`${this.apiUrl}/book_fine_collection/`+libCrd + '/'+ acs_no)
}



//edit user updateBookIndividual
getDataeditModel(college_id:any){
  
  return this.http.get(`${this.apiUrl}/getBook/`+ college_id);
 }

 getTitle(college_id:any){
  
  return this.http.get(`${this.apiUrl}/get/book_ttl/`+ college_id);
 }

 getAuthor(college_id:any){
  
  return this.http.get(`${this.apiUrl}/get/author/`+college_id)
 }

 getPublisher(college_id:any){
  
  return this.http.get(`${this.apiUrl}/publisher_by_clgid/`+college_id)
 }

//  getCurrency(college_id:any){
//   return this.http.get(`${this.apiUrl}/getCurrency/`+college_id)
//  }

 getVendor(college_id:any){
  
  return this.http.get(`${this.apiUrl}/getvenders/`+college_id)
 }

 getDoc(college_id:any){
  
  return this.http.get(`${this.apiUrl}/getdocumenttype/`+college_id)
 }

 getBill(college_id:any){
  
  return this.http.get(`${this.apiUrl}/get/bill_details/`+college_id)
 }

//  getLocation(college_id:any){
//   return this.http.get(`${this.apiUrl}/get/book_loc/`+college_id)
//  }

 deleteBookIndvidual(id:any){
  
  return this.http.delete(`${this.apiUrl}/deleteBook/`+id);
 }

 updateBookIndvidual(data:any){
  
  return this.http.post(`${this.apiUrl}/updateBook`,data);
 }
 updateBookGroup(data:any){
  
  return this.http.post(`${this.apiUrl}/multiple_book_update`,data);
 }


 //view book
viewBookTransaction(college_id:any){
  
  return this.http.get(`${this.apiUrl}/total_book_status/`+college_id);
  // return this.http.get(`${this.apiUrl}/book_transactionhistory/`+college_id);
 }
 viewBookTransactionCollege(college_id:any,date:any){
  
  return this.http.get(`${this.apiUrl}/total_book_status_search/`+college_id+`/`+date);
 }


 //Report Section

 bookStockReport(cid:any){
  
  return this.http.get(`${this.apiUrl}/book_stock_report/`+cid)
}

userLogReport( cid:any, fdate:any, tdate:any){
  
  return this.http.get(`${this.apiUrl}/log_details/${cid}/${fdate}/${tdate}`);

}


bookListReport(cid:any){
  
  return this.http.get(`${this.apiUrl}/booklist_report/${cid}`)
}


bookListReportByAccNo(cid:any,acc1:any,acc2:any){
  
  return this.http.get(`${this.apiUrl}/searchaccNo/${cid}/${acc1}/${acc2}`)
}

// getTitle(cid:any){
//   return this.http.get(`${this.apiUrl}/get/book_ttl/`+cid)
// }

bookTitleReport(cid:any){
  
  return this.http.get(`${this.apiUrl}/title_wise_report/${cid}`)
}

bookTitleSearch(cid:any,title:any){
  
  return this.http.get(`${this.apiUrl}/title_wise_report_search/${cid}/${title}`)
}


bookCollegewiseReport(cid:any){
  
  return this.http.get(`${this.apiUrl}/book_report_clg_wise/`+cid);
}

bookCollegewiseSearch(cid:any, title:any){
  
  return this.http.get(`${this.apiUrl}/book_report_clg_wise_search/${cid}/${title}`);
}



getUserRoleBYuserID(userID:any){
  
  return this.http.get(`${this.apiUrl}/get_roles_by_id/`+userID);
}


//for Dashboard
private dataSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

sendData(data: string): void {
  // 
  this.dataSubject.next(data);
}

getData(): Observable<string | null> {
  // 
  return this.dataSubject.asObservable();
}


getindividualBooksByAccessionNO(clg_id:any,accno:any){
  
  return this.http.get(`${this.apiUrl}/ind_book_by_accno/`+clg_id+`/`+accno);
}

getBook(cid:any){
  
  return this.http.get(`${this.apiUrl}/getBook/`+cid)
}

getallAccessionNo(clg_id:any){
  
  return this.http.get(`${this.apiUrl}/getBook/`+clg_id);
}

getFineCollectionReport(clg_id:any){
  

  return this.http.get(`${this.apiUrl}/fine_collection_report/`+clg_id);
}

getFineCollectionReportSearch(clg_id:any,LIB:any){
  

  return this.http.get(`${this.apiUrl}/search_fine/`+clg_id+`/`+LIB);
}






bookTransReport(cid:any,fdate:any,tdate:any){
  
  return this.http.get(`${this.apiUrl}/book_trans_search_report/`+cid+ `/` + fdate + `/` + tdate)
}


//View All Books

SearchCollege(data:any){
  
  return this.http.get(`${this.apiUrl}/searchCollege/` + data);
}



SearchBookTitle(data:any,cid:any){
  
  return this.http.get(`${this.apiUrl}/book_title/`+ data+ `/`+cid);
}

SearchByAuthor(cid:any,data:any){
  
  return this.http.get(`${this.apiUrl}/author/` +cid+ `/`+data);
}

SearchAccessionNo(acession_no:any,clg_id:any){
  
  return this.http.get(`${this.apiUrl}/accession_no/` +acession_no +'/'+clg_id);
}

SearchByKeyword(data:any){
  
  return this.http.get(`${this.apiUrl}/keyword/` +data);
}

SearchTitleAuthor(cid:any,tname:any,aname:any){
  
  return this.http.get(`${this.apiUrl}/view_book/` +cid +`/`+tname+`/`+aname);
}
FetchBook(clgid:any){
  
  return this.http.get(`${this.apiUrl}/view_all_books/`+clgid);
}
EditBookById(accession_no:any){
  
  return this.http.get(`${this.apiUrl}/single_book_data_accession/` + accession_no);
}



//ViewFineCollection
FetchViewFineCollection(clg_id:any){
  
  return this.http.get(`${this.apiUrl}/viewfine_collection/` + clg_id);
}

//User-Book-Transaction-History
FetchBookTransactionHstry(user_id:any){
  
  return this.http.get(`${this.apiUrl}/book_transactionhistory/`+user_id);
}



//bookReport Department Wise

getDept(cid:any){
  
  return this.http.get(`${this.apiUrl}/getdepartment/`+cid);
}

bookDeptWiseReport(dept_id:any,cid:any){
  
  return this.http.get(`${this.apiUrl}/book_report_department_wise/`+dept_id+`/`+cid)
}

bookDeptWiseSearch(cid:any,dept_name:any){
  
  return this.http.get(`${this.apiUrl}/book_report_department_wise_search/`+cid+`/`+dept_name)
}



 // department wise cataloging report

 getBookByDept(cid:any,dept:any){
  
  return this.http.get(`${this.apiUrl}/book_by_dept/`+cid+`/`+dept)
}

//Logdetails
 addLogdetails(data:any){
  
  return this.http.post(`${this.apiUrl}/addlogdetails`,data)
}

getuserLogDetails(){
  
  return this.http.get(`${this.apiUrl}/getlogdetails/`)

}

//getNavigation Based on role_id and College_id
getnavigationBasedonRoleandCollegeID(roleID:any,clg_id:any){
  
  return  this.http.get(`${this.apiUrl}/search_nav_by_roleidclgid/` +roleID+`/`+clg_id)
}


//test
isLoggedIn() {
  // 
  return !!sessionStorage.getItem(`user_id`) && !! sessionStorage.getItem(`college_id`)

}




 // book status report

 BookStatus(cid:any){
  
  return this.http.get(`${this.apiUrl}/status_by_clgid/`+cid);
}

BookStatusReport(status:any,cid:any){
  
  return this.http.get(`${this.apiUrl}/book_report_statuswise/`+status+`/`+cid);
}

//User details report
getUserDetailsReport(cid:any, ud:any){
  
  return this.http.get(`${this.apiUrl}/user_details_report/`+cid+`/`+ud);
}


//get book report based on author and publisher
getBooksBasedOnAuther_Publisher(cid:any,Auth_Publish:any){
  
  return this.http.get(`${this.apiUrl}/search_author_publisher/`+cid+`/`+Auth_Publish);
}




//Book Reservation
//Book_reservation
getBookTitleonly(college_id:any,title:any){
  
  return this.http.get(`${this.apiUrl}/book_title_search/`+title+`/`+college_id)
 }

 getBookAuthoronly(college_id:any,auth:any){
  
  return this.http.get(`${this.apiUrl}/author_search/`+college_id+`/`+auth)
 }

 getBookAuthororTitle(college_id:any,auth:any){
  
  return this.http.get(`${this.apiUrl}/author_search/`+college_id+`/`+auth)
 }

 SearchTitleAuthors(cid:any,tname:any,aname:any){
  
  return this.http.get(`${this.apiUrl}/view_book_tas/` +cid +`/`+tname+`/`+aname);
}

SearchTitleAuthorVol(title:any,author:any,volume:any,college_id:any){
  
  return this.http.get(`${this.apiUrl}/view_book_on_tavc/` +title +`/`+author+`/`+volume+`/`+college_id);
}
keyWordSearch(keyword:any,college_id:any){
  
  return this.http.get(`${this.apiUrl}/view_book_on_kc/`+keyword+`/`+college_id);
}

issueType(college_id:any){
  
  return this.http.get(`${this.apiUrl}/issuetype_by_clg_id/`+college_id)
}

maxNo(user_id:any,issue_type_id:any){
  
  return this.http.get(`${this.apiUrl}/max_book/`+user_id+`/`+issue_type_id)
}
isuRtnBook(user_id:any,issue_type_id:any){
  
  return this.http.get(`${this.apiUrl}/issued_request_book/`+user_id+`/`+issue_type_id)
}

// getUserRoleBYuserID(userID:any){
//   return this.http.get(`${this.apiUrl}/get_roles_by_id/`+userID);
// }

sendBookreq(data:any){
  
  return this.http.post(`${this.apiUrl}/book_request`,data);
}






// User wise Book Report

UserwiseBook(cid:any,lib:any){
  
  return this.http.get(`${this.apiUrl}/book_by_lib/`+cid+`/`+lib);
}

//Book Cost Report
getBookDetails(cid:any){
  
  return this.http.get(`${this.apiUrl}/book_cost_report/`+cid);
}

BookCostReport(cid:any,dept:any){
  
  return this.http.get(`${this.apiUrl}/book_cost_report_search/`+cid+`/`+dept);
}


//user-Book requests
BkRqstDtls(clg_id:any){
  
  return this.http.get(`${this.apiUrl}/book_request_dtls/` +clg_id);
}

RequestedBookIssue(data:any){
  
  return this.http.post(`${this.apiUrl}/approve_book_request`,data);
}

  //Book Issue Report Department Wise
  getbookDepartmentWise(clg_id:any,dpt_id:any){
    
    return this.http.get(`${this.apiUrl}/dept_issue_report/`+clg_id+`/`+dpt_id)
  }
  //Book Issue Report Issue Type Wise

  getbookdataIssueTypeWise(iss:any){
    
    return this.http.get(`${this.apiUrl}/issues/`+iss)
  }
  //GetSingleCollege

  getSingleCollege(id:any){
    
    return this.http.get(`${this.apiUrl}/editCollege/`+id)
  }

  getBookAccessionNoRange(accession_no_from: any, accession_no_to: any,college_id:any) {
    
    return this.http.get(`${this.apiUrl}/book_dtls_in_accs_no_range/${accession_no_from}/${accession_no_to}/${college_id}`);
  }




  //Graphs
// getBookStatistics
getBookStatistics(clg_id:any){
  
  // return this.http.get(`${this.apiUrl}/issue_available_book_list/${clg_id}`);
  return this.http.get(`${this.apiUrl}/all_details_data/${clg_id}`);
}
//getUniqueBooks
getUniqueBooks(college_id:any){
  
  return this.http.get(`${this.apiUrl}/unique/${college_id}`);
}


//getReportQuantityWise
getbookReportQuantitywise(clg_id:any){
  
  return this.http.get(`${this.apiUrl}/quantity/${clg_id}`);
}

getbookReportTitleQuantitywise(clg_id:any,title:any){
  
  return this.http.get(`${this.apiUrl}/title_quantity/${clg_id}/${title}`);
}




//bookTransaction report on user
bookTranOnuserLib(college_id:any,LibCard_no:any){
  
  return this.http.get(`${this.apiUrl}/book_trans_by_user/${college_id}/${LibCard_no}`)
}



//All library card
allLibcard(year:any,depart_id:any){
  
  return this.http.get(`${this.apiUrl}/libraryCard_list/${year}/${depart_id}`)
}



///Department-Book-Return
getAccessionNoIssuedtoDEPT(college_id:any){
  
  return this.http.get(`${this.apiUrl}/accNo/${college_id}`)

}

getUserDataforReturntoDEPTbyAccessionNO(college_id:any,accesion_no:any){
  
  return this.http.get(`${this.apiUrl}/return_book_by_accNo/${college_id}/${accesion_no}`)
}
getUserDataforReturntoDEPTbydeptID(college_id:any,dept_id:any){
  
  return this.http.get(`${this.apiUrl}/return_book_by_dept/${college_id}/${dept_id}`)
}


 // ===============================SUBJECT================================
   //Add Subject
   addSubject(data: any) {
    
    return this.http.post(`${this.apiUrl}/add/subject`, data);
  }
  //get All Subject
  getSubject(clgid:any) {
    
    return this.http.get(`${this.apiUrl}/get/subject/`+clgid);
  }

  //get Update Subject
  updSubject(id:any,data:any) {
    
    return this.http.put(`${this.apiUrl}/updt/subject/` + id,data);
  }
  //get Delete Subject
  delSubject(id:any) {
    
    return this.http.delete(`${this.apiUrl}/del/subject/` + id);
  }

  // subject

getSub(cid:any){
  return this.http.get(`${this.apiUrl}/get/subject/`+cid);
}


//bookReport Subject Wise

bookSubWiseReport(sub_id:any,cid:any){
  return this.http.get(`${this.apiUrl}/book_report_subject_wise/`+sub_id+`/`+cid,
)
}

bookSubWiseSearch(cid:any,sub_name:any){
  return this.http.get(`${this.apiUrl}/book_report_subject_wise_search/`+cid+`/`+sub_name,
)
}

 // subject wise cataloging report

 getBookBySub(cid:any,sub:any){
  return this.http.get(`${this.apiUrl}/book_by_subject/`+cid+`/`+sub,
)
}





  //==========================================new area for up date book======================================//
  serachTitle(data:any,colle:any){
    return this.http.get(`${this.apiUrl}/search_title_clgid/${colle}/${data}`);
  }
  
  serachPublisher(colle:any,data:any){
    return this.http.get(`${this.apiUrl}/publisher_search/${colle}/${data}`);
  }

  serachVendor(colle:any,data:any){
    return this.http.get(`${this.apiUrl}/vendor_search/${colle}/${data}`);
  }

  searchBill(colle:any,data:any){
    return this.http.get(`${this.apiUrl}/bill_search/${colle}/${data}`);
  }

  searchSubject(colle:any,data:any){
    return this.http.get(`${this.apiUrl}/subject_search/${colle}/${data}`);
  }



  updateLibraryCard(id: any, data: any) {  
    return this.http.patch(`${this.apiUrl}/usersUpdate/${id}`, data);
}
}
