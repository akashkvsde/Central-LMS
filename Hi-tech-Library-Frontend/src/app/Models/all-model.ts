export class AllModel {

}

export class College {
    'college_id':any;
    'college_name':any;
    'college_email':any;
    'college_address':any;
    'phone_no':any;
    'short_name':any;
    'entry_by':any;
}
export class Course {
    'course_name':any='';
    'college_id':any;
    // 'College_name':any;
    'entry_by':any;
}
export class Subject {
    'subject_id':any;
    'subject_name':any;
    'entry_by':any;
    'college_id':any;
}
export class subjectWise {
    'subject_id':any;
}

export class Department {
    'course_id':any;
    'college_id':any;
    'dept_name':any;
    'entry_by':any;
}
export class Currency {
    'curr_type':any;
    'entry_by':any;
    'college_id':any;
}
export class DocType {
    'document_type':any;
    'entry_by':any;
    'college_id':any;
}
export class Finepolicy {
    'user_type':any;
    'issue_type_id':any;
    'exceed_days':any;
    'fine_policy_amount':any;
    'status':any='Active';
    'college_id':any;
    'entry_by':any;
}
export class Userrole {
    'user_role':any;
    'entry_by':any;
    'college_id':any;
}
export class Issuetype {
    'issue_type':any;
    'issue_days':any;
    'entry_by':any;
    'college_id':any;
}

export class Issuepolicy {
    'user_type':any;
    'issue_type_id':any;
    'max_book':any;
    'college_id':any;
    'entry_by':any;
}
export class Vendors {
    'vendor_name':any;
    'vendor_email':any;
    'vendor_contact':any;
    'vendor_address':any;
    'college_id':any;
    'entry_by':any;
}
export class Publishers {
    'publisher_name':any;
    'publisher_place':any;
    'college_id':any;
    'entry_by':any;
}
export class Authors {
    'author_name':any;
    'college_id':any;
    'entry_by':any;
}
export class Billdetails {
    'vendor_id':any;
    'bill_date':any;
    'bill_num':any;
    'college_id':any;
    'bill_doc':any;
    'entry_by':any;
}

export class Booktitles {
    'book_title_name':any;
    'college_id':any;
     'entry_by':any;
}
export class Location {
    'almirah_no':any;
    'shelf_no':any;
    'rack_no':any='';
    'college_id':any;
    'entry_by':any;
}
export class BooksRegistration {
    "accession_no":any	
    "subject_id":any	
    "book_title_id":any	
    'first_author_id':any
    'second_author_id':any
    'third_author_id':any 
    "publisher_id":any	
    "volume":any=''	
    "editor":any=''	
    "edition":any=''	
    "edition_year":any=''	
    "translator":any=''	
    "compiler":any=''	
    "publish_year":any=''	
    "no_of_pages":any=''
    "isbn_no":any	
    "language":any=''	
    "series":any=''	
    "source":any=''
    "book_image":any
    "content":any=''
    "currency_id":any
    "document_id":any
    "dept_id":any
    "vendor_id":any	
    "bill_id":any
    "suppl_copies":any=''	
    "abstract":any	
    "nature_of_binding":any=''	
    "entry_date":any
    "notes":any=''
    "keywords":any	
    "call_no":any=''
    "book_price":any=''
    
    "college_id":any
    "book_status":any
    "location_id":any	
    "entry_by":any
    'LastAccessioNo':any
    book_title_name:any
}

export class Login {
    'email':any;
    'password':any;
}


export class NavigationPage {
    'nav_page_name':any;;
     'entry_by':any;
}


export class StudentRegistreModel{
	name:any	
	email:any	
	contact:any	
	address:any	
	gender:any	
	image:any	
	batch_year:any	
	course_id:any	
	dept_id:any	
	college_id:any
	user_status:any	
    emp_role:any	
	password:any
	entry_by:any
}

