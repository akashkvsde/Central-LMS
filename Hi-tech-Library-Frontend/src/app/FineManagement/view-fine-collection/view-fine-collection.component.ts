import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-view-fine-collection',
  templateUrl: './view-fine-collection.component.html',
  styleUrls: ['./view-fine-collection.component.css']
})
export class ViewFineCollectionComponent implements OnInit {
  Fine:any;
  college_id:any;
  p: number = 1;
  constructor(private service:AllDataService) {}
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
  this.getFineCollection();
  // interval(5000).subscribe(() => {
  //   this.getFineCollection();
  // });
  }
  getFineCollection() {
    this.service.FetchViewFineCollection(this.college_id).subscribe((res: any) => {
      this.Fine = res;
      // console.log(res);
    })
  }
}
