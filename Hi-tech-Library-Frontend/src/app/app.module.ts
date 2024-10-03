import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
// Import MatFormFieldModule



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { LibraryCardComponent } from './library-card/library-card.component';

import { NgSelectModule } from '@ng-select/ng-select';

import { BookReservationComponent } from './book-reservation/book-reservation.component';
import { UserBookTransHistoryComponent } from './user-book-trans-history/user-book-trans-history.component';
import { ReportCommonComponent } from './report-common/report-common.component';
import { DailyBookTransComponent } from './daily-book-trans/daily-book-trans.component';

import { UserRoleComponent } from './user-role/user-role.component';

import { NavManageComponent } from './nav-manage/nav-manage.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AddCollegeComponent } from './Configuration/add-college/add-college.component';

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
import { AddBooksComponent } from './Cataloguing/add-books/add-books.component';
import { ViewBooksComponent } from './Cataloguing/view-books/view-books.component';

import { UserRegistrationComponent } from './UserManagement/user-registration/user-registration.component';
import { BookIssueComponent } from './Circulation/book-issue/book-issue.component';


// ----------------------------------------------REPORT---------------------------------------------------------
import { BookStockReportComponent } from './Reports/book-stock-report/book-stock-report.component';
import { UserLogReportComponent } from './Reports/user-log-report/user-log-report.component';
import { UserDetailsReportComponent } from './Reports/user-details-report/user-details-report.component';
import { FineCollectionReportComponent } from './Reports/fine-collection-report/fine-collection-report.component';
import { BookTransactionReportComponent } from './Reports/book-transaction-report/book-transaction-report.component';
import { BookListReportComponent } from './Reports/book-list-report/book-list-report.component';
import { BookReportTitleWiseComponent } from './Reports/book-report-title-wise/book-report-title-wise.component';
import { DepartmentalIssueBookReportComponent } from './Reports/departmental-issue-book-report/departmental-issue-book-report.component';
import { CollegeIssueBookReportComponent } from './Reports/college-issue-book-report/college-issue-book-report.component';
import { BookStatusReportComponent } from './Reports/book-status-report/book-status-report.component';
import { QuantityWiseBookReportComponent } from './Reports/quantity-wise-book-report/quantity-wise-book-report.component';
import { VendorListReportComponent } from './Reports/vendor-list-report/vendor-list-report.component';
import { ListOfCollegeComponent } from './Reports/list-of-college/list-of-college.component';
import { ListOfDepartmentComponent } from './Reports/list-of-department/list-of-department.component';
import { BookCollegewiseReportComponent } from './Reports/book-collegewise-report/book-collegewise-report.component';
// import { BookDepartmentwiseReportComponent } from './Reports/book-departmentwise-report/book-departmentwise-report.component';
import { IndividualBooksReportComponent } from './Reports/individual-books-report/individual-books-report.component';
import { DeptwiseCatalogingReportComponent } from './Reports/deptwise-cataloging-report/deptwise-cataloging-report.component';
import { BookCostReportComponent } from './Reports/book-cost-report/book-cost-report.component';
import { UserwiseBookReportComponent } from './Reports/userwise-book-report/userwise-book-report.component';
import { BookReportBasedOnAuthorPublisherComponent } from './Reports/book-report-based-on-author-publisher/book-report-based-on-author-publisher.component';
import { AddCourseComponent } from './Configuration/add-course/add-course.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditBookIdividualComponent } from './Cataloguing/editBooks/edit-book-idividual/edit-book-idividual.component';
import { EditBookGroupComponent } from './Cataloguing/editBooks/edit-book-group/edit-book-group.component';
import { ReturnBooksComponent } from './Circulation/return-books/return-books.component';
import { UsersBooksRequestsComponent } from './Circulation/users-books-requests/users-books-requests.component';
import { ViewTransactionComponent } from './Circulation/view-transaction/view-transaction.component';
import { FineCollectionComponent } from './FineManagement/fine-collection/fine-collection.component';
import { ViewFineCollectionComponent } from './FineManagement/view-fine-collection/view-fine-collection.component';
import { AssignRoleComponent } from './Configuration/assign-role/assign-role.component';
import { AddNavPageComponent } from './Configuration/add-nav-page/add-nav-page.component';
import { AssignNavigationComponent } from './Configuration/assign-navigation/assign-navigation.component';


// --------------------------CUSTOM PIPE START----------------------
import { ForAssignRoleUserSearch, ForCollegePipe, ForSubjectsPipe, ForUsersSearchPipe, ForuserBookRequest, ForuserLogDetails } from './CustomPipes/for-college.pipe';
import { ForCoursePipe } from './CustomPipes/for-college.pipe';
import { ForDocTypePipe } from './CustomPipes/for-college.pipe';

import { ForDepartmentPipe } from './CustomPipes/for-college.pipe';
import { ForCurrencyPipe } from './CustomPipes/for-college.pipe';
import { ForFinePolicyPipe } from './CustomPipes/for-college.pipe';
import { ForIssueTypePipe } from './CustomPipes/for-college.pipe';
import { ForIssuePolicyPipe } from './CustomPipes/for-college.pipe';
import { ForUserRolePipe } from './CustomPipes/for-college.pipe';
import { ForVendorPipe } from './CustomPipes/for-college.pipe';
import { ForPublisherPipe } from './CustomPipes/for-college.pipe';
import { ForAuthorPipe } from './CustomPipes/for-college.pipe';
import { ForBilldetailsPipe } from './CustomPipes/for-college.pipe';
import { ForBookTitlePipe } from './CustomPipes/for-college.pipe';
import { ForLocationPipe } from './CustomPipes/for-college.pipe';
import { ForBookSearchPipe } from './CustomPipes/for-college.pipe';
import { ForNavigationPagePipe } from './CustomPipes/for-college.pipe';
import { ForPasswordSearchPipe } from './CustomPipes/for-college.pipe';

