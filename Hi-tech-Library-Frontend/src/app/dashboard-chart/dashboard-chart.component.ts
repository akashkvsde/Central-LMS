import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js'
import { AllDataService } from '../Services/all-data.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css'],
 
})

export class DashboardChartComponent implements OnInit{
  isstudentorFaculty:any;
  constructor(private service:AllDataService){

    
  }
  college_id:any
  animationState: string = 'start';
  ngOnInit(): void {
    this.college_id=sessionStorage.getItem('college_id')
    this.isstudentorFaculty= this.service.isStudentOrFaculty()
    console.log(this.isstudentorFaculty);
    // console.log(this.college_id);
    this.RenderChart();
    
   
  }
  chartNOs: any = {
    total_books: 0,
    issued_books: 0,
    available_books: 0,
    students: 0,
    employee: 0
  };

 

  RenderChart() {
    this.service.getBookStatistics(this.college_id).subscribe((res: any) => {
      // console.log(res);
      this.chartNOs = res;
      this.animateValues();
    });
  }

  animateValues() {
    const propertiesToAnimate = Object.keys(this.chartNOs);
    const animationInterval = 20; // milliseconds
    const steps = 100; // number of steps in the animation
  
    propertiesToAnimate.forEach(property => {
      const targetValue = this.chartNOs[property];
      const initialValue = 0;
      const stepSize = (targetValue - initialValue) / steps;
  
      let currentStep = 0;
  
      interval(animationInterval)
        .pipe(take(steps))
        .subscribe(() => {
          currentStep++;
          this.chartNOs[property] = initialValue + currentStep * stepSize;
        });
    });
  }
  
  
  
  

 

  getPropertyLabel(property: string): string {
    // Provide labels for each property
    switch (property) {
      case 'total_books':
        return 'Total Books';
      case 'issued_books':
        return 'Total Issued Books';
      case 'available_books':
        return 'Available Books';
      case 'students':
        return 'Total Students';
      case 'employee':
        return 'Total Employees';
      default:
        return '';
    }
  }

  getIconClass(property: string): string {
    // Provide icon classes for each property
    switch (property) {
      case 'total_books':
        return 'fa-solid fa-book-medical';
      case 'issued_books':
        return 'fa-solid fa-arrow-up-right-dots';
      case 'available_books':
        return 'fa fa-book me-3';
      case 'students':
        return 'fa-solid fa-user-graduate';
      case 'employee':
        return 'fa-solid fa-users-between-lines';
      default:
        return '';
    }
  }
}