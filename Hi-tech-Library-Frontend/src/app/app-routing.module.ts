import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCollegeComponent } from './Configuration/add-college/add-college.component';
import { AddCourseComponent } from './Configuration/add-course/add-course.component';
import { AddDepartmentComponent } from './Configuration/add-department/add-department.component';
import { AddCurrencyComponent } from './Configuration/add-currency/add-currency.component';
import { AddFinePolicyComponent } from './Configuration/add-fine-policy/add-fine-policy.component';
import { AddIssueTypeComponent } from './Configuration/add-issue-type/add-issue-type.component';
import { AddIssuePolicyComponent } from './Configuration/add-issue-policy/add-issue-policy.component';
import { AddUserRoleComponent } from './Configuration/add-user-role/add-user-role.component';
import { AddVendorsComponent } from './Configuration/add-vendors/add-vendors.component';
import { AddPublishersComponent } from './Configuration/add-publishers/add-publishers.component';
import { AddAuthorsComponent } from './Configuration/add-authors/add-authors.component';
import { AddBillDetailsComponent } from './Configuration/add-bill-details/add-bill-details.component';
import { AddBookTitleComponent } from './Configuration/add-book-title/add-book-title.component';
import { AddBookLocationComponent } from './Configuration/add-book-location/add-book-location.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewUserComponent } from './view-user/view-user.component';
// import { UserLogDetailsComponent } from './UserManagement/user-log-details/user-log-details.component';
import { LibraryCardComponent } from './library-card/library-card.component';
import { BookListReportComponent } from './Reports/book-list-report/book-list-report.component';
import { BookReportTitleWiseComponent } from './Reports/book-report-title-wise/book-report-title-wise.component';
import { BookCollegewiseReportComponent } from './Reports/book-collegewise-report/book-collegewise-report.component';
// import { BookDepartmentwiseReportComponent } from './Reports/book-departmentwise-report/book-departmentwise-report.component';
import { BookStatusReportComponent } from './Reports/book-status-report/book-status-report.component';
import { BookStockReportComponent } from './Reports/book-stock-report/book-stock-report.component';
import { BookTransactionReportComponent } from './Reports/book-transaction-report/book-transaction-report.component';
import { CollegeIssueBookReportComponent } from './Reports/college-issue-book-report/college-issue-book-report.component';
import { DepartmentalIssueBookReportComponent } from './Reports/departmental-issue-book-report/departmental-issue-book-report.component';
import { FineCollectionReportComponent } from './Reports/fine-collection-report/fine-collection-report.component';
import { ListOfCollegeComponent } from './Reports/list-of-college/list-of-college.component';
import { ListOfDepartmentComponent } from './Reports/list-of-department/list-of-department.component';
import { QuantityWiseBookReportComponent } from './Reports/quantity-wise-book-report/quantity-wise-book-report.component';
import { UserDetailsReportComponent } from './Reports/user-details-report/user-details-report.component';
import { UserLogReportComponent } from './Reports/user-log-report/user-log-report.component';
import { VendorListReportComponent } from './Reports/vendor-list-report/vendor-list-report.component';
import { IndividualBooksReportComponent } from './Reports/individual-books-report/individual-books-report.component';
import { DeptwiseCatalogingReportComponent } from './Reports/deptwise-cataloging-report/deptwise-cataloging-report.component';
import { BookCostReportComponent } from './Reports/book-cost-report/book-cost-report.component';
import { UserwiseBookReportComponent } from './Reports/userwise-book-report/userwise-book-report.component';
import { BookReportBasedOnAuthorPublisherComponent } from './Reports/book-report-based-on-author-publisher/book-report-based-on-author-publisher.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddBooksComponent } from './Cataloguing/add-books/add-books.component';
import { EditBookIdividualComponent } from './Cataloguing/editBooks/edit-book-idividual/edit-book-idividual.component';
import { EditBookGroupComponent } from './Cataloguing/editBooks/edit-book-group/edit-book-group.component';
import { ViewBooksComponent } from './Cataloguing/view-books/view-books.component';
import { BookIssueComponent } from './Circulation/book-issue/book-issue.component';
import { ReturnBooksComponent } from './Circulation/return-books/return-books.component';
import { UsersBooksRequestsComponent } from './Circulation/users-books-requests/users-books-requests.component';
import { ViewTransactionComponent } from './Circulation/view-transaction/view-transaction.component';
import { FineCollectionComponent } from './FineManagement/fine-collection/fine-collection.component';
import { ViewFineCollectionComponent } from './FineManagement/view-fine-collection/view-fine-collection.component';
import { BookReservationComponent } from './book-reservation/book-reservation.component';
import { UserBookTransHistoryComponent } from './user-book-trans-history/user-book-trans-history.component';
import { AssignNavigationComponent } from './Configuration/assign-navigation/assign-navigation.component';
import { AssignRoleComponent } from './Configuration/assign-role/assign-role.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AddNavigationPagesComponent } from './Configuration/add-navigation-pages/add-navigation-pages.component';
import { AlluserIdPasswordComponent } from './Reports/alluser-id-password/alluser-id-password.component';
import { AuthGuard } from './Authguard/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

