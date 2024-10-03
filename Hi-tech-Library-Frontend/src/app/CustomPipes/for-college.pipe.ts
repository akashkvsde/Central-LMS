import { Pipe, PipeTransform } from '@angular/core';

// -------------------------------------For College-----------------------------
@Pipe({
  name: 'forCollege'
})
export class ForCollegePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const collegeName = item.college_name.toLowerCase();
      const phoneNo = item.phone_no.toLowerCase();
      const collegeEmail = item.college_email.toLowerCase();

      return (
        collegeName.includes(searchValue) ||
        phoneNo.includes(searchValue) ||
        collegeEmail.includes(searchValue)
      );
    });
  }
  }
// -------------------------------------For AsignNav-----------------------------
@Pipe({
  name: 'forAssignNavSearch'
})

export class ForAssignNavPipe implements PipeTransform {

  transform(value: any,args?:any): any {
    // console.log(args);

    if(!args){
      return value
    }
    return value.filter((item:any)=>item.nav_page_name.indexOf(args));
  }

}
// -------------------------------------For Course-----------------------------
@Pipe({
  name: 'forCourse'
})
export class ForCoursePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const courseName = item.course_name.toLowerCase();
      return courseName.includes(searchValue);
    });
  }
}

// -------------------------------------For Departmemnt-----------------------------
@Pipe({
  name: 'forDept'
})
export class ForDepartmentPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const collegeName = item.college_name.toLowerCase();
      const courseName = item.course_name.toLowerCase();
      const deptName = item.dept_name.toLowerCase();

      return (
        collegeName.includes(searchValue) ||
        courseName.includes(searchValue) ||
        deptName.includes(searchValue)
      );
    });
  }
}

// -------------------------------------For Currency-----------------------------
@Pipe({
  name: 'forCurrency'
})
export class ForCurrencyPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => item.curr_type.toLowerCase().includes(searchValue));
  }
}

// -------------------------------------For Fine Policy-----------------------------
@Pipe({
  name: 'forFinePolicy'
})
export class ForFinePolicyPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const userType = item.user_type.toLowerCase();
      const issueType = item.issue_type.toLowerCase();
      const finePolicyAmount = item.fine_policy_amount.toLowerCase();
      const exceedDays = item.exceed_days.toLowerCase();
      
      return userType.includes(searchValue) ||
        issueType.includes(searchValue) ||
        finePolicyAmount.includes(searchValue) ||
        exceedDays.includes(searchValue);
    });
  }
}

// --------------------------------------------User Log Details----------------------------
@Pipe({
  name: 'forUserlogData'
})
export class ForuserLogDetails implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const userType = item.user_type.toLowerCase();
      const issueType = item.issue_type.toLowerCase();
      const finePolicyAmount = item.fine_policy_amount.toLowerCase();
      const exceedDays = item.exceed_days.toLowerCase();

      return userType.includes(searchValue) ||
        issueType.includes(searchValue) ||
        finePolicyAmount.includes(searchValue) ||
        exceedDays.includes(searchValue);
    });
  }
}

// --------------------------------------------User Book-Requests----------------------------
@Pipe({
  name: 'forUserBookrequests'
})
export class ForuserBookRequest implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const userType = item.user_type.toLowerCase();
      const issueType = item.issue_type.toLowerCase();
      const finePolicyAmount = item.fine_policy_amount.toLowerCase();
      const exceedDays = item.exceed_days.toLowerCase();

      return userType.includes(searchValue) ||
        issueType.includes(searchValue) ||
        finePolicyAmount.includes(searchValue) ||
        exceedDays.includes(searchValue);
    });
  }
}

// --------------------------------------------User Book-Requests----------------------------
@Pipe({
  name: 'forUsersSearchinAssignrole'
})
export class ForAssignRoleUserSearch implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const libraryCardNumber = item.library_card_number.toLowerCase();
      const contact = item.contact.toLowerCase();
      
      return libraryCardNumber.includes(searchValue) ||
        contact.includes(searchValue);
    });
  }
}

// -------------------------------------For Issue Type-----------------------------
@Pipe({
  name: 'forIssuetype'
})
export class ForIssueTypePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const issueType = item.issue_type.toLowerCase();
      const issueDays = item.issue_days.toLowerCase();
      
      return issueType.includes(searchValue) ||
        issueDays.includes(searchValue);
    });
  }
}

// -------------------------------------For Issue Policy-----------------------------
@Pipe({
  name: 'forIssuePolicy'
})
export class ForIssuePolicyPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const userType = item.user_type.toLowerCase();
      const issueType = item.issue_type.toLowerCase();
      const maxBook = item.max_book.toLowerCase();
      
      return userType.includes(searchValue) ||
        issueType.includes(searchValue) ||
        maxBook.includes(searchValue);
    });
  }
}

// -------------------------------------For User role-----------------------------
@Pipe({
  name: 'forUserRole'
})
export class ForUserRolePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const userRole = item.user_role.toLowerCase();
      
      return userRole.includes(searchValue);
    });
  }
}

//--------------------For Subjects --------------------------------

