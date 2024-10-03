
import { Component, OnInit } from '@angular/core';
import { updateBookIndividual } from 'src/app/Models/all-model';
import { AllDataService } from 'src/app/Services/all-data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-book-group',
  templateUrl: './edit-book-group.component.html',
  styleUrls: ['./edit-book-group.component.css']
})
export class EditBookGroupComponent implements OnInit{
  imgPath:any
  Search_Books:any;
  constructor (private allService:AllDataService){}
  updatemodel = new updateBookIndividual();
  //session area
    entry_by:any
    college_id:any
  //session area
  p: number = 1;
  isSuperAdmin:any

 ngOnInit(): void {
  this.college_id=sessionStorage.getItem('college_id');
  this.entry_by=sessionStorage.getItem('user_id');
  this.isSuperAdmin= this.allService.isSuperAdmin()
    this.getDataontable()
    this.getCurrency()
    this.getDoc()
    this.getLocation()

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

  currentPage=1;
  previous(){
    if(this.currentPage > 1){
      this.currentPage--;
    }
  }
  Next(){
    if(this.currentPage < 4){
      this.currentPage ++;
    }
  }


  //=============showData in table=======================
  fetchdata:any
  getDataontable(){
    this.allService.getDataeditModel(this.college_id).subscribe((data:any)=>{
     this.fetchdata = data
     console.log(data);

    },(err)=>{
    //  alert("Someting went wrong!!")
    })
  }


  //======================================edit model========================
  editBookind(data:any){
   this.updatemodel = data
   
   console.log(this.updatemodel);
  }

  updateForm(){
    this.updatemodel.entry_by = this.entry_by
    const formData = new FormData();
    formData.append('book_id', this.updatemodel.book_id);
    formData.append('compiler', this.updatemodel.compiler);
    formData.append('book_title_id', this.updatemodel.book_title_id);
    formData.append('first_author_id', this.updatemodel.first_author_id);
    formData.append('second_author_id', this.updatemodel.second_author_id);
    formData.append('third_author_id', this.updatemodel.third_author_id);
    formData.append('publisher_id', this.updatemodel.publisher_id);
    formData.append('volume', this.updatemodel.volume);
    formData.append('subject_id', this.updatemodel.subject_id);
    formData.append('editor', this.updatemodel.editor);
    formData.append('translator', this.updatemodel.translator);
    formData.append('edition', this.updatemodel.edition);
    formData.append('edition_year', this.updatemodel.edition_year);
    formData.append('publish_year', this.updatemodel.publish_year);
    formData.append('no_of_pages', this.updatemodel.no_of_pages);
    formData.append('language', this.updatemodel.language);
    formData.append('series', this.updatemodel.series);
    formData.append('source', this.updatemodel.source);
    formData.append('content', this.updatemodel.content);
    formData.append('currency_id', this.updatemodel.currency_id);
    formData.append('document_id', this.updatemodel.document_id);
    formData.append('document_type', this.updatemodel.document_type);
    formData.append('vendor_id', this.updatemodel.vendor_id);
    formData.append('bill_id', this.updatemodel.bill_id);
    formData.append('suppl_copies', this.updatemodel.suppl_copies);
    formData.append('abstract', this.updatemodel.abstract);
    formData.append('nature_of_binding', this.updatemodel.nature_of_binding);
    formData.append('notes', this.updatemodel.notes);
    formData.append('keywords', this.updatemodel.keywords);
    formData.append('call_no', this.updatemodel.call_no);
    formData.append('book_price', this.updatemodel.book_price);
    formData.append('book_image', this.updatemodel.book_image);
    formData.append('college_id', this.updatemodel.college_id);
    formData.append('location_id', this.updatemodel.location_id);
    formData.append('entry_by', this.updatemodel.entry_by);
 
 
    this.allService.updateBookGroup(formData).subscribe((data:any)=>{
     console.log(data)
     alert(data)
     this.getDataontable()
    },(err:any)=>{
     alert("Something wrong!! Try again")
     this.getDataontable()
    })
  }

  deleteBook(id: any) {
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm('Are you sure you want to delete this book?');

    // Check if the user confirmed the action
    if (userConfirmed) {
      this.allService.deleteBookIndvidual(id).subscribe((data:any) => {
          alert(data);
          this.getDataontable();
        },
        (err:any) => {
          alert('Something went wrong. Please try again later.');
        }
      );
    }
  }



//==============================New area===============
title:any
curr:any
doc:any
bok_location:any
clickhide:boolean = false
clickhideau:boolean = false
clickhideautwo:boolean = false
clickhideauthree:boolean = false
publish_hide:boolean = false
ven_hide:boolean = false
bill_hide:boolean = false
sub_hide:boolean = false

//==update of title model========/
  getTitleValue(ti_id:any,ti_name:any){
   this.updatemodel.book_title_id = ti_id
   this.updatemodel.book_title_name = ti_name
   this.clickhide =true
  }
  
  title_req_data:any
  serachTitle(title:any){
    if (title.length >= 3) {
      this.allService.serachTitle(title,this.college_id).subscribe((data:any)=>{
        this.title_req_data = data;
        console.log(data);
      });
    } else {
      this.title_req_data = null;
    }
    this.clickhide =false
  }


  //==update of author model========/
  getAuthorValue(au_id:any,au_name:any){
    this.updatemodel.first_author_id = au_id
    this.updatemodel.author_name = au_name
    this.clickhideau =true
   }
   
   author_req_data:any
   serachAuthor(auth:any){

     if (auth.length >= 3) {
       this.allService.getBookAuthoronly(this.college_id,auth).subscribe((data:any)=>{
         this. author_req_data = data;
         console.log(data);
       });
     } else {
       this. author_req_data = null;
     }
     this.clickhideau =false
   }


    //==update of second author  model========/
    getSeAuthorValue(au_id:any,au_name:any){
    this.updatemodel.second_author_id = au_id
    this.updatemodel.second_author_name = au_name
    this.clickhideautwo =true
   }
   
   second_author_req_data:any
   serachAuthorTwo(auth:any){

     if (auth.length >= 3) {
       this.allService.getBookAuthoronly(this.college_id,auth).subscribe((data:any)=>{
         this. second_author_req_data = data;
         console.log(data);
       });
     } else {
       this. second_author_req_data = null;
     }
     this.clickhideautwo =false
   }

   
    //==update of Third author  model========/
    getThAuthorValue(au_id:any,au_name:any){
      this.updatemodel.third_author_id = au_id
      this.updatemodel.third_author_name = au_name
      this.clickhideauthree =true
     }
     
     third_author_req_data:any
     serachAuthorThree(auth:any){
  
       if (auth.length >= 3) {
         this.allService.getBookAuthoronly(this.college_id,auth).subscribe((data:any)=>{
           this. third_author_req_data = data;
           console.log(data);
         });
       } else {
         this. third_author_req_data = null;
       }
       this.clickhideauthree =false
     }


      //==update of PUBLISHER  model========/
    getPuublish(pub_id:any,pub_name:any){
      this.updatemodel.publisher_id = pub_id
      this.updatemodel.publisher_name = pub_name
      this.publish_hide =true
     }
     
    publisher_req_data:any
     serachPublisher(pub:any){
       if (pub.length >= 3) {
         this.allService.serachPublisher(this.college_id,pub).subscribe((data:any)=>{
           this. publisher_req_data = data;
           console.log(data);
         });
       } else {
         this. publisher_req_data = null;
       }
       this.publish_hide =false
     }

 //==update of CURRENCY model========/
     getCurrency(){
      this.allService.getCurrency(this.college_id).subscribe((data:any)=>{
        this.curr = data
        console.log(data);
      })
    }


     //==update of VENDOR  model========/
     getVendor(ven_id:any,ven_name:any){
      this.updatemodel.vendor_id = ven_id
      this.updatemodel.vendor_name = ven_name
      this.ven_hide =true
     }
     
     vendor_req_data:any
     serachVendor(ven:any){
       if (ven.length >= 3) {
         this.allService.serachVendor(this.college_id,ven).subscribe((data:any)=>{
           this. vendor_req_data = data;
           console.log(data);
         });
       } else {
         this. vendor_req_data = null;
       }
       this.ven_hide =false
     }


    //==update of Document  model========/
     getDoc(){
      this.allService.getDoc(this.college_id).subscribe((data:any)=>{
        this.doc = data
        console.log(data);
      })
    }


        //==update of Bill  model========/
        getBill(bill_id:any,bill_no:any){
          this.updatemodel.bill_id = bill_id
          this.updatemodel.bill_num = bill_no
          this.bill_hide =true
         }
         
         bill_req_data:any
         serachBill(bill:any){
           if (bill.length >= 2) {
             this.allService.searchBill(this.college_id,bill).subscribe((data:any)=>{
               this. bill_req_data = data;
               console.log(data);
             });
           } else {
             this. bill_req_data = null;
           }
           this.bill_hide =false
         }


     //==update of Subject  model========/
        getSubject(subject_id:any,subject_name:any){
          this.updatemodel.subject_id = subject_id
          this.updatemodel.subject_name = subject_name
          this.sub_hide =true
         }
         
         sub_req_data:any
         serachSub(sub:any){
           if (sub.length >= 3) {
             this.allService.searchSubject(this.college_id,sub).subscribe((data:any)=>{
               this.sub_req_data = data;
               console.log(data);
             });
           } else {
             this.sub_req_data = null;
           }
           this.sub_hide =false
         }

            //==update of Location  model========/
            getLocation(){
              this.allService.getLocation(this.college_id).subscribe((data:any)=>{
                this.bok_location = data
                console.log(data);
              })
            }
         //==update of image  model========/  
            getFile(ev: any) {
              if (ev) {
                this.updatemodel.book_image = ev.target.files[0];
              }
          
            }


            //close==========================
            close(){
    this.getDataontable()

            }

}