// import { AssignlibrarycardComponent } from './not-found/not-found.component';

import { UserRegistrationComponent } from './UserManagement/user-registration/user-registration.component';
import { AddDocumentTypeComponent } from './Configuration/add-document-type/add-document-type.component';
import { UserLogDetailsComponent } from './UserManagement/user-log-details/user-log-details.component';
import { BooksWithBarcodeComponent } from './Cataloguing/books-with-barcode/books-with-barcode.component';
import { BookIssueReportIsuetypeWiseComponent } from './Reports/book-issue-report-isuetype-wise/book-issue-report-isuetype-wise.component';
import { MyLibraryCardComponent } from './UserManagement/my-library-card/my-library-card.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { AddAuthrizedSignatureComponent } from './Configuration/add-authrized-signature/add-authrized-signature.component';
import { BookIssueTwoComponent } from './Circulation/book-issue-two/book-issue-two.component';
import { AllLibraryCardComponent } from './all-library-card/all-library-card.component';
import { AddSubjectsComponent } from './Configuration/add-subjects/add-subjects.component';
import { BookDepartmentwiseReportComponent } from './Reports/book-subjectwise-report/book-subjectwise-report.component';
import { AssignlibrarycardComponent } from './assignlibrarycard/assignlibrarycard.component';