export class empRegistreModel{
	name:any	
	email:any	
	contact:any	
	address:any	
	gender:any	
	image:any	
	batch_year:any	
	designation:any	
	// course_id:any	
	// dept_id:any	
	college_id:any
	user_status:any	
	document:any
    emp_role:any	
	password:any
	entry_by:any
}


export class assignroleModel{
	user_id:any
	user_role_id:any
	name:any
	entry_by:any
	college_id:any
}

export class userUpdateModel{
    address: any
    batch_year:any 
    college_address: any
    college_email:any 
    college_id: any
    college_name: any
    contact: any
    course_id: any
    course_name:any 
    dept_id: any
    dept_name: any
    designation: any
    email:any
    entry_by:any
    gender:any
    image:any 
    library_card_number:any 
    name: any
    user_id:any
    user_role:any 
    user_role_id:any
    user_status:any 
    document:any
    }


    export class changePassword{
        'old_password':any;
        'new_password':any;
         'user_id':any
        }

  //DepartmentalIssue
  export class DEPTISSUEModel{
    'college_id':any;
    'course_id':any;
     'department_id':any
    }
    
    export class ReturnIssuedBook{
        'library_card_number':any
        'accession_no':any
        'accession_no2':any
        'dept_id':any
        }
  export class FineCollection{
    'library_card_number':any
    'accession_id':any
    'reason':any
    'fine_amount':any
    'fine_policy_id':any
    'entry_by':any
    }


    

    export class updateBookIndividual{
        book_id:any
        accession_no:any
        book_title_id:any
        book_title_name:any
        first_author_id:any
        author_name:any
        second_author_id:any
        third_author_id:any
        second_author_name:any
        third_author_name:any
        publisher_id:any
        publisher_name:any
        volume:any
        editor:any
        translator:any
        compiler:any
        edition:any
        edition_year:any
        publish_year:any
        no_of_pages:any
        isbn_no:any
        language:any
        series:any
        source:any
        content:any
        currency_id:any
        document_id:any
        document_type:any
        //dept_id:any  //will be cahanged
        subject_id:any
        subject_name:any
        vendor_id:any
        vendor_name:any
        bill_id:any
        bill_num:any
        suppl_copies:any
        abstract:any
        nature_of_binding:any
        entry_date:any
        notes:any
        keywords:any
        call_no:any
        book_price:any
        book_image:any
        college_id:any
        location_id:any
        book_status:any
        entry_by:any
    }



export class titlewiseReport{
    'bookTitle_id':any;
    'name':any
    
    }
export class departmentWise{
    'department_id':any;
    }

    export class collegeWise{
        'college_id':any;
    }
    export class navPagenames{
        navpages:any[]=[]
    }

    export class bookStatus{
        'book_status':any;
    }
    export class AuthrizedSignatures{
        'name':any;
        'designation':any;
        'signature':any;
        'college':any;
        'college_id':any;
        'authorise_status':any;
    }



    
export class book_reservation{
    max_book:any
    issued_book:any
    requested_book:any
    user_type:any
    college_id:any
    user_id:any
    accession_no:any
    issue_type_id:any
    inputLibraryCardNo:any
    selectedIssues: { issueTypeId: number, accessionNo: string }[] = [];
}
export class bookIssue{
    max_book:any
    issued_book:any
    requested_book:any
    user_type:any
    college_id:any
    user_id:any
    accession_no:any
    issue_type_id:any
    inputLibraryCardNo:any
    selectedIssues: { issueTypeId: number, accessionNo: string }[] = [];
}





export class AuthorisedPersonModel{
    id:any
    name:any
    designation:any
    signature:any
    college_id:any
    authorise_status:any
    entry_by:any
  }

  export class assignLibraryCard {
    user_id:any	
    name:any	
	email:any	
	contact:any	
	address:any	
	gender:any	
	image:any	
	batch_year:any	
	course_id:any	
	dept_id:any	
	college_id:any
	user_status:any	
    emp_role:any	
	password:any
	entry_by:any
}

