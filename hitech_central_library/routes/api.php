<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [ApiController::class, 'login']);
Route::get('getCollege/{clg_id?}', [ApiController::class, 'getCollege']);
Route::get('/getBook/{id}', [ApiController::class, 'get_books']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('adddepartment', [ApiController::class, 'adddepartment']);
    Route::get('getdepartment/{id?}', [ApiController::class, 'getdepartment']);
    Route::get('editdepartment/{id}', [ApiController::class, 'editdepartment']);
    Route::put('updatedepartment/{id}', [ApiController::class, 'updatedepartment']);
    Route::delete('deletedepartment/{id}', [ApiController::class, 'deletedepartment']);

    Route::post('addlogdetails', [ApiController::class, 'addlogdetails']);
    Route::get('getlogdetails', [ApiController::class, 'getlogdetails']);
    Route::get('editlogdetails/{id}', [ApiController::class, 'editlogdetails']);
    Route::put('updatelogdetails/{id}', [ApiController::class, 'updatelogdetails']);
    Route::delete('deletelogdetails/{id}', [ApiController::class, 'deletelogdetails']);

    Route::post('adduserrole', [ApiController::class, 'adduserrole']);
    Route::get('getuserrole/{id}', [ApiController::class, 'getuserrole']);
    Route::get('edituserrole/{id}', [ApiController::class, 'edituserrole']);
    Route::put('updateuserrole/{id}', [ApiController::class, 'updateuserrole']);
    Route::delete('deleteuserrole/{id}', [ApiController::class, 'deleteuserrole']);

    Route::post('adddocumenttype', [ApiController::class, 'adddocumenttype']);
    Route::get('getdocumenttype/{clg_id?}', [ApiController::class, 'getdocumenttype']);
    Route::get('editdocumenttype/{id}', [ApiController::class, 'editdocumenttype']);
    Route::put('updatedocumenttype/{id}', [ApiController::class, 'updatedocumenttype']);
    Route::delete('deletedocumenttype/{id}', [ApiController::class, 'deletedocumenttype']);

    Route::post('std_emp_book_issue', [ApiController::class, 'std_emp_book_issue']);
    Route::post('department_book_issue', [ApiController::class, 'dept_book_issue']);

    // ===================================Pankaj Part================================

    // college----------------------------

    Route::post('addCollege', [ApiController::class, 'addCollege']);
    Route::delete('delCollege/{id}', [ApiController::class, 'delCollege']);
    Route::get('editCollege/{id}', [ApiController::class, 'editCollege']);
    Route::put('updateCollege/{id}', [ApiController::class, 'updateCollege']);
    Route::get('searchCollege/{clgnm}', [ApiController::class, 'searechCollege']);

    // currency--------------------------

    Route::post('addCurrency', [ApiController::class, 'addCurrency']);
    Route::get('getCurrency/{clg_id?}', [ApiController::class, 'getCurrency']);
    Route::get('editCurrency/{id}', [ApiController::class, 'editCurrency']);
    Route::put('updateCurrency/{id}', [ApiController::class, 'updateCurrency']);
    Route::delete('delCurrency/{id}', [ApiController::class, 'deleteCurrency']);
    Route::get('searchCurrency/{currencyName}', [ApiCOntroller::class, 'searchCurrency']);
    // finecollections------------------
    Route::post('addFinecollection', [ApiController::class, 'addFineCollection']);
    Route::get('getFinecollection/{id?}', [ApiController::class, 'getFineCollection']);
    Route::get('editFinecollection/{id}', [ApiController::class, 'editFineCollection']);
    Route::put('updtFinecollection/{id}', [ApiController::class, 'updateFineCollection']);
    Route::delete('delFinecollection/{id}', [ApiController::class, 'deleteFineCollection']);
    Route::get('edit_fine_collection/{id}', [ApiController::class, 'edt_fine_collection']);
    // finepolicy----------------------

    Route::post('/addFinePolicy', [ApiController::class, 'addFinePolicy']);
    Route::get('/getFinePolicy/{clg_id?}', [ApiController::class, 'getFinePolicy']);
    Route::get('/editFinePolicy/{id}', [ApiController::class, 'editFInePolicy']);
    Route::put('/updateFinePolicy/{id}', [ApiController::class, 'updateFInePolicy']);
    Route::delete('/deleteFinePolicy/{id}', [ApiController::class, 'deleteFinePolicy']);

    // book-------------------------

    Route::post('/addBook', [ApiController::class, 'addBook']);
    Route::get('/editBook/{id}', [ApiController::class, 'edit_books']);
    Route::post('updateBook', [ApiController::class, 'updt_books']);
    Route::delete('/deleteBook/{id}', [ApiController::class, 'del_books']);

    // =========================================Nita Part================================
    // Author
    Route::post('add/author', [ApiController::class, 'add_author']);
    Route::get('get/author/{clg_id?}', [ApiController::class, 'get_author']);
    Route::delete('del/author/{id}', [ApiController::class, 'del_author']);
    Route::get('search/author/{search}', [ApiController::class, 'search_author']);
    Route::get('edit/author/{id}', [ApiController::class, 'edit_author']);
    Route::put('updt/author/{id}', [ApiController::class, 'updt_author']);

    // Bill_details
    Route::post('add/bill_details', [ApiController::class, 'add_bill_details']);
    Route::get('get/bill_details/{clg_id}', [ApiController::class, 'get_bill_details']);
    Route::delete('del/bill_details/{id}', [ApiController::class, 'del_bill_details']);
    // Route::get('search/bill_details/{search}', [ApiController::class, 'search_bill_details']);
    Route::get('edit/bill_details/{id}', [ApiController::class, 'edit_bill_details']);
    Route::post('updt/bill_details/{id}', [ApiController::class, 'updt_bill_details']);

    //Book Location
    Route::post('add/book_loc', [ApiController::class, 'add_book_loc']);
    Route::get('get/book_loc/{clg_id}', [ApiController::class, 'get_book_loc']);
    Route::delete('del/book_loc/{id}', [ApiController::class, 'del_book_loc']);
    Route::get('edit/book_loc/{id}', [ApiController::class, 'edit_book_loc']);
    Route::put('updt/book_loc/{id}', [ApiController::class, 'updt_book_loc']);

    // Book Titles
    Route::post('add/book_ttl', [ApiController::class, 'add_book_ttl']);
    Route::get('get/book_ttl/{id}', [ApiController::class, 'get_book_ttl']);
    Route::delete('del/book_ttl/{id}', [ApiController::class, 'del_book_ttl']);
    Route::get('edit/book_ttl/{id}', [ApiController::class, 'edit_book_ttl']);
    Route::put('updt/book_ttl/{id}', [ApiController::class, 'updt_book_ttl']);

    // Course
    Route::post('add/courses', [ApiController::class, 'add_courses']);
    Route::get('get/courses/{clg_id?}', [ApiController::class, 'get_courses']);
    Route::delete('del/courses/{id}', [ApiController::class, 'del_courses']);
    Route::get('edit/courses/{id}', [ApiController::class, 'edit_courses']);
    Route::put('updt/courses/{id}', [ApiController::class, 'updt_courses']);

    // Assign Role
    Route::post('add/assign_role', [ApiController::class, 'add_assign_role']);
    Route::get('get/assign_role', [ApiController::class, 'get_assign_role']);
    Route::delete('del/assign_role/{id}/{user_id}', [ApiController::class, 'del_assign_role']);
    Route::get('edit/assign_role/{id}', [ApiController::class, 'edit_assign_role']);
    Route::put('updt/assign_role/{id}', [ApiController::class, 'updt_assign_role']);

    // Assign Nav
    Route::post('add/assign_nav', [ApiController::class, 'add_assign_nav']);
    Route::get('get/assign_nav', [ApiController::class, 'get_assign_nav']);
    Route::delete('del/assign_nav/{id}', [ApiController::class, 'del_assign_nav']);
    Route::get('edit/assign_nav/{id}', [ApiController::class, 'edit_assign_nav']);
    Route::put('updt/assign_nav/{id}', [ApiController::class, 'updt_assign_nav']);

    // Search_Nav
    Route::get('search/search_nav/{id}', [ApiController::class, 'search_nav']);

    // Navigation Pages
    Route::post('add/nav_page', [ApiController::class, 'add_nav_page']);
    Route::get('get/nav_page', [ApiController::class, 'get_nav_page']);
    Route::delete('del/nav_page/{id}', [ApiController::class, 'del_nav_page']);
    Route::get('edit/nav_page/{id}', [ApiController::class, 'edit_nav_page']);
    Route::put('updt/nav_page/{id}', [ApiController::class, 'updt_nav_page']);


    // =================================== Biplab Part =======================================

    // VENDER
    Route::post('addvender', [ApiController::class, 'addvender']);
    Route::get('getvenders/{clg_id}', [ApiController::class, 'getvenders']);
    Route::get('editvender/{id}', [ApiController::class, 'editvender']);
    Route::put('updatevender/{idd}', [ApiController::class, 'updatevender']);
    Route::delete('deletevender/{id}', [ApiController::class, 'deletevender']);

    // USER
    Route::post('adduser', [ApiController::class, 'adduser']);
    Route::get('getusers', [ApiController::class, 'getusers']);
    Route::get('edituser/{id}', [ApiController::class, 'edituser']);
    Route::post('updateuser', [ApiController::class, 'updateuser']);
    Route::delete('deleteuser/{id}', [ApiController::class, 'deleteuser']);

    // PUBLISHER
    Route::post('addpublisher', [ApiController::class, 'addpublisher']);
    Route::get('getpublisher/{id?}', [ApiController::class, 'getpublisher']);
    Route::get('editpublisher/{id}', [ApiController::class, 'editpublisher']);
    Route::put('updatepublisher/{idd}', [ApiController::class, 'updatepublisher']);
    Route::delete('deletepublisher/{id}', [ApiController::class, 'deletepublisher']);

    // ISSUE_TYPE
    Route::post('addisuetype', [ApiController::class, 'addisuetype']);
    Route::get('getissuetype/{clg_id?}', [ApiController::class, 'getissuetype']);
    Route::get('editissuetype/{id}', [ApiController::class, 'editissuetype']);
    Route::put('updateissuetype/{idd}', [ApiController::class, 'updateissuetype']);
    Route::delete('deleteissuetype/{id}', [ApiController::class, 'deleteissuetype']);
    // ISSUE_POLICIES
    Route::post('addisuepilicies', [ApiController::class, 'addisuepilicies']);
    Route::get('getissuepolicies/{clg_id?}', [ApiController::class, 'getissuepolicies']);
    Route::get('editisuepilicies/{id}', [ApiController::class, 'editisuepilicies']);
    Route::put('updateisuepilicies/{idd}', [ApiController::class, 'updateisuepilicies']);
    Route::delete('deleteisuepilicies/{id}', [ApiController::class, 'deleteisuepilicies']);


    Route::get('get_course_data/{college_id}', [ApiController::class, 'get_course_data']);
    Route::get('get_dept_data/{course_id}', [ApiController::class, 'get_dept_data']);
    Route::post('change_password', [ApiController::class, 'change_password']);

    // get user profile
    // Route::get('get_user_profile/{user_id}/{clg_id?}/{dept_id?}/{course_id?}',[ApiController::class,'get_user_profile']);
    Route::get('get_user_profile/{user_id}/{clg_id?}', [ApiController::class, 'get_user_profile']);



    Route::get('student_role_id/{id}', [ApiController::class, 'student_role_id']);
    Route::get('without_std_admin/{id}', [ApiController::class, 'without_std_admin']);
    Route::get('view_all_books/{clg_id}', [ApiController::class, 'join_book_author_booktitle_publisher']);
    Route::get('last_accession_number/{clg_id}', [ApiController::class, 'last_accession_number']);
    Route::get('wsp/{college_id?}', [ApiController::class, 'password_list']); //name changed
    Route::get('single_book_data_accession/{id}', [ApiController::class, 'single_book_data']);
    // get the student details
    Route::get('view_student/{clg_id}', [ApiController::class, 'view_student']);

    // getthe employee details except admin
    Route::get('view_employee/{clg_id}', [ApiController::class, 'view_employee']);

    // user Details By LIbCardNo
    Route::get('user_dtls_LibCardNo/{cardNO}', [ApiController::class, 'user_dtls_LibCardNo']);

    // search edition year
    Route::get('edition_year/{edition_year}', [ApiController::class, 'edition_year']);
    // search book title
    Route::get('book_title/{book_title}/{clg_id}', [ApiController::class, 'book_title']); // search Author
    Route::get('author/{clg_id}/{author_name}', [ApiController::class, 'search_author']);
    // Search by Accession Number
    Route::get('accession_no/{accession_no}/{clg_id}', [ApiController::class, 'search_accesion_no']);
    // Search by keywords
    Route::get('keyword/{keyword}', [ApiController::class, 'search_keyword']);
    // View Fine Collection
    Route::get('viewfine_collection/{college_id}', [ApiController::class, 'viewfine_collection']);
    // Maximum Books based on library card number user_type
    Route::get('maximum_book/{cardNo}', [ApiController::class, 'maximum_book']);
    // Number Of Issued Books
    Route::get('issued_book/{libcardno}', [ApiController::class, 'issued_books']);

    Route::get('update_status/{id}', [ApiController::class, 'update_status']);

    Route::get('navigation_page_name/{id}', [ApiController::class, 'navigation_page_name']);

    Route::get('update_status_finepolicy/{id}', [ApiController::class, 'update_status_finepolicy']);

    Route::get('employee_details_with_college_id/{id}', [ApiController::class, 'employee_details_with_college_id']);

    //name,user_role,assign_user_role
    Route::get('name_role_assignrole/{id}', [ApiController::class, 'name_role_assignrole']);

    //Catalouging view book search on college/title/author
    Route::get('view_book/{college_id}/{title?}/{author?}', [ApiController::class, 'title_author_search']);


    // -----------------------------------------------------------------REPORTS------------------------------------------
    // ------------------------log_details_report
    // log_details search by date
    Route::get('log_details/{college_id}/{from}/{to}', [ApiController::class, 'log_details_date_search']);
    // log_details
    Route::get('log_details_report/{clg_id}', [ApiController::class, 'log_details_report']);
    // book list report
    Route::get('booklist_report/{clg_id}', [ApiController::class, 'booklist_report']);
    // fine_collection_report
    Route::get('fine_collection_report/{clg_id}', [ApiCOntroller::class, 'fine_collection_report']);
    // fine_collection_report By LIbCardNo
    Route::get('search_fine/{clg}/{cardNO}', [ApiController::class, 'search_fine']);
    // book_title_wise report
    Route::get('/title_wise_report/{clg_id}', [ApiController::class, 'title_wise_report']);
    //book_report_department_wise based on dept_id and clg_id
    Route::get('book_report_department_wise/{dept_id}/{clg_id}', [ApiController::class, 'book_report_dept_wise']);
    Route::get('book_report_department_wise_search/{clg_id}/{deptName}', [ApiController::class, 'book_report_dept_wise_search']);
    //user_details_report
    Route::get('user_details_report/{clg_id}/{string}', [ApiController::class, 'user_details_report']);
    // book_transaction_report
    Route::get('book_transaction_report/{college_id}', [ApiController::class, 'book_transaction_report']);
    // book_report_clg_wise
    Route::get('book_report_clg_wise/{college_id}', [ApiController::class, 'book_report_clg_wise']);
    // book_transaction_report_search
    Route::get('book_trans_search_report/{college_id}/{from}/{to}', [ApiController::class, 'book_trans_search_report']);
    Route::get('title_wise_report_search/{clg_id}/{title}', [ApiController::class, 'title_wise_report_search']);
    //user_details by the help of user_id
    Route::get('user_details/{user_id}', [ApiController::class, 'user_details']);
    // book_stock_report
    Route::get('book_stock_report/{college_id}', [ApiController::class, 'book_stock_report']);
    // book_report_clg_wise_search
    Route::get('book_report_clg_wise_search/{clg_id}/{clgName}', [ApiController::class, 'clg_wise_search']);
    // book_report_subject_wise
    Route::get('book_report_subject_wise/{sub_id}/{clg_id}', [ApiController::class, 'book_report_subject_wise']);
    Route::get('book_report_subject_wise_search/{clg_id}/{subName}', [ApiController::class, 'book_report_subject_wise_search']);

    // ind_book_by_subject
    Route::get('book_by_subject/{clg_id}/{subject}',[ApiController::class,'ind_book_by_subject']);

    // total book detais by status
    // Route::get('total_book_status/{college_id}',[ApiController::class,'total_book_status']);
    // find department id based on college_id and course_id
    Route::get('find_dept_id/{college_id}/{course_id}', [ApiController::class, 'find_dept_id']);
    // find list of library card number using college_id
    Route::get('library_card_list/{college_id}', [ApiController::class, 'library_card_list']);

    // total book detais by status
    Route::get('total_book_status/{college_id}', [ApiController::class, 'total_book_status']);

    // total book detais by status search
    Route::get('total_book_status_search/{college_id}/{date}', [ApiController::class, 'total_book_status_search']);

    // Book return
    Route::post('book_return', [ApiController::class, 'book_return']);

    //list of issued books in a library card number
    Route::get('issued_books_accession_number/{library_card_number}', [ApiController::class, 'issued_books_accession_number']);

    //publisher by college id
    Route::get('publisher_by_clgid/{id}', [ApiController::class, 'publisher_by_clgid']);

   
    // Return Book search based on library card no
    Route::get('bookreturn_search/{cardNo}', [ApiController::class, 'bookReturnSearch']);

    // book transaction history
    Route::get('book_transactionhistory/{id}', [ApiController::class, 'book_transactionhistory']);

    // bill_by_vendor
    Route::get('get_bill_by_vendor/{vendor}/{college_id}', [ApiController::class, 'bill_by_vendor']);

    // Multiple Book Update
    Route::post('multiple_book_update', [ApiController::class, 'multiple_book_update']);

    // book_fine_collection
    Route::get('book_fine_collection/{cardNo}/{accs_no}', [ApiController::class, 'book_fine_collection']);

    // title_quantity
    Route::get('title_quantity/{clg_id}/{title}', [ApiController::class, 'title_quantity']);
    // quantity
    Route::get('quantity/{id}', [ApiController::class, 'quantity']);
    // individual search by accession no
    Route::get('ind_book_by_accno/{clg}/{acc}', [ApiController::class, 'ind_book_by_accno']);
    // ind_book_by_dept
    Route::get('book_by_dept/{clg}/{dept}', [ApiController::class, 'ind_book_by_dept']);
    // ind_book_by_lib
    Route::get('book_by_lib/{clg}/{lib}', [ApiController::class, 'ind_book_by_lib']);
    // book_cost_report
    Route::get('book_cost_report/{clg_id}', [ApiController::class, 'book_cost_report']);
    // view all book on title author volumn and college_id
    Route::get('view_book_on_tavc/{title}/{author}/{volumn}/{college_id}', [ApiController::class, 'view_book_on_tavc']);
    // view all books on keyword and college_id
    Route::get('view_book_on_kc/{keyword}/{college_id}', [ApiController::class, 'view_book_on_kc']);

    // get user role by id
    Route::get('get_roles_by_id/{id}', [ApiController::class, 'get_roles_by_id']);

    // issue_type_by_college_id
    Route::get('issuetype_by_clg_id/{id}', [ApiController::class, 'issue_type_by_clg_id']);
    //book report status wise
    Route::get('book_report_statuswise/{book_status}/{clg_id}', [ApiController::class, 'book_report_statuswise']);
    // book_cost_report_search
    Route::get('book_cost_report_search/{clg}/{deptName}', [ApiController::class, 'book_cost_report_search']);
    // search nav by colgid and user role_id
    Route::get('search_nav_by_roleidclgid/{user_role_id}/{clg_id}', [ApiController::class, 'search_nav_by_roleidclgid']);
    // Book_status_by_clgid
    Route::get('status_by_clgid/{clg_id}', [ApiController::class, 'status_by_clg_id']);
    // Book Title search for biswajit
    Route::get('book_title_search/{book_title}/{clg_id}', [ApiController::class, 'book_title_search']);
    // Author search for biswajit
    Route::get('author_search/{clg_id}/{author_name}', [ApiController::class, 'author_search']);
    // view_book_title_author_search for biswajit
    Route::get('view_book_tas/{college_id}/{title?}/{author?}', [ApiController::class, 'view_book_title_author_search']);
    // max_book_based on user id_issue_type
    Route::get('max_book/{usn_id}/{issue_type_id}', [ApiController::class, 'max_book_user_id_based']);
    // Search author publisher
    Route::get('search_author_publisher/{clg}/{inp?}', [ApiController::class, 'author_publisher_search']);
    // issued_requested_book based on user_id and issue_type_id
    Route::get('issued_request_book/{user_id}/{issue_type_id}', [ApiController::class, 'issued_requested_book']);
    //book_request insert
    Route::post('book_request', [ApiController::class, 'book_requestInsert']);
    // book_trans_by_user
    Route::get('book_trans_by_user/{clg_id}/{lib}', [ApiController::class, 'book_trans_by_user']);
    // book issue by issue type
    Route::get('issues/{i_type}', [ApiController::class, 'issue_by_type']);
    // book issue by issue type and department issue
    Route::get('dept_issue_report/{clg_id}/{inp}', [ApiController::class, 'dept_issue_report']);
    // book_request_report
    Route::get('/book_request_dtls/{clg_id}', [ApiController::class, 'book_requested_dtls']);
    // approved_book_request
    Route::post('/approve_book_request', [ApiController::class, 'approved_request']);
    // book_details_between accession_no range
    Route::get('book_dtls_in_accs_no_range/{from}/{to}/{clig_id}', [ApiCOntroller::class, 'book_dtls_btw_access_no_range']);
    // issue_available_book_list
    Route::get('issue_available_book_list/{clg_id}', [ApiController::class, 'issue_available_book_list']);
    // unique
    Route::get('unique/{clg_id}', [ApiController::class, 'unique']);
    // book number of book issued by the college id by a date
    Route::get('amountof_issuedbook_by_college_id/{clg_id?}', [ApiController::class, 'amountof_issuedbook_by_college_id']);
    // no of registration on month based on clg
    Route::get('/totalRegistration/{clg_id}', [ApiController::class, 'total_registrationMonthly']);
    // add authorised signature
    Route::post('add_authorised_signature', [ApiController::class, 'add_authorised_signature']);
    // edit_authorised_signature
    Route::get('edit_authorised_signature/{id}', [ApiController::class, 'edit_authorised_signature']);
    // get_authorised_signature
    Route::get('get_authorised_signature/{clg?}', [ApiController::class, 'get_authorised_signature']);
    // update_authorised_signature
    Route::post('update_authorised_signature/{id}', [ApiController::class, 'update_authorised_signature']);
    // User details based on accession number
    Route::get('user_data_based_on_accession_number/{acc_no}', [ApiController::class, 'user_data_based_on_accession_number']);
    // inactive_or_active_authorise_signature
    Route::get('inactive_or_active_authorise_signature/{id}', [ApiController::class, 'inactive_or_active_authorise_signature']);
    // library_card_list
    Route::get('libraryCard_list/{year}/{dept_id}', [ApiController::class, 'library_card_list_print']);
    // add editor
    Route::post('add_editor', [ApiController::class, 'add_editor']);
    // edit editor
    Route::get('edit_editor/{id}', [ApiController::class, 'edit_editor']);
    // get editor
    Route::get('get_editor/{clg_id}', [ApiController::class, 'get_editor']);
    // update editor
    Route::put('update_editor/{id}', [ApiController::class, 'update_editor']);
    // delete editor
    Route::delete('delete_editor/{id}', [ApiController::class, 'delete_editor']);
    // return_book_by_dept
    Route::get('return_book_by_dept/{clg}/{dept}', [ApiController::class, 'return_book_by_dept']);
    // return_book_by_accNo
    Route::get('return_book_by_accNo/{clg}/{accNo}', [ApiController::class, 'return_book_by_accNo']);
    // accNo_fetch_by_dept
    Route::get('accNo/{clg}', [ApiController::class, 'accNo_fetch']);
    // accNo_fetch_by_user
    Route::get('accNo_fetch/{clg}', [ApiController::class, 'accNo_fetch_usr']);
    // accNo_fetch_from_to
    Route::get('searchaccNo/{clg}/{start}/{end}', [ApiController::class, 'accNo_fetch_from_to']);
    // logout
    Route::post('logout', [ApiController::class, 'logout']);

    //Subjects
    Route::post('add/subject', [ApiController::class, 'add_subject']);
    Route::get('get/subject/{clg_id}', [ApiController::class, 'get_subject']);
    Route::delete('del/subject/{id}', [ApiController::class, 'del_subject']);
    Route::get('edit/subject/{id}', [ApiController::class, 'edit_subject']);
    Route::put('updt/subject/{id}', [ApiController::class, 'update_subject']);
    
    // Delete All Assign Navigations
    Route::delete('delete_all_navigations/{user_role_id}',[ApiController::class,'delete_all_navigations']);

    // search by book tittle and the college id
    Route::get('search_title_clgid/{college_id}/{book_tittle_name}',[ApiController::class,'search_title_clgid']);
    
    // publisher search
    Route::get('publisher_search/{clgId}/{publisher_name}',[ApiController::class,'publisher_search']);
   
    // vendor search
    Route::get('vendor_search/{clgId}/{vendor_name}',[ApiController::class,'vendor_search']);

    // bill search
    Route::get('bill_search/{clgId}/{bill_num}',[ApiController::class,'bill_search']);

    // bill search
    Route::get('subject_search/{clgId}/{sub_nam}',[ApiController::class,'sub_search']);
    
    // all_details_data
    Route::get('all_details_data/{clg_id}',[ApiController::class,'all_details_data']);

    Route::patch('/usersUpdate/{id}', [ApiController::class, 'updateLibraryCardno']);
    // Route::put('/users/{id}/updateLibraryCardno', [ApiController::class, 'updateLibraryCardno']);
  

});
Route::get('address',[ApiController::class,'address']);
Route::get('datas/{contact}',[ApiController::class,'searchApi']);