// --------------------------CUSTOM PIPE END----------------------
import { NgxPaginationModule } from 'ngx-pagination';
import { AddNavigationPagesComponent } from './Configuration/add-navigation-pages/add-navigation-pages.component';
import { AlluserIdPasswordComponent } from './Reports/alluser-id-password/alluser-id-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddDocumentTypeComponent } from './Configuration/add-document-type/add-document-type.component';
import { AllchartsComponent } from './allcharts/allcharts.component';
import { UserLogDetailsComponent } from './UserManagement/user-log-details/user-log-details.component'

import { BarcodeGeneratorAllModule,QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { BooksWithBarcodeComponent } from './Cataloguing/books-with-barcode/books-with-barcode.component';
import { BookIssueReportIsuetypeWiseComponent } from './Reports/book-issue-report-isuetype-wise/book-issue-report-isuetype-wise.component';
import { MyLibraryCardComponent } from './UserManagement/my-library-card/my-library-card.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { AddAuthrizedSignatureComponent } from './Configuration/add-authrized-signature/add-authrized-signature.component';
import { BookIssueTwoComponent } from './Circulation/book-issue-two/book-issue-two.component';
import { AllLibraryCardComponent } from './all-library-card/all-library-card.component';
import { AddSubjectsComponent } from './Configuration/add-subjects/add-subjects.component';
import { CustomHeaderInterceptor } from './interceptors/custom-header.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { BookDepartmentwiseReportComponent } from './Reports/book-subjectwise-report/book-subjectwise-report.component';
import { AssignlibrarycardComponent } from './assignlibrarycard/assignlibrarycard.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegistrationComponent,
    UserProfileComponent,
    ViewUserComponent,
    LibraryCardComponent,
    EditBookIdividualComponent,
    EditBookGroupComponent,
    BookReservationComponent,
    UserBookTransHistoryComponent,
    ReportCommonComponent,
    DailyBookTransComponent,
    AssignRoleComponent,
    UserRoleComponent,
    AddNavPageComponent,
    AssignNavigationComponent,
    NavManageComponent,
    WelcomePageComponent,
   LoginComponent,
    AddCollegeComponent,
    ChangePasswordComponent,
    AddCourseComponent,
    AddDepartmentComponent,
    AddCurrencyComponent,
    AddFinePolicyComponent,
    AddIssueTypeComponent,
    AddIssuePolicyComponent,
    AddUserRoleComponent,
    AddVendorsComponent,
    AddPublishersComponent,
    AddAuthorsComponent,
    AddBillDetailsComponent,
    AddBookTitleComponent,
    AddBookLocationComponent,
    AddBooksComponent,
    ViewBooksComponent,
    UserRegistrationComponent,
    BookIssueComponent,
    ReturnBooksComponent,
    UsersBooksRequestsComponent,
    FineCollectionComponent,
    ViewFineCollectionComponent,

//Report
BookStockReportComponent,
UserLogReportComponent,
 UserDetailsReportComponent,
 FineCollectionReportComponent,
 BookTransactionReportComponent,
 BookListReportComponent,
 BookReportTitleWiseComponent,
 DepartmentalIssueBookReportComponent,
 CollegeIssueBookReportComponent,
 BookStatusReportComponent,
 QuantityWiseBookReportComponent,
 VendorListReportComponent,
 ListOfCollegeComponent,
 ListOfDepartmentComponent,
 BookCollegewiseReportComponent,
 BookDepartmentwiseReportComponent,
 IndividualBooksReportComponent,
 DeptwiseCatalogingReportComponent,
 BookCostReportComponent,
 UserwiseBookReportComponent,
 BookReportBasedOnAuthorPublisherComponent,
 ForCollegePipe,
 ViewTransactionComponent,
//  --------------PIPE-----------------
 ForCoursePipe,
 ForSubjectsPipe,
 ForPasswordSearchPipe,
 ForDocTypePipe,
 ForUsersSearchPipe,
 ForNavigationPagePipe,
 ForAssignRoleUserSearch,
 ForDepartmentPipe,
 ForCurrencyPipe,
 ForFinePolicyPipe,
 ForIssueTypePipe,
 ForIssuePolicyPipe,
 ForUserRolePipe,
 ForVendorPipe,
 ForPublisherPipe,
 ForAuthorPipe,
 ForBilldetailsPipe,
 ForBookTitlePipe,
 ForLocationPipe,
 ForBookSearchPipe,
 AddNavigationPagesComponent,
 AlluserIdPasswordComponent,
 NotFoundComponent,
 AddDocumentTypeComponent,
 AllchartsComponent,
 UserLogDetailsComponent,
 ForuserLogDetails,
 ForuserBookRequest,
 BooksWithBarcodeComponent,
 BookIssueReportIsuetypeWiseComponent,
 MyLibraryCardComponent,
 DashboardChartComponent,
 AddAuthrizedSignatureComponent,
 BookIssueTwoComponent,
 AllLibraryCardComponent,
 AddSubjectsComponent,
 AssignlibrarycardComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgxPaginationModule,
    BarcodeGeneratorAllModule, QRCodeGeneratorAllModule ,DataMatrixGeneratorAllModule,
    DataTablesModule




  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