const routes: Routes = [
  {
    path:'',component:LoginComponent
  },

  {
    path:'login',component:LoginComponent,

  },
  {
    path:'Dashboard',component:DashboardComponent,
    canActivate: [AuthGuard],
    children:[
      // {
      //   path:'dashboard',component:AlluserIdPasswordComponent, data: { navigationId: 'All-Password' },
      // },

     

      {
        path:'Book Issue New/:random',component:BookIssueTwoComponent
      },
      {
        path:'Users Passwords/:random',component:AlluserIdPasswordComponent,

      },
      {
        path:'Add Signature/:random',component:AddAuthrizedSignatureComponent,

      },
      {
        path:'Dashboard Charts',component:DashboardChartComponent,

      },
      {
        path:'Change Password/:random',component:ChangePasswordComponent,
      },
      {
        path:'User Profile/:random',component:UserProfileComponent,
      },
      // =======================Configurations=== ====================
            {
              path:'Add College/:random',component:AddCollegeComponent,
            },
            {
              path:'Add Subjects/:random',component:AddSubjectsComponent
            },
            {
              path:'Add Navigations/:random',component:AddNavigationPagesComponent, },
            {
              path:'Add Course/:random',component:AddCourseComponent
            },
            {
              path:'Add Department/:random',component:AddDepartmentComponent
            },
            {
              path:'Add Currency/:random',component:AddCurrencyComponent
            },
            {
              path:'Add Document Type/:random',component:AddDocumentTypeComponent
            },
            {
              path:'Add Fine Policy/:random',component:AddFinePolicyComponent
            },
            {
              path:'Add Issue Type/:random',component:AddIssueTypeComponent
            },
            {
              path:'Add Issue Policy/:random',component:AddIssuePolicyComponent
            },
            {
              path:'Add User Role/:random',component:AddUserRoleComponent
            },
            {
              path:'Add Vendors/:random',component:AddVendorsComponent
            },
            {
              path:'Add Publisher/:random',component:AddPublishersComponent
            },
            {
              path:'Add Authors/:random',component:AddAuthorsComponent
            },
            {
              path:'Add Bill Details/:random',component:AddBillDetailsComponent
            },
            {
              path:'Add Book Title/:random',component:AddBookTitleComponent
            },
            {
              path:'Add Book Locations/:random',component:AddBookLocationComponent
            },
            {
              path:'Assign Pages/:random',component:AssignNavigationComponent
            },
            {
              path:'Assign Role/:random',component:AssignRoleComponent
            },

// =======================User Management=== ====================

      {
        path:'User Registration/:random',component:UserRegistrationComponent
      },
      {
        path:'AssignLibraryCardNo/:random',component:AssignlibrarycardComponent
      },
      {
        path:'All Library Card/:random',component:AllLibraryCardComponent
      },
      {
        path:'View Users/:random',component:ViewUserComponent
      },
      {
        path:'My Library Card/:random',component:MyLibraryCardComponent
      },
      {
        path:'View Log Details/:random',component:UserLogDetailsComponent
      },
      {
        path:'Library Card/:random',component:LibraryCardComponent
      },
      {
        path:'Books With Bar Code/:random',component:BooksWithBarcodeComponent
      },
// =======================Cataloguing=== ====================
      {
        path:'Add Books/:random',component:AddBooksComponent
      },
      {
        path:'View Books/:random',component:ViewBooksComponent
      },
      {
        path:'Edit Individual/:random',component:EditBookIdividualComponent
      },
      {
        path:'Edit Multiple/:random',component:EditBookGroupComponent
      },
// =======================Circulation=== ====================
{
  path:'Book Issue/:random',component:BookIssueComponent
},
{
  path:'Return Books/:random',component:ReturnBooksComponent
},
{
  path:'User Book requests/:random',component:UsersBooksRequestsComponent
},
{
  path:'View Transaction/:random',component:ViewTransactionComponent
},

 // =======================Fine Management=== ====================
            {
              path:'Fine Collection/:random',component:FineCollectionComponent
            },
            {
              path:'View Fine Collection/:random',component:ViewFineCollectionComponent
            },




// ==============================Reports==========================
{
  path:'Book List Report/:random',component:BookListReportComponent
},
{
  path:'Book Report Title Wise/:random',component:BookReportTitleWiseComponent
},
{
  path:'Book Report College Wise/:random',component:BookCollegewiseReportComponent
},
{
  path:'Book Report Department Wise/:random',component:BookDepartmentwiseReportComponent
},
{
  path:'Book Status Report/:random',component:BookStatusReportComponent
},
{
  path:'Books Stock Report/:random',component:BookStockReportComponent
},
{
  path:'Book Transaction Report/:random',component:BookTransactionReportComponent
},

{
  path:'College Issue Book Report/:random',component:CollegeIssueBookReportComponent
},
{
  path:'Book Issue Report Issue Type wise/:random',component:BookIssueReportIsuetypeWiseComponent
},
{
  path:'Departmental Issue Book Report/:random',component:DepartmentalIssueBookReportComponent
},{
  path:'Fine Collection Report/:random',component:FineCollectionReportComponent
},
{
  path:'College List Report/:random',component:ListOfCollegeComponent
},
{
  path:'Department List Report/:random',component:ListOfDepartmentComponent
},
{
  path:'Quantity Wise Book Report/:random',component:QuantityWiseBookReportComponent
},
{
  path:'User Details Report/:random',component:UserDetailsReportComponent
},
{
  path:'User Login Details Report/:random',component:UserLogReportComponent
},
{
  path:'Vendor List Report/:random',component:VendorListReportComponent
},
{
  path:'Individual Books Report/:random',component:IndividualBooksReportComponent
},
{
  path:'Department Wise Cataloging Report/:random',component:DeptwiseCatalogingReportComponent
},
{
  path:'Book Cost Report/:random',component:BookCostReportComponent
},
{
  path:'Userwise Book Report/:random',component:UserwiseBookReportComponent
},
{
  path:'Report Based On Author And Publisher/:random',component:BookReportBasedOnAuthorPublisherComponent
},


{
  path:'Book Reservation/:random',component:BookReservationComponent
},
{
  path:'Transaction History/:random',component:UserBookTransHistoryComponent
},
          ]
  },

  {
    path:"**",component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