@Pipe({
  name: 'forSubjects'
})
export class ForSubjectsPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const navPageName = item.subject_name.toLowerCase();
      
      return navPageName.includes(searchValue);
    });
  }
}


// -------------------------------------For Vendors-----------------------------
@Pipe({
  name: 'forVendor'
})
export class ForVendorPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const vendorName = item.vendor_name.toLowerCase();
      const vendorEmail = item.vendor_email.toLowerCase();
      const vendorContact = item.vendor_contact.toLowerCase();
      const vendorAddress = item.vendor_address.toLowerCase();

      return (
        vendorName.includes(searchValue) ||
        vendorEmail.includes(searchValue) ||
        vendorContact.includes(searchValue) ||
        vendorAddress.includes(searchValue)
      );
    });
  }
}

// -------------------------------------For Publisher-----------------------------
@Pipe({
  name: 'forPublisher'
})
export class ForPublisherPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const publisherName = item.publisher_name.toLowerCase();
      const publisherPlace = item.publisher_place.toLowerCase();

      return (
        publisherName.includes(searchValue) ||
        publisherPlace.includes(searchValue)
      );
    });
  }
}

// -------------------------------------For Author-----------------------------
@Pipe({
  name: 'forAuthor'
})
export class ForAuthorPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const authorName = item.author_name.toLowerCase();

      return authorName.includes(searchValue);
    });
  }
}

// -------------------------For Bill Details-----------------------------
@Pipe({
  name: 'forBillDetails'
})
export class ForBilldetailsPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const vendorName = item.vendor_name.toLowerCase();
      const billNum = item.bill_num.toLowerCase();

      return (
        vendorName.includes(searchValue) ||
        billNum.includes(searchValue)
      );
    });
  }
}

// -----------------------------For Book Title-----------------------------
@Pipe({
  name: 'forBoktitle'
})
export class ForBookTitlePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const bookTitleName = item.book_title_name.toLowerCase();

      return bookTitleName.includes(searchValue);
    });
  }
}

// -----------------------------For navigation Page-----------------------------
@Pipe({
  name: 'fornavPage'
})
export class ForNavigationPagePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const navPageName = item.nav_page_name.toLowerCase();

      return navPageName.includes(searchValue);
    });
  }
}

// -------------------------------------For DocumentType-----------------------------
@Pipe({
  name: 'forDocType'
})
export class ForDocTypePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const documentType = item.document_type.toLowerCase();

      return documentType.includes(searchValue);
    });
  }
}
// -----------------------------For Location-----------------------------
@Pipe({
  name: 'forLocation'
})
export class ForLocationPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchString = args.toLowerCase();

    return value.filter((item: any) => {
      const almirahNo = item.almirah_no.toString().toLowerCase();
      const shelfNo = item.shelf_no.toString().toLowerCase();

      return almirahNo.includes(searchString) || shelfNo.includes(searchString);
    });
  }
}
// -----------------------------For Book search Circulation Part For Book Issue-----------------------------
@Pipe({
  name: 'forBookSearch'
})
export class ForBookSearchPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const bookTitleName = item.book_title_name.toLowerCase();
      const accessionNo = item.accession_no.toString().toLowerCase();

      return bookTitleName.includes(searchValue) || accessionNo.includes(searchValue);
    });
  }
}

// -----------------------------For Passwords List-----------------------------
@Pipe({
  name: 'forPasswordSearch'
})
export class ForPasswordSearchPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const libraryCardNumber = item.library_card_number.toString().toLowerCase();
      const email = item.email.toString().toLowerCase();

      return libraryCardNumber.includes(searchValue) || email.includes(searchValue);
    });
  }
}




// -----------------------------For Users Search In User Management Section View-Users-----------------------------
@Pipe({
  name: 'forUsersSearch'
})
export class ForUsersSearchPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    if (!args || !Array.isArray(value)) {
      return value;
    }

    const searchTerm = args.toString().toLowerCase();

    return value.filter((item: any) => {
      // Check if the properties exist and are not null or undefined
      const hasName = 'name' in item && item.name !== null && item.name !== undefined;
      const hasBatchYear = 'batch_year' in item && item.batch_year !== null && item.batch_year !== undefined;
      const hasLibraryCardNumber = 'library_card_number' in item && item.library_card_number !== null && item.library_card_number !== undefined;
      const hasCourseName = 'course_name' in item && item.course_name !== null && item.course_name !== undefined;
      const hasDeptName = 'dept_name' in item && item.dept_name !== null && item.dept_name !== undefined;

      // Perform the search on properties if they exist
      if (hasName && item.name.toString().toLowerCase().indexOf(searchTerm) > -1) {
        return true;
      }
      if (hasBatchYear && item.batch_year.toString().toLowerCase().indexOf(searchTerm) > -1) {
        return true;
      }
      if (hasLibraryCardNumber && item.library_card_number.toString().toLowerCase().indexOf(searchTerm) > -1) {
        return true;
      }
      if (hasCourseName && item.course_name.toString().toLowerCase().indexOf(searchTerm) > -1) {
        return true;
      }
      if (hasDeptName && item.dept_name.toString().toLowerCase().indexOf(searchTerm) > -1) {
        return true;
      }
      return false;
    });
  }
}
