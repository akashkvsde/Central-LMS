import { Component, OnInit } from '@angular/core';

import {Chart,registerables} from 'node_modules/chart.js'
import { AllDataService } from '../Services/all-data.service';
Chart.register(...registerables)

@Component({
  selector: 'app-allcharts',
  templateUrl: './allcharts.component.html',
  styleUrls: ['./allcharts.component.css']
})
export class AllchartsComponent implements OnInit{
  constructor(private service:AllDataService){}
  college_id:any
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.RenderChart();
    this.BookTransaction()
  }

  RenderChart(){
    new Chart('piechart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

BookTransaction(){
  this.service.viewBookTransaction(this.college_id).subscribe((res:any)=>{
    console.log(res);
    
  })
}


}
