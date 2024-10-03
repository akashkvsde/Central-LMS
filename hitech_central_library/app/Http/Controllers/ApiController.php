<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Book;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ApiController extends Controller
{
  // department
  public function adddepartment(Request $request)
  {
    try {
      $dept_name = $request->dept_name;
      $college_id = $request->college_id;
      $course_id = $request->course_id;
      $entry_by = $request->entry_by;

      $duplicate = DB::table('departments')->where('college_id', '=', $college_id)
        ->where('course_id', '=', $course_id)
        ->where('dept_name', '=', $dept_name)->get();
      if (count($duplicate) > 0) {
        return response()->json('Duplicate Data Entry');
      } else {
        DB::select('call add_department(?,?,?,?,@result)', array($dept_name, $college_id, $course_id, $entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function getdepartment($id = null)
  {
    try {
      if ($id != null) {
        $data = DB::select('call get_department(?)', array($id));
      } else {
        $data = DB::select('call get_department(?)', [null]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function editdepartment($id)
  {
    try {
      $data = DB::select('call edit_department(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updatedepartment(Request $request, $id)
  {
    try {
      $data = DB::select('call update_department(?,?,?,?,?,@result)', array($id, $request->dept_name, $request->college_id, $request->entry_by, $request->course_id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function deletedepartment($id)
  {
    try {
      DB::select('call delete_department(?,@result)', array($id));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // log details
  public function addlogdetails(Request $request)
  {
    try {
      DB::select('call add_log_details(?,?,?)', array($request->user_id, $request->ip(), $request->process));
      return response()->json('Log_details Added Successfully');
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function getlogdetails()
  {
    try {
      $data = DB::select('call get_log_details()');
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function editlogdetails($id)
  {
    try {
      $data = DB::select('call edit_log_details(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updatelogdetails(Request $request, $id)
  {
    try {
      DB::select('call update_log_details(?,?,?,?,@result)', array($id, $request->user_id, $request->ip_address, $request->process));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // <!-- delete_log_details -->
  public function deletelogdetails($id)
  {
    try {
      DB::select('call delete_log_details(?,@result)', array($id));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function login(Request $request)
  {
    try {
      $login = User::where('email', $request->email)->where('password', $request->password)->where('user_status', 'active')->first();
      if ($login) {
        $token = $login->createToken('AuthToken');
        $nav_page_name = DB::table('users')->select('navigation_pages.nav_page_name', 'navigation_pages.path_nav')
          ->join('assign_roles', 'users.user_id', '=', 'assign_roles.user_id')
          ->join('user_roles', 'assign_roles.user_role_id', '=', 'user_roles.user_role_id')
          ->join('assign_navigations', 'assign_roles.user_role_id', '=', 'assign_navigations.user_role_id')
          ->join('navigation_pages', 'assign_navigations.nav_page_id', '=', 'navigation_pages.nav_page_id')
          ->where('users.email', $request->email)
          ->where('users.password', $login->password)
          ->where('users.user_status', 'active')->get();
        $user_roles = DB::table('users')->select('user_roles.user_role', 'user_roles.user_role_id')
          ->join('assign_roles', 'users.user_id', '=', 'assign_roles.user_id')
          ->join('user_roles', 'assign_roles.user_role_id', '=', 'user_roles.user_role_id')
          ->where('users.email', $request->email)
          ->where('users.password', $login->password)
          ->where('users.user_status', 'active')->get();
        return response()->json([$login, $nav_page_name, $user_roles, 'status' => 1, $token->plainTextToken]);
      } else {
        return response()->json(['Invalid Email And Password', 'status' => 0], 403);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // User Role
  public function adduserrole(Request $request)
  {
    try {
      $duplicate = DB::table('user_roles')->where('user_role', '=', $request->user_role)->where('college_id', '=', $request->college_id)->get();
      if (count($duplicate) > 0) {
        return response()->json('Duplicate Data Entry');
      } else {
        DB::select('call add_user_role(?,?,?,@result)', array($request->user_role, $request->college_id, $request->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function getuserrole($id)
  {
    try {
      $data = DB::select('call get_user_role(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edituserrole($id)
  {
    try {
      $data = DB::select('call edit_user_role(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updateuserrole(Request $request, $id)
  {
    try {
      DB::select('call update_user_role(?,?,?,?,@result)', array($id, $request->user_role, $request->college_id, $request->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // <!-- delete_user_role -->
  public function deleteuserrole($id)
  {
    try {
      DB::select('call delete_user_role(?,@result)', array($id));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // document
  public function adddocumenttype(Request $request)
  {
    try {
      $data = DB::select("select * from document_types where document_type='$request->document_type' and college_id='$request->college_id'");
      if (count($data) > 0) {
        return response()->json('Document Type Already Added');
      } else {
        DB::select('call add_document_type(?,?,?,@result)', array($request->document_type, $request->college_id, $request->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function getdocumenttype($clg_id = null)
  {
    try {
      if ($clg_id == null) {
        $data = DB::select('call get_document_type(?)'[null]);
      } else {
        $data = DB::select('call get_document_type(?)', [$clg_id]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function editdocumenttype($id)
  {
    try {
      $data = DB::select('call edit_document_type(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updatedocumenttype(Request $request, $id)
  {
    try {
      DB::select('call update_document_type(?,?,?,@result)', array($id, $request->document_type, $request->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function deletedocumenttype($id)
  {
    try {
      DB::select('call delete_document_type(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book issue
  public function std_emp_book_issue(Request $request)
  {
    try {
      $d = $request->all();
      $sData = json_decode($d['selectedData']);
      foreach ($sData as $sd) {
        DB::select('call student_employee_book_issue(?,?,?,?,?,?,?)', array($sd->issue_type_id, $sd->accession_no, $request->user_id, "issued", $request->user_type, $request->entry_by, $request->college_id));
        DB::table('books')->where('accession_no', $sd->accession_no)->update(['book_status' => 'issued']);
      }
      return response()->json("Book Issued Successfully");
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function dept_book_issue(Request $request)
  {
    try {
      $d = $request->all();
      $sData = json_decode($d['selectedData']);
      $image = $request->file('document');
      $image2 = time() . '.' . $image->getClientOriginalExtension();
      $path = public_path('department_book_issue');
      $image->move($path, $image2);
      foreach ($sData as $sd) {
        DB::select('call department_book_issue(?,?,?,?,?,?,?,?,?,?,?,?,?)', array($sd->accession_no, $request->emp_name, $request->user_id, $request->emp_id, $request->emp_email, $request->emp_contact, $request->dept_id, $request->designation, $image2, "issued", $request->user_type, $request->entry_by, $request->college_id));
        DB::table('books')->where('accession_no', $sd->accession_no)->update(['book_status' => 'issued']);
      }

      return response()->json("Book Issued Successfully");
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  //===================================== Nita Part==========================================


  public function add_author(Request $req)
  {
    try {
      $duplicate = DB::table('authors')->where('author_name', '=', $req->author_name)
        ->where('college_id', $req->college_id)->get();
      if (count($duplicate) > 0) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('Call add_author(?,?,?,@result)', array($req->author_name, $req->college_id, $req->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_author($clg_id = null)
  {
    try {
      if ($clg_id == null) {
        $data = DB::select('call get_author(?)', [null]);
      } else {
        $data = DB::select('call get_author(?)', [$clg_id]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_author(Request $req, $id)
  {
    try {
      $data = DB::select('Call del_author(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // public function search_author($author_name)
  // {
  //     $res = DB::table('authors')->where('author_name', 'like', '%' . $author_name . '%')->get();
  //     return response()->json($res);
  // }

  public function edit_author(Request $req, $id)
  {
    try {
      $data = DB::select('Call edit_author(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_author(Request $req, $id)
  {
    try {
      $data = DB::select('Call updt_auth(?,?,?,?,@result)', array($id, $req->author_name, $req->college_id, $req->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  // Bill Detail
  public function add_bill_details(Request $req)
  {
    try {
      //  image upload
      $bill_doc = $req->file('bill_doc');
      if ($bill_doc != null) {
        $name = time() . '.' . $bill_doc->getClientOriginalExtension();
        $duplicate = DB::table('bill_details')->where('bill_num', '=', $req->bill_num)
          ->where('vendor_id', '=', $req->vendor_id)
          ->where('college_id', '=', $req->college_id)->get();
        if (count($duplicate) > 0) {
          return response()->json('Duplicate Data Entry');
        } else {
          $data = DB::select('Call add_bill_details (?,?,?,?,?,?,@result)', array($req->bill_num, $name, $req->vendor_id, $req->bill_date, $req->college_id, $req->entry_by));
          $res = DB::select('SELECT @result AS res');
          $path = public_path('Bill_doc');
          $bill_doc->move($path, $name);
          return response()->json($res[0]->res);
        }
      } else {
        $duplicate = DB::table('bill_details')->where('bill_num', '=', $req->bill_num)
          ->where('vendor_id', '=', $req->vendor_id)
          ->where('college_id', '=', $req->college_id)->get();
        if (count($duplicate) > 0) {
          return response()->json('Duplicate Data Entry');
        } else {
          $data = DB::select('Call add_bill_details (?,?,?,?,?,?,@result)', array($req->bill_num, '', $req->vendor_id, $req->bill_date, $req->college_id, $req->entry_by));
          $res = DB::select('SELECT @result AS res');
          return response()->json($res[0]->res);
        }
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_bill_details(Request $req, $clg_id)
  {
    try {
      $data = DB::select('Call get_bill_details(?)', [$clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_bill_details(Request $req, $id)
  {
    try {
      $data = DB::select('Call delete_bill_details(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_bill_details(Request $req, $id)
  {
    try {
      $data = DB::select('Call edit_bill_details(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_bill_details(Request $req, $id)
  {
    try {
      $d = DB::table('bill_details')->where('bill_id', $id)->first();
      if (!$req->file('bill_doc')) {
        $name = $d->bill_doc;
      } else {
        $bill_doc = $req->file('bill_doc');
        $name = time() . '.' . $bill_doc->getClientOriginalExtension();
        $path = public_path('Bill_doc');
        $bill_doc->move($path, $name);
      }
      $data = DB::select('Call update_bill_details(?,?,?,?,?,?,?,@result)', array($id, $req->bill_num, $name, $req->vendor_id, $req->bill_date, $req->college_id, $req->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  //Book Location
  public function add_book_loc(Request $req)
  {
    try {
      $duplicate = DB::table('book_locations')->where('almirah_no', '=', $req->almirah_no)
        ->where('shelf_no', '=', $req->shelf_no)
        ->where('rack_no', '=', $req->rack_no)
        ->where('college_id', '=', $req->college_id)->get();
      if (count($duplicate)) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('Call add_book_loc (?,?,?,?,?,@result)', array($req->almirah_no, $req->shelf_no, $req->rack_no, $req->college_id, $req->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_book_loc(Request $req, $id)
  {
    try {
      $data = DB::select('Call get_book_loc(?)', [$id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_book_loc(Request $req, $id)
  {
    try {
      $data = DB::select('Call del_book_loc(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_book_loc(Request $req, $id)
  {
    try {
      $data = DB::select('Call edit_book_loc(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_book_loc(Request $req, $id)
  {
    try {
      $data = DB::select('Call update_book_loc(?,?,?,?,?,?,@result)', array($id, $req->almirah_no, $req->shelf_no, $req->rack_no, $req->college_id, $req->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  //Book Tittles
  public function add_book_ttl(Request $req)
  {
    try {
      $duplicate = DB::table('book_titles')->where('college_id', '=', $req->college_id)->where('book_title_name', $req->book_title_name)->get();
      if (count($duplicate)) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('Call add_book_ttl (?,?,?,@result)', array($req->book_title_name, $req->college_id, $req->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_book_ttl($id)
  {
    try {
      $data = DB::select('Call get_book_ttl(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_book_ttl($id)
  {
    try {
      $data = DB::select('Call del_book_ttl(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function search_bok_ttl($title_name)
  {
    try {
      $res = DB::table('book_titles')->where('title_name', 'like', '%' . $title_name . '%')->get();
      return response()->json($res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_book_ttl(Request $req, $id)
  {
    try {
      $data = DB::select('Call edit_book_ttl(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_book_ttl(Request $req, $id)
  {
    try {
      $data = DB::select('Call updt_book_ttl(?,?,?,?,@result)', array($id, $req->book_title_name, $req->college_id, $req->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  // Course
  public function add_courses(Request $req)
  {
    try {
      $duplicate = DB::table('courses')->where('college_id', '=', $req->college_id)
        ->where('course_name', '=', $req->course_name)->get();
      if (count($duplicate) > 0) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('Call add_course (?,?,?,@result)', array($req->course_name, $req->college_id, $req->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_courses($clg_id = null)
  {
    try {
      if ($clg_id != null) {
        $data = DB::select('CALL get_crs(?)', array($clg_id));
      } else {
        $data = DB::select('Call get_crs(?)', [null]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_courses(Request $req, $id)
  {
    try {
      $data = DB::select('Call del_crs(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function search_courses($title_name)
  {
    try {
      $res = DB::table('courses')->where('course_name', 'like', '%' . $title_name . '%')->get();
      return response()->json($res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_courses(Request $req, $id)
  {
    try {
      $data = DB::select('Call edit_crs(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_courses(Request $req, $id)
  {
    try {
      $data = DB::select('Call updt_crs(?,?,?,?,@result)', array($id, $req->course_name, $req->college_id, $req->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  //Assign Role
  public function add_assign_role(Request $req)
  {
    try {
      $data = DB::table('assign_roles')
        ->where('user_id', $req->user_id)
        ->where('user_role_id', $req->user_role_id)
        ->where('college_id', $req->college_id)->get();
      if (count($data) > 0) {
        return response()->json("Role Already Assigned");
      } else {
        $data = DB::select('Call add_assign_role (?,?,?,?,@result)', array($req->user_id, $req->user_role_id, $req->college_id, $req->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_assign_role(Request $req)
  {
    try {
      $data = DB::select('Call get_assign_role()');
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_assign_role($id, $user_id)
  {
    try {
      $count = DB::select("select count(user_roles.user_role) user_role from users join assign_roles on users.user_id=assign_roles.user_id 
      join user_roles on assign_roles.user_role_id=user_roles.user_role_id where users.user_id=$user_id");
      if ($count[0]->user_role == 1) {
        return response()->json("Primary role cann't be deleted");
      } else {
        $data = DB::select('Call del_assign_role(?,@result)', array($id));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_assign_role(Request $req, $id)
  {
    try {
      $data = DB::select('Call edit_assign_role(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_assign_role(Request $req, $id)
  {
    try {
      $data = DB::select('Call updt_assign_role(?,?,?,@result)', array($id, $req->user_id, $req->user_role_id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  // Assign Navigation
  public function add_assign_nav(Request $req)
  {
    try {
      $data = $req->all();
      for ($i = 0; $i < count($data); $i++) {
        if (count(DB::table('assign_navigations')->where('user_role_id', $data[$i]['role'])->where('nav_page_id', $data[$i]['id'])->get()) > 0) {
          continue;
        }
        DB::select('Call add_assign_nav (?,?,?,@result)', array($data[$i]['role'], $data[$i]['id'], $data[$i]['entry_by']));
      }
      $res = DB::select('SELECT @result as res');
      return response()->json($res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_assign_nav(Request $req)
  {
    try {
      $data = DB::select('Call get_assign_nav()');
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_assign_nav(Request $req, $id)
  {
    try {
      $data = DB::select('Call del_assign_nav(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_assign_nav(Request $req, $id)
  {
    try {
      $data = DB::select('Call edit_assign_nav(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_assign_nav(Request $req, $id)
  {
    try {
      $data = DB::select('Call updt_assign_nav(?,?,?,@result)', array($id, $req->nav_page_name, $req->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  // SEARCH_NAV
  public function search_nav($id)
  {
    try {
      $data = DB::select('Call search_nav(?)', array($id));
      return response()->json($data);
    } catch (\Exception $exception) {
      return response()->json($exception->getMessage(), 500);
    }
  }


  // Navigation Pages
  public function add_nav_page(Request $req)
  {
    try {
      $data = DB::select('Call add_nav_page (?,?,?,@result)', array($req->nav_page_name, $req->entry_by, $req->path_nav));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_nav_page()
  {
    try {
      $data = DB::select('Call get_nav_page()');
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_nav_page($id)
  {
    try {
      $data = DB::select('Call del_nav_page(?,@result)', array($id));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_nav_page($id)
  {
    try {
      $data = DB::select('Call edit_nav_page(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_nav_page(Request $req, $id)
  {
    try {
      $data = DB::select('Call updt_nav_page(?,?,?,?,@result)', array($id, $req->nav_page_name, $req->entry_by, $req->path_nav));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //   ================================Pankaj Part========================================
  public function addCollege(Request $req)
  {
    $duplicate = DB::table('colleges')->where('college_name', $req->college_name)->where('college_email', $req->college_email)->get();
    if (count($duplicate) > 0) {
      return response()->json('Duplicate Data Entry');
    } else {
      $data = DB::select('CALL add_college(?,?,?,?,?,?,@result)', array($req->college_name, $req->college_address, $req->phone_no, $req->college_email, $req->entry_by, $req->short_name));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    }
  }
  public function getCollege($id = null)
  {
    if ($id != null) {
      $data = DB::select('CALL get_college(?)', [$id]);
    } else {
      $data = DB::select('CALL get_college(?)', [null]);
    }
    return response()->json($data);
  }

  public function editCollege($id)
  {
    $data = DB::select('CALL edit_college(?)', array($id));
    return response()->json($data);
  }

  public function updateCollege(Request $req, $id)
  {
    $data = DB::select('CALL updt_college(?,?,?,?,?,?,?,@result)', array($id, $req->college_name, $req->college_address, $req->phone_no, $req->college_email, $req->entry_by, $req->short_name));
    $res = DB::select('SELECT @result AS res');
    return response()->json($res[0]->res);
  }

  public function delCollege(Request $req, $id)
  {
    $data = DB::select('CALL del_college(?,@result)', array($id));
    $res = DB::select('SELECT @result AS res');
    return response()->json($res[0]->res);
  }

  public function searechCollege(Request $req, $clgnm)
  {
    $data = DB::table('colleges')->where('college_name', 'like', '%' . $clgnm . '%')->get();
    return response()->json($data);
  }
  // currency--------------------------------------

  public function addCurrency(Request $req)
  {

    $duplicate = DB::table('currencies')->where('curr_type', '=', $req->curr_type)->where('college_id', '=', $req->college_id)->get();

    if (count($duplicate) > 0) {
      return response()->json('Duplicate Data Entry');
    } else {
      try {
        $data = DB::select('CALL add_currency(?,?,?,@result)', array($req->curr_type, $req->college_id, $req->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      } catch (\Exception $except) {
        return response()->json($except->getMessage(), 500);
      }
    }
  }

  public function getCurrency($clg_id = null)
  {
    if ($clg_id == null) {
      $data = DB::select('CALL get_currency(?)', [null]);
    } else {
      $data = DB::select('CALL get_currency(?)', array($clg_id));
    }
    return response()->json($data);
  }

  public function editCurrency($id)
  {
    $data = DB::select('CALL edit_currency(?)', [$id]);
    return response()->json($data);
  }

  public function updateCurrency(Request $req, $id)
  {
    try {
      $data = DB::select('CALL updt_currency(?,?,?,@result)', [$id, $req->curr_type, $req->entry_by]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $exception) {
      return response()->json($exception->getMessage(), 500);
    }
  }

  public function searchCurrency($search)
  {
    try {
      $data = DB::table('currencies')->where('curr_type', 'like', '%' . $search . '%')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function deleteCurrency($id)
  {
    try {
      $data = DB::select('CALL del_currency(?,@result)', [$id]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // fine collections-----------------------------------------

  public function addFineCollection(Request $req)
  {
    try {
      if ($req->file('document') == null) {
        $document = null;
      } else {
        $doc = $req->file('document');
        $document = time() . '.' . $doc->getClientOriginalExtension();
        $path = public_path('FIneCollectionDocument');
        $doc->move($path, $document);
      }
      DB::select('CALL add_fineCollection(?,?,?,?,?,?,?,?,?,@result)', array($req->fine_policy_id, $req->library_card_no, $req->accession_id, $req->reason, $req->fine_amount, $req->paid_amount, $document, $req->college_id, $req->entry_by));
      $update_book_issue = DB::table('book_issues')
        ->where('accession_no', $req->accession_id)
        ->where('user_id', $req->user_id)
        ->where('college_id', $req->college_id)
        ->update(['book_issue_status' => 'returned', 'return_entry_by' => $req->return_entry_by, 'return_date' => NOW(), 'updated_at' => NOW()]);
      $update_book = DB::table('books')
        ->where('accession_no', $req->accession_id)
        ->where('college_id', $req->college_id)
        ->update(['book_status' => 'inlibrary']);
      if ($update_book) {
        return response()->json('Book Returned Successfully');
      } else {
        return response()->json('Something went wrong');
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function getFineCollection($id = null)
  {
    try {
      if ($id != null) {
        $data = DB::select('CALL get_finecollection(?)', array($id));
      } else {
        $data = DB::select('CALL get_finecollection(?)', array(null));
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function editFineCollection(Request $req, $id)
  {
    try {
      $data = DB::select('CALL edit_finecollection(?)', array($id));
      return response()->json(count($data));
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function edt_fine_collection($id)
  {
    try {
      $data = DB::select('call edit_fine_collection(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updateFineCollection(Request $req, $id)
  {
    try {
      $data = DB::select('CALL updt_finecollection(?,?,?,?,?,?,?,@result)', array($id, $req->libcard_no, $req->accession_id, $req->reason, $req->fine_amount, $req->document, $req->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function deleteFineCollection(Request $req, $id)
  {
    try {
      $data = DB::select('CALL del_finecollection(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // fine Policy  ------------------------------------------

  public function addFinePolicy(Request $req)
  {
    try {
      $data = DB::select('CALL add_finepolicy(?,?,?,?,?,?,?,@result)', [
        $req->user_type, $req->issue_type_id, $req->exceed_days,
        $req->fine_policy_amount, $req->status, $req->college_id, $req->entry_by
      ]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function getFinePolicy($clg_id = null)
  {
    try {
      if ($clg_id != null) {
        $data = DB::select('CALL get_finepolicy(?)', [$clg_id]);
      } else {
        $data = DB::select('CALL get_finepolicy(?)', [null]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function editFinePolicy(Request $req, $id)
  {
    try {
      $data = DB::select('CALL edit_finepolicy(?)', [$id]);
      if ($data == null) {
        return response()->json('No data found!');
      } else {
        return response()->json($data);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function deleteFinePolicy(Request $req, $id)
  {
    try {
      $data = DB::select('CALL del_finepolicy(?,@result)', [$id]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updateFinePolicy(Request $req, $id)
  {
    try {
      $data = DB::select('CALL updt_finepolicy(?,?,?,?,?,?,?,@result)', [$id, $req->user_role_id, $req->issue_type_id, $req->exceed_days, $req->fine_policy_amount, $req->status, $req->entry_by]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // Book-------------------------------------
  public function addBook(Request $req)
  {
      try {
          // Retrieve short name prefix in one query
          $shortName = DB::table('colleges')
              ->where('college_id', $req->college_id)
              ->pluck('short_name')
              ->first();
  
          if (!$shortName) {
              return response()->json(['error' => 'Invalid College ID'], 400);
          }
  
          // Get the last accession number using efficient ordering
          $lastAccession = DB::table('books')
              ->where('accession_no', 'LIKE', $shortName . '%')
              ->orderByRaw('CAST(SUBSTRING(accession_no, LENGTH(?) + 1) AS UNSIGNED) DESC', [$shortName])
              ->value('accession_no'); // Use value() instead of pluck() for a single column
  
          // Extract numeric part of the last accession number
          $lastNumber = $lastAccession ? (int)substr($lastAccession, strlen($shortName)) : 0;
  
          // Number of copies to insert
          $numCopies = (int) $req->num_copies;
  
          // Determine the length of the numeric part based on the last accession number
          $numberLength = $lastAccession ? strlen(substr($lastAccession, strlen($shortName))) : 1;
  
          // Generate new accession numbers
          $newAccessionNos = [];
          for ($i = 0; $i < $numCopies; $i++) {
              $newAccessionNos[] = $shortName . str_pad($lastNumber + $i + 1, $numberLength, '0', STR_PAD_LEFT);
          }
  
          // Check for existing accession numbers efficiently
          $existingAccessionNos = Book::whereIn('accession_no', $newAccessionNos)->pluck('accession_no')->toArray();
  
          if (!empty($existingAccessionNos)) {
              return response()->json(['error' => 'One or more Accession Numbers already exist'], 400);
          }
  
          // Handle file upload if present
          $bookImage = $req->hasFile('book_image') ? $this->uploadFile($req->file('book_image')) : null;
  
          // Prepare data for batch insertion
          $booksData = array_map(function ($accessionNo) use ($req, $bookImage) {
              return [
                  'accession_no' => $accessionNo,
                  'book_title_id' => $req->book_title_id,
                  'first_author_id' => $req->first_author_id,
                  'second_author_id' => $req->second_author_id,
                  'third_author_id' => $req->third_author_id,
                  'publisher_id' => $req->publisher_id,
                  'volume' => $req->volume,
                  'editor' => $req->editor,
                  'translator' => $req->translator,
                  'compiler' => $req->compiler,
                  'edition' => $req->edition,
                  'edition_year' => $req->edition_year,
                  'publish_year' => $req->publish_year,
                  'no_of_pages' => $req->no_of_pages,
                  'isbn_no' => $req->isbn_no,
                  'language' => $req->language,
                  'series' => $req->series,
                  'source' => $req->source,
                  'content' => $req->content,
                  'currency_id' => $req->currency_id,
                  'document_id' => $req->document_id,
                  'vendor_id' => $req->vendor_id,
                  'bill_id' => $req->bill_id,
                  'suppl_copies' => $req->suppl_copies,
                  'abstract' => $req->abstract,
                  'nature_of_binding' => $req->nature_of_binding,
                  'entry_date' => $req->entry_date,
                  'notes' => $req->notes,
                  'keywords' => $req->keywords,
                  'call_no' => $req->call_no,
                  'book_price' => $req->book_price,
                  'book_image' => $bookImage,
                  'college_id' => $req->college_id,
                  'location_id' => $req->location_id,
                  'book_status' => 'inlibrary',
                  'entry_by' => $req->entry_by,
                  'created_at' => now(),
                  'updated_at' => now()
              ];
          }, $newAccessionNos);
  
          // Bulk insert records
          Book::insert($booksData);
  
          return response()->json(['message' => 'Books Added Successfully']);
      } catch (\Exception $e) {
          // Exception handling
          Log::error('Exception occurred:', ['exception' => $e->getMessage()]);
          return response()->json(['error' => $e->getMessage()], 500);
      }
  }
  
  /**
   * Handle file upload
   *
   * @param \Illuminate\Http\UploadedFile $file
   * @return string|null
   */
  protected function uploadFile($file)
  {
      $filename = time() . '.' . $file->getClientOriginalExtension();
      $path = public_path('BookImage');
      $file->move($path, $filename);
      return $filename;
  }
  
  
  

  
  


  // public function addBook(Request $req)
  // {
  //   try {
  //     $accessionNoExists = DB::table('books')->where('accession_no', $req->accession_no_from)->exists();
        
  //     // if ($accessionNoExists) {
  //     //     return response()->json(['error' => 'Accession Number already exists'], 400);
  //     // } 
  //     $shortName = DB::table('colleges')->where('college_id', $req->college_id)->get('short_name');
  //     // $isbn = explode(",", $req->isbn_no);
  //     $image = $req->file('book_image');
  //     if ($image != null) {
  //       $book_image = time() . '.' . $image->getClientOriginalExtension();
  //       $d = $req['accession_no_to'] - $req['accession_no_from'];
  //       for ($i = 1; $i <= $d; $i++) {
  //         $temp = $shortName[0]->short_name . ($req['accession_no_from'] + ($i));
  //         $data = DB::select(
  //           'CALL add_book(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@result)',
  //           [
  //             $temp, $req->book_title_id, $req->first_author_id, $req->second_author_id, $req->third_author_id, $req->publisher_id, $req->volume,
  //             $req->editor, $req->translator, $req->compiler, $req->edition, $req->edition_year,
  //             $req->publish_year, $req->no_of_pages, $req->isbn_no, $req->language, $req->series, $req->source, $req->content, $req->currency_id, $req->document_id, $req->subject_id, $req->vendor_id, $req->bill_id, $req->suppl_copies, $req->abstract, $req->nature_of_binding, $req->notes, $req->keywords, $req->call_no, $req->book_price, $book_image, $req->college_id, $req->location_id, $req->entry_by
  //           ]
  //         );
  //         $res = DB::select('SELECT @result AS res');
  //       }
  //       if ($res[0]->res = 'Book Added Successfully') {
  //         $path = public_path('BookImage');
  //         $image->move($path, $book_image);
  //       }
  //     } else {
  //       $d = $req['accession_no_to'] - $req['accession_no_from'];
  //       for ($i = 1; $i <= $d; $i++) {
  //         $temp = $shortName[0]->short_name . ($req['accession_no_from'] + ($i));
  //         $data = DB::select(
  //           'CALL add_book(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@result)',
  //           [
  //             $temp, $req->book_title_id, $req->first_author_id, $req->second_author_id, $req->third_author_id, $req->publisher_id, $req->volume,
  //             $req->editor, $req->translator, $req->compiler, $req->edition, $req->edition_year,
  //             $req->publish_year, $req->no_of_pages, $req->isbn_no, $req->language, $req->series, $req->source, $req->content, $req->currency_id, $req->document_id, $req->subject_id, $req->vendor_id, $req->bill_id, $req->suppl_copies, $req->abstract, $req->nature_of_binding, $req->notes, $req->keywords, $req->call_no, $req->book_price, '', $req->college_id, $req->location_id, $req->entry_by
  //           ]
  //         );
  //         $res = DB::select('SELECT @result AS res');
  //       }
  //     }

  //     return response()->json($res[0]->res);
  //   } catch (\Exception $e) {
  //     // Exception handling
  //     return response()->json(['error' => $e->getMessage()], 500);
  //   }
  // }

  public function get_books($id)
  {
    try {
      // $data = DB::table('books')
      //   ->join('book_titles', 'books.book_title_id', '=', 'book_titles.book_title_id')
      //   ->leftJoin('authors', 'books.first_author_id', '=', 'authors.author_id')
      //   ->leftjoin('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
      //   ->join('document_types', 'books.document_id', '=', 'document_types.document_id')
      //   ->join('subjects', 'books.subject_id', '=', 'subjects.subject_id')
      //   ->leftjoin('vendors', 'books.vendor_id', '=', 'vendors.vendor_id')
      //   ->leftjoin('bill_details', 'books.bill_id', '=', 'bill_details.bill_id')
      //   ->leftjoin('colleges', 'books.college_id', '=', 'colleges.college_id')
      //   ->leftjoin('book_locations', 'books.location_id', '=', 'book_locations.location_id')
      //   ->where('books.college_id', '=', $id)->get();
      $data = DB::select("call get_book_details(?)", array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_books($id)
  {
    try {
      $data = DB::select('CALL edit_books(?)', [$id]);
      if ($data == null) {
        return response()->json('No data found!');
      } else {
        return response()->json($data);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_books(Request $req, $id)
  {
    try {
      $data = DB::select('CALL del_books(?,@result)', [$id]);
      $res = DB::select('SELECT @result AS res');
      if ($res[0]->res == 'Failed') {
        return response()->json('Book can not be deleted');
      } else {
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updt_books(Request $req)
  {
    try {
      $d = DB::table('books')->where('book_id', $req->book_id)->first();
      if ($req->file('book_image') == null) {
        $book_image = $d->book_image;
      } else {
        $image = $req->file('book_image');
        $book_image = time() . '.' . $image->getClientOriginalExtension();
        $path = public_path('BookImage');
        $image->move($path, $book_image);
      }
      if ($req->first_author_id != null) {
        $data = DB::select(
          'call updt_books(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@result)',
          [
            $req->book_id,
            $req->accession_no,
            $req->book_title_id,
            $req->first_author_id,
            $req->second_author_id,
            $req->third_author_id,
            $req->publisher_id,
            $req->volume,
            $req->editor,
            $req->translator,
            $req->compiler,
            $req->edition,
            $req->edition_year,
            $req->publish_year,
            $req->no_of_pages,
            $req->isbn_no,
            $req->language,
            $req->series,
            $req->source,
            $req->content,
            $req->currency_id,
            $req->subject_id,
            $req->vendor_id,
            $req->bill_id,
            $req->suppl_copies,
            $req->abstract,
            $req->nature_of_binding,
            $req->notes,
            $req->keywords,
            $req->call_no,
            $req->book_price,
            $book_image,
            $req->college_id,
            $req->location_id,
            $req->book_status,
            $req->entry_by,
            $req->document_id
          ]
        );
      } else {
        $data = DB::select(
          'call updt_books(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@result)',
          [
            $req->book_id,
            $req->accession_no,
            $req->book_title_id,
            $d->first_author_id,
            $req->second_author_id,
            $req->third_author_id,
            $req->publisher_id,
            $req->volume,
            $req->editor,
            $req->translator,
            $req->compiler,
            $req->edition,
            $req->edition_year,
            $req->publish_year,
            $req->no_of_pages,
            $req->isbn_no,
            $req->language,
            $req->series,
            $req->source,
            $req->content,
            $req->currency_id,
            $req->subject_id,
            $req->vendor_id,
            $req->bill_id,
            $req->suppl_copies,
            $req->abstract,
            $req->nature_of_binding,
            $req->notes,
            $req->keywords,
            $req->call_no,
            $req->book_price,
            $book_image,
            $req->college_id,
            $req->location_id,
            $req->book_status,
            $req->entry_by,
            $req->document_id
          ]
        );
      }
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // ==================================== Biplab Part ===============================================
  // VENDER

  //insert

  public function addvender(Request $request)
  {
    try {
      $vender_name = $request->vendor_name;
      $vender_email = $request->vendor_email;
      $vender_contact = $request->vendor_contact;
      $vender_address = $request->vendor_address;
      $college_id = $request->college_id;
      $entry_by = $request->entry_by;

      $duplicate = DB::table('vendors')->where('vendor_name', '=', $request->vendor_name)
        ->where('vendor_email', '=', $request->vendor_email)->get();
      if (count($duplicate)) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('call vendors(?,?,?,?,?,?,@result)', array($vender_name, $vender_email, $vender_contact, $vender_address, $college_id, $entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    fetch

  public function getvenders($clg_id)
  {
    try {
      $data = DB::select('call get_vender(?)', [$clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    edit

  public function editvender($id)
  {
    try {
      $data = DB::select('call edit_vendors(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // update
  public function updatevender(Request $request, $idd)
  {
    try {
      $vender_name = $request->vendor_name;
      $vender_email = $request->vendor_email;
      $vender_contact = $request->vendor_contact;
      $vender_address = $request->vendor_address;
      $entry_by = $request->entry_by;
      $college_id = $request->college_id;

      DB::select('call update_vendors(?,?,?,?,?,?,?,@result)', array($idd, $vender_name, $vender_email, $vender_contact, $vender_address, $college_id, $entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // delete
  public function deletevender($id)
  {
    try {
      DB::select('call delete_vendor(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // USERS

  // insert

  public function adduser(Request $request)
  {
    try {
      $duplicate = DB::table('users')->where('name', '=', $request->name)
        ->where('email', '=', $request->email)->get();
      if (count($duplicate) > 0) {
        return response()->json('Data Already Exist');
      } else {
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $contact = $request->contact;
        $address = $request->address;
        $gender = $request->gender;

        //  image upload
        $image = $request->file('image');
        $image2 = time() . '.' . $image->getClientOriginalExtension();
        $path = public_path('studentphoto');
        $image->move($path, $image2);

        // document upload
        if (!$request->file('document')) {
          $document2 = null;
        } else {
          $document = $request->file('document');
          $document2 = time() . '.' . $document->getClientOriginalExtension();
          $path2 = public_path('studentDocument');
          $document->move($path2, $document2);
        }

        //  $document=$request->document;
        $library_card_number = 'LIB' . date('Y') . rand(100000, 999999);
        if (!$request->batch_year) {
          $batch_year = null;
        } else {
          $batch_year = $request->batch_year;
        }
        $designation = $request->designation;
        $college_id = $request->college_id;
        if (!$request->dept_id) {
          $dept_id = null;
        } else {
          $dept_id = $request->dept_id;
        }
        if (!$request->course_id) {
          $course_id = null;
        } else {
          $course_id = $request->course_id;
        }
        $user_status = 'active';
        $entry_by = $request->entry_by;
        $data = DB::select('call add_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@result)', array(
          $name, $email, $password, $contact, $address, $gender, $image2, $document2, $library_card_number, $batch_year, $designation, $course_id, $dept_id, $college_id, $user_status, $entry_by
        ));
        $res = DB::select('SELECT @result AS res');
        if ($res[0]->res == 'Added Successfully!') {
          $data = DB::select('SELECT * FROM users order by user_id desc limit 1');
          DB::table('assign_roles')->insert(['user_id' => $data[0]->user_id, 'user_role_id' => $request->user_role_id, 'college_id' => $college_id, 'entry_by' => $entry_by]);
          return response()->json($res[0]->res);
        } else {
          return response()->json('Something Went Wrong');
        }
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    fetch

  public function getusers()
  {
    try {
      $data = DB::select('call get_user()');
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    edit

  public function edituser($id)
  {
    try {
      $data = DB::select('call edit_user(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // delete
  public function deleteuser($id)
  {
    try {
      DB::select('call delete_user(?)', array($id));
      return response()->json('deleted successfully');
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // update
  public function updateuser(Request $request)
  {
    try {
      $id = $request->user_id;
      $data = DB::table('users')->where('user_id', $id)->first();
      $name = $request->name;
      $email = $request->email;
      $contact = $request->contact;
      $address = $request->address;
      $gender = $request->gender;

      //  image upload
      if (!$request->file('image')) {
        $image2 = $data->image;
      } else {
        $image = $request->file('image');
        $image2 = time() . '.' . $image->getClientOriginalExtension();
        $path = public_path('studentphoto');
        $image->move($path, $image2);
      }
      // document upload
      if (!$request->file('document')) {
        $document2 = $data->document;
      } else {
        $document = $request->file('document');
        $document2 = time() . '.' . $document->getClientOriginalExtension();
        $path2 = public_path('studentDocument');
        $document->move($path2, $document2);
      }
      if ($request->batch_year == null) {
        $batch_year = $data->batch_year;
      } else {
        $batch_year = $request->batch_year;
      }
      $designation = $request->designation;
      if (!$request->college_id || $request->college_id == null || $request->college_id == 'undefined') {
        $college_id = null;
      } else {
        $college_id = $request->college_id;
      }
      if ($request->dept_id == null || $request->dept_id == 'undefined') {
        $dept_id = $data->dept_id;
      } else {
        $dept_id = $request->dept_id;
      }
      if ($request->course_id == null || $request->course_id == 'undefined') {
        $course_id = $data->course_id;
      } else {
        $course_id = $request->course_id;
      }
      $user_status = $request->user_status;
      $entry_by = $request->entry_by;
      $data = DB::select('call update_users(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@result)', array(
        $id, $name, $email, $contact,
        $address, $gender, $image2, $document2, $batch_year, $designation, $course_id, $dept_id, $college_id, $user_status, $entry_by
      ));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // publisher

  // insert

  public function addpublisher(Request $request)
  {
    try {
      $data = DB::select('call add_publisher(?,?,?,?,@result)', array($request->publisher_name, $request->publisher_place, $request->college_id, $request->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    fetch

  public function getpublisher($id = null)
  {
    try {
      if ($id == null) {
        $data = DB::select('call get_publisher(?)', [null]);
      } else {
        $data = DB::select('call get_publisher(?)', array($id));
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    edit

  public function editpublisher($id)
  {
    try {
      $data = DB::select('call edit_publisher(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // <!-- delete_publisher-->
  public function deletepublisher($id)
  {
    try {
      DB::select('call del_publisher(?,@result)', array($id));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updatepublisher(Request $request, $idd)
  {
    try {
      $data = DB::select('call update_publisher(?,?,?,?,?,@result)', array($idd, $request->publisher_name, $request->publisher_place, $request->college_id, $request->entry_by));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // ISSUE_TYPE

  // insert

  public function addisuetype(Request $request)
  {
    try {
      $duplicate = DB::table('issue_types')->where('issue_type', '=', $request->issue_type)
        ->where('college_id', $request->college_id)->get();
      if (count($duplicate) > 0) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('call add_issue_types(?,?,?,?)', array($request->issue_type, $request->issue_days, $request->college_id, $request->entry_by));
        return response()->json("Added successfully!!");
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    fetch

  public function getissuetype($clg_id = null)
  {
    try {
      if ($clg_id == null) {
        $data = DB::select('call get_issue_types(?)'[null]);
      } else {
        $data = DB::select('call get_issue_types(?)', [$clg_id]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    edit

  public function editissuetype($id)
  {
    try {
      $data = DB::select('call edit_issue_types(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // <!-- delete_issue_type -->
  public function deleteissuetype($id)
  {
    try {
      DB::select('call delete_issue_type(?,@result)', array($id));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //  update
  public function updateissuetype(Request $request, $idd)
  {
    try {
      $duplicate = DB::table('issue_types')->where('issue_type', '=', $request->issue_type)
        ->where('college_id', $request->college_id)->get();
      if (count($duplicate) > 0) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('call update_issue_type(?,?,?,?,@result)', array($idd, $request->issue_type, $request->issue_days, $request->entry_by));
        $res = DB::select('SELECT @result as res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //   ISSUE POILICY

  // insert

  public function addisuepilicies(Request $request)
  {
    try {
      $duplicate = DB::table('issue_policies')->where('user_type', '=', $request->user_type)
        ->where('max_book', '=', $request->max_book)
        ->where('issue_type_id', '=', $request->issue_type_id)->get();
      if (count($duplicate)) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('call add_issue_policies(?,?,?,?,?,@result)', array($request->user_type, $request->max_book, $request->issue_type_id, $request->college_id, $request->entry_by));
        $res = DB::select('SELECT @result as res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    fetch
  public function getissuepolicies($clg_id = null)
  {
    try {
      if ($clg_id == null) {
        $data = DB::select('call get_issue_policies(?)', [null]);
      } else {
        $data = DB::select('call get_issue_policies(?)', [$clg_id]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //    edit

  public function editisuepilicies($id)
  {
    try {
      $data = DB::select('call edit_issue_policies(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // delete
  public function deleteisuepilicies($id)
  {
    try {
      DB::select('call delete_issue_policies(?,@result)', array($id));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  //  update
  public function updateisuepilicies(Request $request, $idd)
  {
    try {
      $data = DB::select('call update_issue_policies(?,?,?,?,?,@result)', array($idd, $request->user_role_id, $request->max_book, $request->issue_type_id, $request->entry_by));
      $res = DB::select('SELECT @result as res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  //Get Course data
  public function get_course_data($college_id)
  {
    try {
      $data = DB::select('call get_course_data(?)', array($college_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //Get Department Data
  public function get_dept_data($course_id)
  {
    try {
      $data = DB::select('call get_dept_data(?)', array($course_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function change_password(Request $request)
  {
    try {
      $data = User::where('user_id', $request->user_id)->where('password', $request->old_password)
        ->update(['password' => $request->new_password]);
      if ($data) {
        return response()->json('Password Changed Successfully');
      } else {
        return response()->json('Password Miss Match');
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // user profile

  public function get_user_profile($user_id, $clg_id = null)
  {
    try {
      // if ($clg_id == null) {
      $data = DB::select('CALL get_user_employee_profile(?,?)', [$user_id, $clg_id]);
      // } else {
      // $data = DB::select('CALL get_user_profile(?,?)', [$user_id, $clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function student_role_id($id)
  {
    try {
      $data = DB::select("select user_role_id from user_roles where user_role='Student' and college_id='$id'");
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function without_std_admin($id)
  {
    try {
      $data = DB::select("select * from user_roles where user_role!='Student' and user_role!='superadmin' and college_id='$id'");
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function join_book_author_booktitle_publisher($college_id)
  {
    try {
      $data = DB::select('call join_book_author_booktitle_publisher(?)', array($college_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function last_accession_number($clg_id)
  {
    try {
      $shortName = DB::table('colleges')->where('college_id', $clg_id)->get('short_name');
      $data = DB::select('select * from books where college_id=' . $clg_id . ' order by book_id desc limit 1');
      if ($data == null) {
        return response()->json($shortName[0]->short_name . '0');
      } else {
        return response()->json($data[0]->accession_no);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function password_list($college_id = null)
  {
    try {
      if ($college_id == null) {
        $data = DB::select("Select email,password,library_card_number,college_id from users");
      } elseif (is_numeric($college_id)) {
        $data = DB::select("Select email,password,library_card_number,college_id from users where college_id=$college_id");
      } else {
        $data = DB::select("Select email,password,library_card_number,college_id from users where library_card_number='$college_id'");
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // Book Searching
  // $res = DB::table('authors')->where('author_name', 'like', '%' . $author_name . '%')->get();
  public function search_book_authod($auther_name)
  {
    try {
      $res = DB::table('books')->join('authors', 'students.author_name', '=', 'authors.author_name')->where('students.author_name', 'like', '%' . $auther_name . '%')->get();
      return response()->json($res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function single_book_data($id)
  {
    try {
      $data = DB::select('call join_book_author_booktitle_publisher_single_data(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function view_student($clg_id)
  {
    try {
      $data = DB::select("call view_student(?)", array($clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function view_employee($clg_id)
  {
    try {
      $data = DB::select("call view_employee(?)", array($clg_id));

      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // Maximum Books based on library card number user_type
  public function maximum_book($cardNo)
  {
    try {
      $max_book = DB::select("SELECT max(issue_policies.max_book) as max_book FROM users join colleges join assign_roles join user_roles join issue_policies
    on users.college_id=colleges.college_id
    and users.user_id=assign_roles.user_id
    and assign_roles.user_role_id=user_roles.user_role_id
    and user_roles.user_role_id=issue_policies.user_type
    where users.library_card_number='$cardNo'
    group by issue_policies.max_book
    having issue_policies.max_book=max(issue_policies.max_book) limit 1");
      if ($max_book == null) {
        return response()->json([]);
      } else {
        $data = DB::table('users')
          ->join('colleges', 'users.college_id', '=', 'colleges.college_id')
          ->join('assign_roles', 'users.user_id', '=', 'assign_roles.user_id')
          ->join('user_roles', 'assign_roles.user_role_id', '=', 'user_roles.user_role_id')
          ->join('issue_policies', 'user_roles.user_role_id', '=', 'issue_policies.user_type')
          ->where('users.library_card_number', '=', $cardNo)
          ->where('issue_policies.max_book', '=', $max_book[0]->max_book)->first();
        // $data=DB::select("SELECT max_book FROM users inner join colleges inner join assign_roles
        // inner join user_roles inner join issue_policies on users.college_id=colleges.college_id
        // and users.user_id=assign_roles.user_id and assign_roles.user_role_id=user_roles.user_role_id
        // and user_roles.user_role_id=issue_policies.user_type where users.library_card_number='$cardNo'");
        return response()->json($data);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function issued_books($libcardno)
  {
    try {
      $issued_books = 0;
      $data = DB::table('users')
        ->join('book_issues', 'users.user_id', '=', 'book_issues.user_id')
        ->where('users.library_card_number', '=', $libcardno)
        ->where('book_issues.return_entry_by', '=', null)
        ->get();
      for ($i = 0; $i < count($data); $i++) {
        $issued_books += 1;
      }
      return response()->json($issued_books);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // user_dtls_by_LibCardNo
  public function user_dtls_LibCardNo($cardNo)
  {
    try {
      $data = DB::table('users')
        // ->join('courses','users.course_id','=','courses.course_id')
        // ->join('departments','users.dept_id','=','departments.dept_id')
        ->join('colleges', 'users.college_id', '=', 'colleges.college_id')
        ->join('assign_roles', 'users.user_id', '=', 'assign_roles.user_id')
        ->join('user_roles', 'assign_roles.user_role_id', '=', 'user_roles.user_role_id')
        ->where('users.library_card_number', '=', $cardNo)->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // search edition year
  public function edition_year($edition_year)
  {
    try {
      $data = DB::table('books')
        ->join('book_titles', 'books.book_title_id', '=', 'book_titles.book_title_id')
        ->join('authors', 'books.first_author_id', '=', 'authors.author_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('edition_year', 'like', '%' . $edition_year . '%')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function book_title($book_title, $clg_id)
  {
    try {
      $data = DB::table('book_titles')
        ->join('books', 'book_titles.book_title_id', '=', 'books.book_title_id')
        ->join('authors', 'books.first_author_id', '=', 'authors.author_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('book_title_name', 'like', '%' . $book_title . '%')
        ->where('book_titles.college_id', '=', $clg_id)->get();
      if (count($data) > 0) {
        return response()->json($data);
      } else {
        return response()->json(
          "No such data found!"
        );
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function search_author($clg_id, $author_name)
  {
    try {
      $data = DB::table('authors')
        ->join('books', 'authors.author_id', '=', 'books.first_author_id')
        ->join('book_titles', 'books.book_title_id', '=', 'book_titles.book_title_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('authors.college_id', '=', $clg_id)
        ->where('author_name', 'like', '%' . $author_name . '%')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function search_accesion_no($accession_no, $clg_id)
  {
    try {
      $data = DB::select('CALL search_accession_no(?,?)', [$accession_no, $clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function search_keyword($keyword)
  {
    try {
      $data = DB::table('books')
        ->join('book_titles', 'books.book_title_id', '=', 'book_titles.book_title_id')
        ->join('authors', 'books.first_author_id', '=', 'authors.author_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('keywords', 'like', '%' . $keyword . '%')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function viewfine_collection($college_id)
  {
    try {
      $data = DB::select('call view_fine_collection(?)', array($college_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function update_status($id)
  {
    try {
      $user = DB::table('users')->where('user_id', $id)->first();
      $status = $user->user_status;
      if ($status == 'active') {
        $data = DB::table('users')->where('user_id', $id)->update(['user_status' => 'inactive']);
        if ($data) {
          return response()->json('Status Updated Successfully');
        } else {
          return response()->json('Something Went Wrong');
        }
      } else if ($status == 'inactive') {
        $data = DB::table('users')->where('user_id', $id)->update(['user_status' => 'active']);
        if ($data) {
          return response()->json('Status Updated Successfully');
        } else {
          return response()->json('Something Went Wrong');
        }
      } else {
        return response()->json('Something Went Wrong');
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function navigation_page_name($id)
  {
    try {
      // $data=DB::tables('users')
      // ->join('assign_roles','users.user_id','=','assign_roles.user_id')
      // ->join('assign_navigations','assign_roles.user_role_id','=','assign_navigations.user_role_id')
      // ->join('navigation_pages','assign_navigations.nav_page_id','=','navigation_pages.nav_page_id')
      // ->where('user_id','=',$id)
      // ->get('nav_page_name');


      $data = DB::select("SELECT nav_page_name,path_nav FROM users inner join assign_roles inner join assign_navigations
        inner join navigation_pages on users.user_id=assign_roles.user_id
        and assign_roles.user_role_id=assign_navigations.user_role_id
        and assign_navigations.nav_page_id=navigation_pages.nav_page_id
        where users.user_id='$id'");
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function update_status_finepolicy($id)
  {
    try {
      $user = DB::table('fine_policies')->where('fine_policy_id', $id)->first();
      $status = $user->status;
      if ($status == 'active' || $status == 'Active') {
        $data = DB::table('fine_policies')->where('fine_policy_id', $id)->update(['status' => 'inactive']);
        if ($data) {
          return response()->json('Status Updated Successfully');
        } else {
          return response()->json('Something Went Wrong');
        }
      } else if ($status == 'inactive' || $status == 'Inactive') {
        $data = DB::table('fine_policies')->where('fine_policy_id', $id)->update(['status' => 'active']);
        if ($data) {
          return response()->json('Status Updated Successfully');
        } else {
          return response()->json('Something Went Wrong');
        }
      } else {
        return response()->json('Something Went Wrong');
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function employee_details_with_college_id($id)
  {
    try {
      // $data=DB::table('users')
      // ->join('assign_roles','users.user_id','=','assign_roles.user_id')
      // ->join('user_roles','assign_roles.user_role_id','=','user_roles.user_role_id')
      // ->join('colleges','users.college_id','=','colleges.college_id')
      // ->where('user_role','!=','student')->where('user_role','!=','admin')
      // ->where('users.college_id','=',$id)->get();
      $data = DB::select("SELECT u.user_id,u.name,u.library_card_number,u.image,c.college_name,u.contact,u.designation,
    GROUP_CONCAT(r.user_role SEPARATOR ', ') AS roles
    FROM users u
    LEFT JOIN assign_roles a ON u.user_id = a.user_id
    LEFT JOIN user_roles r ON a.user_role_id=r.user_role_id
    inner join colleges c on u.college_id=c.college_id
    where r.user_role!='superadmin' and r.user_role!='student'
    and u.college_id='$id' GROUP BY u.user_id,u.name");
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function name_role_assignrole($id)
  {
    try {
      $data = DB::select("select u.user_id,u.name,a.assign_role_id,r.user_role from users u
        inner join assign_roles a inner join user_roles r
        on u.user_id=a.user_id and a.user_role_id=r.user_role_id
        where u.user_id='$id'");
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  // title_author_search
  public function title_author_search($college_id, $title = null, $author = null)
  {
    try {
      if (!$author) {
        $data = DB::table('books')
          ->join('authors', 'authors.author_id', '=', 'books.first_author_id')
          ->join('book_titles', 'book_titles.book_title_id', '=', 'books.book_title_id')
          ->join('publishers', 'publishers.publisher_id', '=', 'books.publisher_id')
          ->where('authors.author_name', 'like', '%' . $author . '%')
          ->where('books.college_id', '=', $college_id)
          ->get([
            'books.book_image', 'books.book_title_id', 'book_titles.book_title_name',
            'books.first_author_id', 'authors.author_name', 'books.publisher_id', 'publishers.publisher_name', 'books.keywords', 'books.translator',
            'books.volume', 'books.accession_no', 'books.book_status', 'books.entry_by', 'books.entry_date', 'books.edition_year', 'books.compiler',
            'books.book_price', 'books.isbn_no'
          ]);
      } elseif (!$title) {
        $data = DB::table('books')
          ->join('authors', 'authors.author_id', '=', 'books.first_author_id')
          ->join('book_titles', 'book_titles.book_title_id', '=', 'books.book_title_id')
          ->join('publishers', 'publishers.publisher_id', '=', 'books.publisher_id')
          ->where('book_titles.book_title_name', 'like', '%' . $title . '%')
          ->where('books.college_id', '=', $college_id)->get([
            'books.book_image', 'books.book_title_id', 'book_titles.book_title_name',
            'books.first_author_id', 'authors.author_name', 'books.publisher_id', 'publishers.publisher_name', 'books.keywords', 'books.translator',
            'books.volume', 'books.accession_no', 'books.book_status', 'books.entry_by', 'books.entry_date', 'books.edition_year', 'books.compiler',
            'books.book_price', 'books.isbn_no'
          ]);
      } else {
        $data = DB::table('books')
          ->join('authors', 'authors.author_id', '=', 'books.first_author_id')
          ->join('book_titles', 'book_titles.book_title_id', '=', 'books.book_title_id')
          ->join('publishers', 'publishers.publisher_id', '=', 'books.publisher_id')
          ->where('book_titles.book_title_name', 'like', '%' . $title . '%')
          ->where('authors.author_name', 'like', '%' . $author . '%')
          ->where('books.college_id', '=', $college_id)->get([
            'books.book_image', 'books.book_title_id', 'book_titles.book_title_name',
            'books.first_author_id', 'authors.author_name', 'books.publisher_id', 'publishers.publisher_name', 'books.keywords', 'books.translator',
            'books.volume', 'books.accession_no', 'books.book_status', 'books.entry_by', 'books.entry_date', 'books.edition_year', 'books.compiler',
            'books.book_price', 'books.isbn_no'
          ]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // log_details date search
  public function log_details_date_search($college_id, $from, $to)
  {
    try {
      $data = DB::table('log_details as ld')
        ->join('users as u', 'u.user_id', '=', 'ld.user_id')
        ->join('colleges as c', 'c.college_id', '=', 'u.college_id')
        ->where('u.college_id', '=', $college_id)
        ->whereBetween('ld.process_time', [$from, $to])
        ->get([
          'ld.log_id', 'ld.user_id', 'u.name', 'ld.ip_address', 'ld.process', 'u.library_card_number', 'u.college_id',
          'ld.process_time', 'u.college_id', 'c.college_name', 'c.college_address'
        ]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // Report log_details fetch
  public function log_details_report($college_id)
  {
    try {
      $data = DB::select('CALL log_details_report(?)', [$college_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // booklist_report
  public function booklist_report($clg_id)
  {
    try {
      $data = DB::select('call book_list_report(?)', [$clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // fine_collection
  public function fine_collection_report($college_id)
  {
    try {
      $data = DB::select('CALL fine_collection_report(?)', [$college_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // search_fine_collection
  public function search_fine($clg, $cardNO)
  {
    try {
      $data = DB::select('CALL search_fine_collection(?,?)', [$clg, $cardNO]);
      if (count($data) > 0) {
        return response()->json([$data]);
      } else {
        return response()->json(['msg' => 'No data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book_title_wise report with college_id
  public function title_wise_report($clg_id)
  {
    try {
      $data = DB::select('CALL title_wise_report(?)', [$clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book_report_department_wise
  public function book_report_dept_wise($dept_id, $clg_id)
  {
    try {
      $data = DB::select('CALL book_report_dept_wise(?,?)', [$dept_id, $clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // sdepartment search
  public function book_report_dept_wise_search($clg_id, $deptName)
  {
    try {
      $data = DB::SELECT('CALL book_report_dept_wise_search(?,?)', [$clg_id, $deptName]);
      // return response()->json($data);
      if (count($data) > 0) {
        return response()->json([$data]);
      } else {
        return response()->json(['msg' => 'No data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //user_log_details by college_id and user_role_id
  public function user_details_report($clg_id, $str)
  {
    try {
      $data = DB::select('CALL user_details_report(?,?)', [$clg_id, $str]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book_transaction_report
  public function book_transaction_report($college_id)
  {
    try {
      $data = DB::select('call book_transaction_report(?)', [$college_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book_report_clg_wise
  public function book_report_clg_wise($college_id)
  {
    try {
      $data = DB::select('call book_report_clg_wise(?)', [$college_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // get College for address
  public function clg_address($clg_id)
  {
    try {
      $data = DB::table('colleges')
        ->where('college_id', '=', $clg_id)
        ->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book_transaction_report_search
  public function book_trans_search_report($college_id, $from, $to)
  {
    try {
      $data = $data = DB::select('CALL search_book_trans(?,?,?)', [$college_id, $from, $to]);
      // return response()->json($data);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // Title wise report search
  public function title_wise_report_search($clg_id, $title)
  {
    try {
      $data = DB::select('CALL title_wise_report_search(?,?)', [$clg_id, $title]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function user_details($id)
  {
    try {
      $d = DB::select("SELECT * FROM users where user_id='$id' limit 1");
      // return response()->json($d[0]->course_id);
      $course_id = $d[0]->course_id;
      $dept_id = $d[0]->dept_id;
      if ($course_id != null and $dept_id != null) {
        $data = DB::select("SELECT * FROM users inner join colleges inner join courses inner join departments
      on users.college_id=colleges.college_id and users.course_id=courses.course_id
      and users.dept_id=departments.dept_id where users.user_id='$id'");
        return response()->json($data);
      } else {
        $data = DB::select("SELECT * FROM users inner join colleges on users.college_id=colleges.college_id where users.user_id='$id");
        return response()->json($data);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book_stock_report
  public function book_stock_report($college_id)
  {
    try {
      $data = DB::select('call book_stock_report(?)', [$college_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book_report_clg_wise_search
  public function clg_wise_search($clg_id, $clgName)
  {
    try {
      $data = DB::SELECT('CALL clg_wise_search(?,?)', [$clg_id, $clgName]);
      if (count($data) > 0) {
        return response()->json([$data]);
      } else {
        return response()->json(['msg' => 'No data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function total_book_status($college_id)
  {
    try {
      $data = DB::select('Call total_book_details(?)', array($college_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function find_dept_id($college_id, $course_id)
  {
    try {
      $data = DB::table('departments')->select('dept_name', 'dept_id')->where('departments.college_id', '=', $college_id)
        ->where('departments.course_id', '=', $course_id)->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function library_card_list($college_id)
  {
    try {
      $data = DB::table('users')
        ->join('colleges', 'users.college_id', '=', 'colleges.college_id')
        // ->join('courses','users.course_id','=','courses.course_id')
        // ->join('departments','users.dept_id','=','departments.dept_id')
        ->where('users.college_id', $college_id)->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function total_book_status_search($college_id, $date)
  {
    try {

      $data = DB::select("call total_book_status_search(?,?)", array($college_id, $date));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
    // $data = DB::SELECT("select book_titles.book_title_name,books.volume,books.accession_no,book_issues.issue_date,book_issues.entry_by,book_issues.book_issue_status,
    // departments.dept_name,users.name,book_issues.college_id,users.library_card_number,book_issues.user_type,book_issues.return_date,
    // book_issues.return_entry_by from
    // book_issues inner join books inner join book_titles inner join users inner join departments inner join colleges
    // on book_issues.user_id=users.user_id and
    // book_issues.accession_no=books.accession_no and
    // books.book_title_id=book_titles.book_title_id and
    // book_issues.college_id=colleges.college_id and
    // users.dept_id=departments.dept_id
    // where( date(book_issues.issue_date)='$date' or book_issues.return_date='$date') and book_issues.college_id=$college_id");
    // return response()->json($data);
    // if(count($data)>0)
    //    {
    //    return response()->json([$data,'status'=>1]);
    //     }
    //     else
    //     {
    //       return response()->json(['msg'=>'No data Found','status'=>0]);
    //     }
  }
  // Book Return
  public function book_return(Request $request)
  {
    try {
      // return response()->json($request->hasFile('return_document'));
      // return response()->json($request->all());
      // dd($request->all());
      // $data = DB::table('book_issues')
      //   ->where('accession_no', $request->accession_no)
      //   ->where('user_id', $request->user_id)
      //   ->where('college_id', $request->college_id)
      //   ->update(['book_issue_status' => 'returned', 'return_entry_by' => $request->return_entry_by, 'return_date' => NOW(), 'updated_at' => NOW()]);
      // DB::table('books')
      //   ->where('accession_no', $request->accession_no)
      //   ->where('college_id', $request->college_id)
      //   ->update(['book_status' => 'inlibrary','updated_at'=>NOW()]);
      // if ($data) {
      //   return response()->json('Book Returned Successfully');
      // }
      if ($request->emp_id == null && $request->return_document == null) {
        $data = DB::table('book_issues')
          ->where('id', $request->id)
          ->update(['book_issue_status' => 'returned', 'return_entry_by' => $request->return_entry_by, 'return_date' => NOW(), 'updated_at' => NOW()]);
        DB::table('books')
          ->where('accession_no', $request->accession_no)
          ->where('college_id', $request->college_id)
          ->update(['book_status' => 'inlibrary', 'updated_at' => now()]);
      } elseif ($request->emp_id == null && $request->return_document != null) {
        $doc = $request->file('return_document');
        $return_document = time() . '.' . $doc->getClientOriginalExtension();
        $data = DB::table('book_issues')
          ->where('id', $request->id)
          ->update(['book_issue_status' => 'returned', 'return_entry_by' => $request->return_entry_by, 'return_document' => $return_document, 'return_date' => NOW(), 'updated_at' => NOW()]);
        DB::table('books')
          ->where('accession_no', $request->accession_no)
          ->where('college_id', $request->college_id)
          ->update(['book_status' => 'inlibrary', 'updated_at' => now()]);
        $path = public_path('ReturnBookDoc');
        $doc->move($path, $return_document);
      } else {
        // optional return document file condition
        if ($request->hasFile('return_document')) {
          $doc = $request->file('return_document');
          $return_document = time() . '.' . $doc->getClientOriginalExtension();

          $data = DB::table('book_issues')
            ->where('id', $request->id)
            ->update(['book_issue_status' => 'returned', 'return_document' => $return_document, 'return_entry_by' => $request->return_entry_by, 'return_date' => NOW(), 'updated_at' => NOW()]);
          DB::table('books')
            ->where('accession_no', $request->accession_no)
            ->where('college_id', $request->college_id)
            ->update(['book_status' => 'inlibrary', 'updated_at' => NOW()]);
          $path = public_path('ReturnBookDoc');
          $doc->move($path, $return_document);
        } else {
          $data = DB::table('book_issues')
            ->where('id', $request->id)
            ->update(['book_issue_status' => 'returned', 'return_entry_by' => $request->return_entry_by, 'return_date' => NOW(), 'updated_at' => NOW()]);
          DB::table('books')
            ->where('accession_no', $request->accession_no)
            ->where('college_id', $request->college_id)
            ->update(['book_status' => 'inlibrary', 'updated_at' => NOW()]);
        }
      }

      if ($data) {

        return response()->json('Book Returned Successfully');
      } else {
        return response()->json('Failed');
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function issued_books_accession_number($library_card_number)
  {
    try {
      $data = DB::table('books')
        ->join('book_issues', 'books.accession_no', '=', 'book_issues.accession_no')
        ->join('book_titles', 'books.book_title_id', '=', 'book_titles.book_title_id')
        ->join('users', 'book_issues.user_id', '=', 'users.user_id')
        ->where('users.library_card_number', '=', $library_card_number)
        ->where('book_issues.return_entry_by', '=', null)
        ->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function publisher_by_clgid($id)
  {
    try {
      $data = DB::select('CALL publisher_by_clg_id(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book_return fetch by library_card_no
  public function bookReturnSearch($cardNo)
  {
    try {
      // Pankaj
      // $data = DB::select("CALL bookReturnSearch(?)", [$cardNo]);
      // soumya
      // $data = DB::select("CALL bookReturnSearch(?)", [$cardNo]);
      // soumya
      $data = DB::select("select
    distinct bi.id,
    bt.book_title_name,
    b.accession_no,
    u.college_id,
    u.name,
    it.issue_type,
    bi.issue_date,
    u.user_id,
    case
        when (
            datediff(curdate(), bi.issue_date) - it.issue_days
        ) > fp.exceed_days then (
            DATEDIFF(curdate(), bi.issue_date) - it.issue_days
        )
        else '0'
    end as exceed_days,
    case
        when (
            datediff(curdate(), bi.issue_date) - it.issue_days
        ) > fp.exceed_days then (
            DATEDIFF(curdate(), bi.issue_date) - it.issue_days
        ) * (
            select fine_policy_amount
            from fine_policies
            where user_type = (
                    select ur.user_role_id
                    from users u
                        join assign_roles ar on ar.user_id = u.user_id
                        join user_roles ur on ur.user_role_id = ar.user_role_id
                    where
                        u.library_card_number = '$cardNo'
                    limit
                        1
                )
                and issue_type_id = it.issue_type_id
        )
        else '0'
    end as fine_amount
from book_issues bi
    join books b on b.accession_no = bi.accession_no
    join book_titles bt on bt.book_title_id = b.book_title_id
    join users u on u.user_id = bi.user_id
    join issue_types it on it.issue_type_id = bi.issue_type_id
    join fine_policies fp on fp.issue_type_id = bi.issue_type_id
where
    u.library_card_number = '$cardNo'
    and bi.book_issue_status = 'issued'");
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  //book_transaction_history
  public function book_transactionhistory($id)
  {
    try {
      $data = DB::select('call book_transaction_history(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // bill_by_vendor
  public function bill_by_vendor($vendor, $college_id)
  {
    try {
      $data = DB::select('call get_bill_by_vendor(?,?)', [$vendor, $college_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // Multiple Book Update
  public function multiple_book_update(Request $request)
  {
    try {
      $data = DB::table('books')->where('book_id', $request->book_id)->first();
      $book_title_id = $data->book_title_id;
      // return response()->json($data->book_title_id);
      if ($request->first_author_id == null and $data->first_author_id == null) {
        $first_author_id = NULL;
      } else {
        $first_author_id = $data->first_author_id;
      }
      if ($request->second_author_id == null and $data->second_author_id == null) {
        $second_author_id = NULL;
      } else {
        $second_author_id = $data->second_author_id;
      }
      if ($request->third_author_id == null and $data->third_author_id == null) {
        $third_author_id = NULL;
      } else {
        $third_author_id = $data->third_author_id;
      }
      $publisher_id = $data->publisher_id;
      $edition_year = $data->edition_year;
      $volume = $data->volume;
      $publish_year = $data->publish_year;
      $document_id = $data->document_id;
      $language = $data->language;
      if ($request->file('book_image') == null) {
        $book_image = $data->book_image;
      } else {
        $image = $request->file('book_image');
        $book_image = time() . '.' . $image->getClientOriginalExtension();
        $path = public_path('BookImage');
        $image->move($path, $book_image);
      }
      // $d = DB::table('books')
      //   ->where('book_title_id', $book_title_id)
      //   ->where('publisher_id', $publisher_id)
      //   ->where('edition_year', $edition_year)
      //   ->where('volume', $volume)
      //   ->where('publish_year', $publish_year)
      //   ->where('document_id', $document_id)
      //   ->where('language', $language)
      //   ->update([
      //     'abstract' => $request->abstract, 'bill_id' => $request->bill_id,
      //     'book_image' => $book_image, 'book_price' => $request->book_price, 'book_title_id' => $request->book_title_id,
      //     'call_no' => $request->call_no, 'college_id' => $request->college_id, 'content' => $request->content,
      //     'currency_id' => $request->currency_id, 'document_id' => $request->document_id, 'edition' => $request->edition,
      //     'edition_year' => $request->edition_year, 'editor' => $request->editor, 'entry_by' => $request->entry_by,
      //     'first_author_id' => $first_author_id, 'keywords' => $request->keywords, 'language' => $request->language,
      //     'nature_of_binding' => $request->nature_of_binding, 'no_of_pages' => $request->no_of_pages,
      //     'notes' => $request->notes, 'publish_year' => $request->publish_year, 'publisher_id' => $request->publisher_id,
      //     'second_author_id' => $second_author_id, 'series' => $request->series, 'source' => $request->source,
      //     'suppl_copies' => $request->suppl_copies, 'third_author_id' => $third_author_id,
      //     'translator' => $request->translator, 'vendor_id' => $request->vendor_id, 'volume' => $request->volume
      //   ]);
      // // return response()->json($d);
      //   return response()->json("All the Books are updated Successfully");
      $d = DB::select("call update_multiple_books(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@result)", array(
        $book_title_id, $publisher_id, $edition_year, $volume, $publish_year, $document_id, $language, $request->book_title_id,
        $first_author_id, $second_author_id, $third_author_id, $request->publisher_id, $request->volume, $request->editor,
        $request->translator, $request->compiler, $request->edition, $request->edition_year,
        $request->publish_year, $request->no_of_pages, $request->language, $request->series,
        $request->source, $request->content, $request->currency_id, $request->document_id, $request->subject_id,
        $request->vendor_id, $request->bill_id, $request->suppl_copies, $request->abstract, $request->nature_of_binding,
        $request->notes, $request->keywords, $request->call_no, $request->book_price, $book_image, $request->college_id,
        $request->location_id, $request->entry_by
      ));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book_fine_collection
  public function book_fine_collection($cardNo, $accs_no)
  {
    try {
      $data = DB::select("SELECT distinct book_issues.id, book_titles.book_title_name,books.accession_no,
    users.name,issue_types.issue_type,book_issues.issue_date,fine_policies.fine_policy_id,
    case
    when
    (datediff(curdate(),book_issues.issue_date)-issue_types.issue_days)> fine_policies.exceed_days then (datediff(curdate(),book_issues.issue_date)-issue_types.issue_days)
    else '0'
    end as exceed_days,
    case
    when
    (datediff(curdate(),book_issues.issue_date)-issue_types.issue_days)> fine_policies.exceed_days then
    (datediff(curdate(),book_issues.issue_date)-issue_types.issue_days)*fine_policies.fine_policy_amount
    else '0'
    end as fine_amount
    FROM book_issues inner join books inner join book_titles inner join users
    inner join issue_types inner join fine_policies
    on book_issues.accession_no=books.accession_no
    and books.book_title_id=book_titles.book_title_id
    and book_issues.user_id=users.user_id
    and book_issues.issue_type_id=issue_types.issue_type_id
    and issue_types.issue_type_id=fine_policies.issue_type_id
    where users.library_card_number='$cardNo' and books.accession_no='$accs_no' and book_issue_status='issued';");
      return response()->json($data[0]);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //  title(quantiy) wise book search
  public function title_quantity($clg_id, $title)
  {
    try {
      $data = DB::SELECT('CALL title_quantity(?,?)', [$clg_id, $title]);
      if (count($data) > 0) {
        return response()->json([$data]);
      } else {
        return response()->json(['msg' => 'No data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // quantity
  public function quantity($id)
  {
    try {
      $data = DB::select('call quantity(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // individual search
  public function ind_book_by_accno($clg, $acc)
  {
    try {
      $data = DB::select('CALL ind_book_by_accno(?,?)', [$clg, $acc]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // Search for individual books by department
  public function ind_book_by_dept($clg, $dept)
  {
    try {
      $data = DB::SELECT('CALL book_by_dept(?,?)', [$clg, $dept]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // search book by lib_card_no for individuals only
  public function ind_book_by_lib($clg, $lib)
  {
    try {
      $data = DB::SELECT('CALL book_by_lib(?,?)', [$clg, $lib]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book_cost_report

  public function book_cost_report($clg_id)
  {
    try {
      $data = DB::select('CALL book_cost_report(?)', [$clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // cost report by dept
  public function book_cost_report_search($clg, $deptName)
  {
    try {
      $data = DB::select('CALL cost_report_search(?,?)', [$clg, $deptName]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function view_book_on_tavc($title, $author, $volumn, $college_id)
  {
    try {
      // $data=DB::select("SELECT * FROM LMS.books join book_titles join authors
      // on books.book_title_id=book_titles.book_title_id and books.first_author_id=authors.author_id
      // where books.volume='$volumn' and books.college_id='$college_id'
      // and book_titles.book_title_name='$title'
      // and authors.author_name='$author'");
      $data = DB::table('book_titles')
        ->join('books', 'book_titles.book_title_id', '=', 'books.book_title_id')
        ->join('authors', 'books.first_author_id', '=', 'authors.author_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('book_title_name', 'like', '%' . $title . '%')
        ->where('author_name', 'like', '%' . $author . '%')
        ->where('volume', 'like', '%' . $volumn . '%')
        ->where('book_titles.college_id', '=', $college_id)
        ->where('books.book_status', '=', 'inlibrary')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function view_book_on_kc($keyword, $college_id)
  {
    try {
      $data = DB::table('book_titles')
        ->join('books', 'book_titles.book_title_id', '=', 'books.book_title_id')
        ->join('authors', 'books.first_author_id', '=', 'authors.author_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('keywords', 'like', '%' . $keyword . '%')
        ->where('book_titles.college_id', '=', $college_id)
        ->where('books.book_status', '=', 'inlibrary')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_roles_by_id($id)
  {
    try {
      $data = DB::select('call get_user_roles(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function issue_type_by_clg_id($id)
  {
    try {
      $data = DB::select('call issuetype_by_clg_id(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book report status wise
  public function book_report_statuswise($book_status, $clg_id)
  {
    try {
      $data = DB::select('call book_report_status_wise(?,?)', array($book_status, $clg_id));
      // return response()->json($data);

      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // search nav by colgid and user role_id
  public function search_nav_by_roleidclgid($user_role_id, $clg_id)
  {
    try {
      $data = DB::select('call search_nav_by_roleid_clgid(?,?)', array($user_role_id, $clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book status by clg id
  public function status_by_clg_id($clg_id)
  {
    try {
      $data = DB::select('call status_by_clgid(?)', array($clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // Book Title search for biswajit
  public function book_title_search($book_title, $clg_id)
  {
    try {
      $data = DB::table('book_titles')
        ->join('books', 'book_titles.book_title_id', '=', 'books.book_title_id')
        ->join('authors', 'books.first_author_id', '=', 'authors.author_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('book_title_name', 'like', '%' . $book_title . '%')
        ->where('book_titles.college_id', '=', $clg_id)
        ->where('books.book_status', '=', 'inlibrary')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // Author search for biswajit
  public function author_search($clg_id, $author_name)
  {
    try {
      $data = DB::table('authors')
        ->join('books', 'authors.author_id', '=', 'books.first_author_id')
        ->join('book_titles', 'books.book_title_id', '=', 'book_titles.book_title_id')
        ->join('publishers', 'books.publisher_id', '=', 'publishers.publisher_id')
        ->where('authors.college_id', '=', $clg_id)
        ->where('author_name', 'like', '%' . $author_name . '%')
        ->where('books.book_status', '=', 'inlibrary')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  //
  public function view_book_title_author_search($college_id, $title = null, $author = null)
  {
    try {
      if (!$author) {
        $data = DB::table('books')
          ->join('authors', 'authors.author_id', '=', 'books.first_author_id')
          ->join('book_titles', 'book_titles.book_title_id', '=', 'books.book_title_id')
          ->join('publishers', 'publishers.publisher_id', '=', 'books.publisher_id')
          ->where('authors.author_name', 'like', '%' . $author . '%')
          ->where('books.college_id', '=', $college_id)
          ->where('books.book_status', '=', 'inlibrary')
          ->get([
            'books.book_image', 'books.book_title_id', 'book_titles.book_title_name',
            'books.first_author_id', 'authors.author_name', 'books.publisher_id', 'publishers.publisher_name', 'books.keywords', 'books.translator',
            'books.volume', 'books.accession_no', 'books.book_status', 'books.entry_by', 'books.entry_date', 'books.edition_year', 'books.compiler',
            'books.book_price', 'books.isbn_no'
          ]);
      } elseif (!$title) {
        $data = DB::table('books')
          ->join('authors', 'authors.author_id', '=', 'books.first_author_id')
          ->join('book_titles', 'book_titles.book_title_id', '=', 'books.book_title_id')
          ->join('publishers', 'publishers.publisher_id', '=', 'books.publisher_id')
          ->where('book_titles.book_title_name', 'like', '%' . $title . '%')
          ->where('books.book_status', '=', 'inlibrary')
          ->where('books.college_id', '=', $college_id)
          ->get([
            'books.book_image', 'books.book_title_id', 'book_titles.book_title_name',
            'books.first_author_id', 'authors.author_name', 'books.publisher_id', 'publishers.publisher_name', 'books.keywords', 'books.translator',
            'books.volume', 'books.accession_no', 'books.book_status', 'books.entry_by', 'books.entry_date', 'books.edition_year', 'books.compiler',
            'books.book_price', 'books.isbn_no'
          ]);
      } else {
        $data = DB::table('books')
          ->join('authors', 'authors.author_id', '=', 'books.first_author_id')
          ->join('book_titles', 'book_titles.book_title_id', '=', 'books.book_title_id')
          ->join('publishers', 'publishers.publisher_id', '=', 'books.publisher_id')
          ->where('book_titles.book_title_name', 'like', '%' . $title . '%')
          ->where('authors.author_name', 'like', '%' . $author . '%')
          ->where('books.college_id', '=', $college_id)
          ->where('books.book_status', '=', 'inlibrary')
          ->get([
            'books.book_image', 'books.book_title_id', 'book_titles.book_title_name',
            'books.first_author_id', 'authors.author_name', 'books.publisher_id', 'publishers.publisher_name', 'books.keywords', 'books.translator',
            'books.volume', 'books.accession_no', 'books.book_status', 'books.entry_by', 'books.entry_date', 'books.edition_year', 'books.compiler',
            'books.book_price', 'books.isbn_no'
          ]);
      }
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // Maximum Books based on user_id and issue_type
  public function max_book_user_id_based($usn_id, $issue_type_id)
  {
    try {
      $data = DB::table('users')
        ->join('assign_roles', 'users.user_id', '=', 'assign_roles.user_id')
        ->join('user_roles', 'assign_roles.user_role_id', '=', 'user_roles.user_role_id')
        ->where('users.user_id', '=', $usn_id)
        ->get('user_roles.user_role_id');
      if (count($data) > 1) {
        foreach ($data as $d) {
          $max_book = DB::table('issue_policies')
            ->where('user_type', '=', $d->user_role_id)
            ->where('issue_type_id', '=', $issue_type_id)
            ->get('max_book');
        }
        $m = $max_book[0]->max_book;
        foreach ($max_book as $max) {
          if ($max > $m) {
            $m = $max;
          }
        }
        return response()->json([$m]);
      } else {
        $max_book = DB::table('issue_policies')
          ->where('user_type', '=', $data[0]->user_role_id)
          ->where('issue_type_id', '=', $issue_type_id)
          ->get('max_book');
        return response()->json($max_book);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // author_publisher
  public function author_publisher_search($clg, $inp)
  {
    try {
      $data = DB::select('CALL search_author_publisher(?,?)', [$clg, $inp]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //     issued_requested_book
  public function issued_requested_book($user_id, $issue_type_id)
  {
    try {
      $issued = DB::table('book_issues')
        ->where('book_issues.user_id', '=', $user_id)
        ->where('book_issues.issue_type_id', '=', $issue_type_id)
        ->where('book_issues.book_issue_status', '=', 'issued')
        ->count();

      $requested = DB::table('book_issues')
        ->where('book_issues.user_id', '=', $user_id)
        ->where('book_issues.book_issue_status', '=', 'requested')
        ->count();
      return response()->json(['issued_book' => $issued, 'requested_book' => $requested]);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book_request_insert
  public function book_requestInsert(Request $req)
  {
    try {
      DB::select('CALL book_request(?,?,?,?,?)', [$req->issue_type_id, $req->college_id, $req->accession_no, $req->user_id, $req->user_type]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book transaction by user
  public function book_trans_by_user($clg_id, $lib)
  {
    try {
      $data = DB::select('call book_trans_by_user(?,?)', array($clg_id, $lib));
      // return response()->json($data);

      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book issue by issue type
  public function issue_by_type($i_type)
  {
    try {
      $data = DB::select('call issues(?)', array($i_type));

      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // book issue by issue type and department issue
  public function dept_issue_report($clg_id, $inp)
  {
    try {
      $data = DB::select('call dept_issue_report(?,?)', array($clg_id, $inp));

      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // requested_book_details
  public function book_requested_dtls($clg_id)
  {
    try {
      $data = DB::select('CALL book_request_report(?)', [$clg_id]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // approved_book_request
  public function approved_request(Request $req)
  {
    try {
      DB::select('CALL approve_request(?,?,?,@result)', [$req->id, $req->accession_no, $req->entry_by]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book_dtls in range of accession_no
  public function book_dtls_btw_access_no_range($from, $to, $clg_id)
  {
    try {
      $data = DB::select("call book_dtls_btw_access_no_range(?,?,?)", array($from, $to, $clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function issue_available_book_list($clg_id)
  {
    try {
      $data = DB::select('call issue_available_book_list(?)', array($clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function unique($clg_id)
  {
    try {
      $data = DB::select('call fetch_new(?)', array($clg_id));
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['No Data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  // book number of book issued by the college id by a date
  public function amountof_issuedbook_by_college_id($clg_id = null)
  {
    try {
      $data = DB::select('call amountof_issuedbook_by_clgid(?)', array($clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function total_registrationMonthly($clg_id)
  {
    try {
      $data = DB::select("select monthname(date(created_at)) as month,count(*) as total_registration,year(curdate()) as year from users where college_id=" . $clg_id . " and year(created_at)=year(curdate()) group by monthname(date(created_at))");
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function add_authorised_signature(Request $request)
  {
    try {
      $duplicate = DB::table('authorised_signatures')->where('college_id', $request->college_id)->where('authorise_status', 'active')->get();
      if (count($duplicate) > 0) {
        return response()->json('Duplicate Data Entry');
      } else {
        $image = $request->file('signature');
        $signature = time() . '.' . $image->getClientOriginalExtension();
        $data = DB::select('call add_authorised_signature(?,?,?,?,?,@result)', array($request->name, $request->designation, $signature, $request->college_id, $request->entry_by));
        $res = DB::select('SELECT @result AS res');
        if ($res[0]->res = 'Authorised Signature Added Successfully') {
          $path = public_path('AuthorisedSignature');
          $image->move($path, $signature);
        }
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_authorised_signature($id)
  {
    try {
      $data = DB::select('call edit_authorised_signature(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_authorised_signature($clg = null)
  {
    try {
      $data = DB::select('call get_authorised_signature(?)', array($clg));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function update_authorised_signature($id, Request $request)
  {
    try {
      $d = DB::table('authorised_signatures')->where('id', $id)->first();
      if (!$request->file('signature')) {
        $signature = $d->signature;
      } else {
        $image = $request->file('signature');
        $signature = time() . '.' . $image->getClientOriginalExtension();
        $path = public_path('AuthorisedSignature');
        $image->move($path, $signature);
      }
      $data = DB::select('call update_authorised_signature(?,?,?,?,?,?,@result)', array($id, $request->name, $request->designation, $signature, $request->college_id, $request->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function user_data_based_on_accession_number($acc_no)
  {
    try {
      $data = DB::select('call user_data_based_on_accession_number(?)', array($acc_no));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function inactive_or_active_authorise_signature($id)
  {
    try {
      $data = DB::table('authorised_signatures')->where('id', $id)->first();
      if ($data->authorise_status == 'active') {
        $update = DB::table('authorised_signatures')->where('id', $id)->update(['authorise_status' => 'inactive']);
      } else {
        $update = DB::table('authorised_signatures')->where('id', $id)->update(['authorise_status' => 'active']);
      }
      if ($update) {
        return response()->json("Status Updated Successfully");
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function library_card_list_print($year, $dept)
  {
    try {
      $data = DB::select('call library_card_list(?,?)', array($year, $dept));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function add_editor(Request $request)
  {
    try {
      DB::select('call add_editor(?,?,?,?,@result)', array($request->editor_name, $request->editor_address, $request->college_id, $request->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function edit_editor($id)
  {
    try {
      $data = DB::select('call edit_editor(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function get_editor($clg_id)
  {
    try {
      $data = DB::select('call get_editor(?)', array($clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function update_editor(Request $request, $id)
  {
    try {
      DB::select('call update_editor(?,?,?,?,?,@result)', array($id, $request->editor_name, $request->editor_address, $request->college_id, $request->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function delete_editor($id)
  {

    try {
      DB::select('call delete_editor(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function return_book_by_dept(Request $req, $clg, $dept)
  {
    try {
      $data = DB::select('CALL return_book_by_dept(?,?)', [$clg, $dept]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function return_book_by_accNo(Request $req, $clg, $accNo)
  {
    try {
      $data = DB::select('CALL return_book_by_accno(?,?)', [$clg, $accNo]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function accNo_fetch(Request $req, $clg)
  {
    try {
      $data = DB::select('CALL accNo_fetch_by_dept(?)', [$clg]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  public function accNo_fetch_usr(Request $req, $clg)
  {
    try {
      $data = DB::select('CALL fetchaccNo_by_usr(?)', [$clg]);
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function accNo_fetch_from_to(Request $req, $clg, $start, $end)
  {

    try {
      $data = DB::select('CALL accNo_from_to(?,?,?)', [$clg, $start, $end]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // logout
  public function logout(Request $req)
  {
    try {
      $req->user()->currentAccessToken()->delete();
      return response()->json("Logged Out Successfully!");
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  //subjects
  public function add_subject(Request $req)
  {
    try {
      $duplicate = DB::table('subjects')->where('college_id', '=', $req->college_id)->where('subject_name', $req->subject_name)->get();
      if (count($duplicate)) {
        return response()->json('Duplicate Data Entry');
      } else {
        $data = DB::select('Call add_subject (?,?,?,@result)', array($req->subject_name, $req->college_id, $req->entry_by));
        $res = DB::select('SELECT @result AS res');
        return response()->json($res[0]->res);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit_subject($id)
  {
    try {
      $data = DB::select('call edit_subject(?)', array($id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function get_subject($clg_id)
  {
    try {
      $data = DB::select('call get_subject(?)', array($clg_id));
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function del_subject($id)
  {
    try {
      DB::select('call delete_subject(?,@result)', array($id));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function update_subject(Request $request, $id)
  {
    try {
      DB::select('call update_subject(?,?,?,?,@result)', array($id, $request->subject_name, $request->college_id, $request->entry_by));
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  //  subject wise report
  public function book_report_subject_wise($sub_id, $clg_id)
  {
    try {
      $data = DB::select('CALL book_report_subject_wise(?,?)', [$sub_id, $clg_id]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function book_report_subject_wise_search($clg, $subName)
  {
    try {
      $data = DB::select('CALL book_report_subject_wise_search(?,?)', [$clg, $subName]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function delete_all_navigations($user_role_id)
  {
    try {
      $data = DB::select('call delete_all_navigations(?,@result)', [$user_role_id]);
      $res = DB::select('SELECT @result AS res');
      return response()->json($res[0]->res);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // Search for individual books by subject
  public function ind_book_by_subject($clg, $subject)
  {
    try {
      $data = DB::SELECT('CALL book_by_subject(?,?)', [$clg, $subject]);
      if (count($data) > 0) {
        return response()->json([$data, 'status' => 1]);
      } else {
        return response()->json(['msg' => 'No data Found', 'status' => 0]);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // college id and book tittle search
  public function search_title_clgid($college_id, $title)
  {
    try {
      $data = DB::table('book_titles')->select('book_titles.book_title_id', 'book_titles.book_title_name')
        ->join('colleges', 'book_titles.college_id', '=', 'colleges.college_id')
        ->where('colleges.college_id', '=', $college_id)
        ->where('book_title_name', 'like', '%' . $title . '%')->get();
      return response()->json($data);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // publisher search
  public function publisher_search($clg_id, $str)
  {
    try {
      $data = DB::select('call publishers_search(?,?)', [$clg_id, $str]);
      if (count($data) > 0) {

        return response()->json($data);
      } else {
        return response()->json(['msg' => 'No Data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // vendor_search
  public function vendor_search($clg_id, $str)
  {
    try {
      $data = DB::select('call vendor_search(?,?)', [$clg_id, $str]);
      if (count($data) > 0) {

        return response()->json($data);
      } else {
        return response()->json(['msg' => 'No Data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // bill_search
  public function bill_search($clg_id, $str)
  {
    try {
      $data = DB::select('call bill_search(?,?)', [$clg_id, $str]);
      if (count($data) > 0) {

        return response()->json($data);
      } else {
        return response()->json(['msg' => 'No Data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  // subject_search
  public function sub_search($clg_id, $str)
  {
    try {
      $data = DB::select('call subject_search(?,?)', [$clg_id, $str]);
      if (count($data) > 0) {

        return response()->json($data);
      } else {
        return response()->json(['msg' => 'No Data Found']);
      }
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
  public function all_details_data($college_id)
  {
    try {
      $all_users = DB::select("select COUNT(DISTINCT users.user_id) AS all_user from users join assign_roles on users.user_id=assign_roles.user_id 
    join user_roles on assign_roles.user_role_id=user_roles.user_role_id
    where user_roles.user_role !='student' and users.user_status='active' and users.college_id='$college_id'");
      $all_student = DB::select("select COUNT(DISTINCT users.user_id) AS all_student from users join assign_roles on users.user_id=assign_roles.user_id 
    join user_roles on assign_roles.user_role_id=user_roles.user_role_id
    where user_roles.user_role ='student' and users.user_status='active' and users.college_id='$college_id'");
      $available_books = DB::select("SELECT count(*) as available_books FROM books where book_status='inlibrary' and college_id='$college_id'");
      $total_book = DB::select("SELECT count(*) as total_books FROM books where college_id='$college_id'");
      $issued_books = DB::select("SELECT count(*) as issued_books FROM books where book_status='issued' and college_id='$college_id'");
      return response()->json([
        'employee' => $all_users[0]->all_user,
        'students' => $all_student[0]->all_student,
        'available_books' => $available_books[0]->available_books,
        'total_books' => $total_book[0]->total_books,
        'issued_books' => $issued_books[0]->issued_books
      ]);
    } catch (\Exception $e) {
      // Exception handling
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function address(Request $request)
  {
    // $shellexec = shell_exec('arp -a'); 
    // dd($shellexec);

    $shellexec = exec('ifconfig eth0 | grep ether | awk \'{print $2}\'');
    dd($shellexec);
  }

  public function searchApi($contact)
  {
    $data = DB::table('users')->where('contact', $contact)->get(['name', 'email', 'address']);
    return response()->json($data);
  }



  public function updateLibraryCardno(Request $request, $id)
  {
      try {
          // Validate the input data (library_card_number must be unique)
          $request->validate([
            'library_card_number' => 'required|string|max:255|unique:users,library_card_number,' . $id . ',user_id', // Ensures uniqueness except for the current user
              'entry_by' => 'required|integer',
          ]);
  
          // Find the user by ID
          $user = User::findOrFail($id);
  
          // Update user's library card number and entry_by
          $user->library_card_number = $request->input('library_card_number');
          $user->entry_by = $request->input('entry_by');
          
          // Save the updated user record
          $user->save();
  
          // Return success response
          return response()->json([
              'success' => true,
              'message' => 'Library card number updated successfully!',
              'data' => $user
          ], 200);
  
      } catch (\Illuminate\Validation\ValidationException $e) {
          // Handle validation errors
          return response()->json([
              'success' => false,
              'message' => 'Validation failed',
              'errors' => $e->errors()
          ], 422);
  
      } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
          // Handle case where the user is not found
          return response()->json([
              'success' => false,
              'message' => 'User not found',
          ], 404);
  
      } catch (\Exception $e) {
          // Handle any other exceptions
          return response()->json([
              'success' => false,
              'message' => 'An error occurred while updating the library card number',
              'error' => $e->getMessage()
          ], 500);
      }
  }
  
  
  
}
