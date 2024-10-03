import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../Services/all-data.service';
import { book_reservation } from '../Models/all-model';

@Component({
  selector: 'app-book-reservation',
  templateUrl: './book-reservation.component.html',
  styleUrls: ['./book-reservation.component.css']
})
export class BookReservationComponent implements OnInit{
  imgPath:any;
  bookresModel = new book_reservation();
  //session area
    entry_by:any
    college_id:any
    p:any=1

  //session area

  constructor (private allService:AllDataService){}

  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.entry_by=sessionStorage.getItem('user_id')
    console.log(this.college_id,this.entry_by);

    this.issueType()

    let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();

        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');

        this.imgPath = `${baseUrl}/BookImage/`;

        console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }
  }

tabledata:any
  getDatatitle(ti:any,author:any){
   if(ti.length !=0){
    console.log("title of title");
   if(ti.length>=3){
    this.allService.getBookTitleonly(this.college_id,ti).subscribe((data:any)=>{
      this.tabledata = data
    })
   }
   }else if((author.length!=0)&& (ti.length==0)){
    console.log("auth auth");
    if(author.length>=3){
      this.allService.getBookAuthoronly(this.college_id,author).subscribe((bata:any)=>{
        this.tabledata = bata
        console.log(bata);
      })
    }
   }else{
   console.log("blank");
   this.tabledata = null
   }
  }

  getauthTitle(title:any,author:any)
  {
    if((author.length!=0)&& (title.length!=0)){
      console.log("auth+title");
     if((author.length>=2)&& (title.length>=3)){
      this.allService. SearchTitleAuthors(this.college_id,title,author).subscribe((bata:any)=>{
        this.tabledata = bata
        console.log(bata);
      })
     }
    }else if((author.length!=0)&& (title.length==0)){
        console.log("auth only");
       if(author.length>=2){
        this.allService.getBookAuthoronly(this.college_id,author).subscribe((bata:any)=>{
          this.tabledata = bata
          console.log(bata);
        })
       }
    }else if((author.length==0)&& (title.length!=0)){
      console.log("title title");
      if(title.length>=3){
        this.allService.getBookTitleonly(this.college_id,title).subscribe((data:any)=>{
          this.tabledata = data
        })
      }
    }else{
      console.log("blank");
      // console.log(this.tabledata);
      this.tabledata = null
    }
  }


  getauthTitleVolume(title:any,author:any,volume:any){
    if((volume.length!=0)&&(author.length!=0)&&(title.length!=0)){
      console.log("get depended vol data")
    if((volume.length!=0)&&(author.length>=2)&&(title.length>=3)){
      this.allService.SearchTitleAuthorVol(title,author,volume,this.college_id).subscribe((data:any)=>{
        this.tabledata = data
      })
    }
    }else if(((author.length!=0) && (title.length!=0))&&(volume.length ==0)){
      console.log("title + auth");
      this.allService.getBookAuthoronly(this.college_id,author).subscribe((bata:any)=>{
        this.tabledata = bata
        console.log(bata);
      })
    }
    else{
      console.log("insert");
    }
  }



  keyWord(keyword:any){
    if(keyword.length !=0){
      console.log("key word");
    if(keyword.length>=2){
      this.allService.keyWordSearch(keyword,this.college_id).subscribe((data)=>{
        this.tabledata = data
      })
    }
    }else{
      console.log("blank");
      this.tabledata = null
    }
  }


issue_data:any
  issueType(){
    this.allService.issueType(this.college_id).subscribe((data:any)=>{
      this.issue_data = data
    })
  }




  issueChange(iss:any,acc_no:any){
    this.bookresModel.college_id = this.college_id
    this.bookresModel.user_id = this.entry_by
    this.bookresModel.accession_no= acc_no
    this.bookresModel.issue_type_id= iss
   console.log(iss);
   this.allService.maxNo(this.entry_by,iss).subscribe((data:any)=>{
    if(data == 0){
      alert("Sorry !!Maximum no of book is not assigned To Your roel Yet!!")
    }else{
      console.log("proceed to max")
      this.bookresModel.max_book = data[0].max_book
      console.log(this.bookresModel);
    }

  })

  this.allService.isuRtnBook(this.entry_by,iss).subscribe((cata:any)=>{
    console.log(cata);
    this.bookresModel.issued_book = cata.issued_book
    this.bookresModel.requested_book = cata.requested_book
    console.log(this.bookresModel.issued_book,this.bookresModel.requested_book);
  })

  this.allService.getUserRoleBYuserID(this.entry_by).subscribe((res:any)=>{
    console.log(res);
    const user_role = res.map((item: any) => item.user_role);
    console.log(user_role);
    const isStdUser = user_role.includes('Student');
    if (isStdUser) {
     console.log('Student ');
      this.bookresModel.user_type='STD'
    } else {
      console.log('All are Employee');
      this.bookresModel.user_type='EMP'
    }
  })

  }







bookRequest(iss:any){
  console.log(this.bookresModel);

   if(iss == 0){
    alert("Please select Issue type!!");
   }else{
    if(this.bookresModel.issued_book <= this.bookresModel.max_book)
    {
    const rest_book =  parseInt(this.bookresModel.max_book) - parseInt(this.bookresModel.issued_book)
    console.log(rest_book);

    if(rest_book >= this.bookresModel.requested_book){
      console.log("proceed")
      console.log("Please Visit the Library within 24 hrs");

      this.allService.sendBookreq(this.bookresModel).subscribe((cata:any)=>{
        console.log(cata);
        if(cata===1){
          alert('Your Book Request has been sent Successfully,Please Visit the Library within 24 hours !!');
          this.tabledata = null
        }else{
          alert('Process is unsuccessfully')
        }
      },(err:any)=>{
        // alert("Somethimg Went wrong !! ")
        console.log(err);

      })


    }else{
      alert("You cant apply more book than your rest requested book");
    }


    }else{

      if(this.bookresModel.max_book == null){
        alert("This user have no limit to issue books.");
      }else{
        alert("You Cant Proceed for request..You reached the max quantity..");
      }
    }
   }
}






}
