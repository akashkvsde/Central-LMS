import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Authors, BooksRegistration, Booktitles } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent  implements OnInit{
  imagePath:any
  BookTitles:any[]=[];
  Authors:any;
  searchh:any;
  p:any=1;
  // searchh:any[]=[];
  book = new Booktitles();
  auth = new Authors();
  bookks = new BooksRegistration();
  editbookid:any;
  ttl: any;
  book_title:any;
  author_name:any;
  bookTitle:any;

 constructor(private AllDataService:AllDataService) {}
 college_id:any;//session
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    // this.getBookTitle();
    // this.getAuthor();
    this. getBooks();
    // interval(5000).subscribe(() => {
    //   this.getBooks();
    // });


    let imgUrl = sessionStorage.getItem('url');

    if (imgUrl) {
        // Split the URL by "/"
        const urlSegments = imgUrl.split('/');
        urlSegments.pop();

        // Join the remaining segments back into a URL
        const baseUrl = urlSegments.join('/');

        this.imagePath = `${baseUrl}/BookImage/`;

        console.log(baseUrl);
    } else {
        console.error('imgUrl is null');
    }


 }
  selectedBookTitleId:any
  // getBookTitle() {
  //   this.AllDataService.getTitle(this.college_id).subscribe((res: any) => {
  //     this.BookTitles = res;
  //     console.log(res);
  //   });
  // }

  // getAuthor() {
  //   this.AllDataService.getAuthors(this.college_id).subscribe((res: any) => {
  //     this.Authors = res;
  //     // console.log(res)
  //   });
  // }



 getBooks() {
    this.AllDataService.FetchBook(this.college_id).subscribe((res: any) => {
      this.searchh = res;
      // console.log(res);
    })
  }

  editBookById(accession_no: any) {
    this.AllDataService.EditBookById(accession_no).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.editbookid = res[0];
      }
    });
  }
  BookTitlesid: string[] = [];

  searchingAuthTtl(title:any,author:any){
    // console.log(title);
    // console.log(author);
   if(this.bookks.book_title_name ==0 && author ==0){
      // console.log('both are not filled');

    }else if(this.bookks.book_title_name !==null && author ==0){
      console.log('title called');
     if(this.bookks.book_title_name){
      this.AllDataService.SearchBookTitle(this.bookks.book_title_name,this.college_id).subscribe((res:any)=>{
        // console.log(res);
      this.searchh=res;
    });
     }else{
      this. getBooks();
     }

    }else if(title ==0 && author !== null){
      console.log('auth called');
      this.AllDataService.SearchByAuthor(this.college_id,this.auth.author_name).subscribe((res:any)=>{
        console.log(res);
        this.searchh=res;
         });

    }else if(title !==null && author !== null) {
      console.log('both are called');
      this.AllDataService.SearchTitleAuthor(this.college_id,this.bookks.book_title_name,this.auth.author_name).subscribe((res:any)=>{
        //  console.log(res);
        this.searchh=res;
         });

    }else{
        this. getBooks();
    }
   }



val:any;
accession_no:any
  searchAcessNo(){
    // console.log(this.accession_no);
    if(this.accession_no){
      this.AllDataService.SearchAccessionNo(this.accession_no,this.college_id).subscribe((res:any)=>{
        this.searchh=res;
          });
    }else{
      this.getBooks()

    }

  }

  searchKeywords(){
   if(this.bookks.keywords){
    this.AllDataService.SearchByKeyword(this.bookks.keywords).subscribe((res:any)=>{
      // console.log(res);
      this.searchh=res;
    // location.reload();

    });
   }else{
    this.getBooks()

  }
  }




  //print
  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    const printContents = this.printableDiv.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload()
  }



}
