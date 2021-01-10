import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {

  date:Date;
  yearStart:number;
  yearSelected:Number;
  monthSelected:Number;
  daySelected:Number;
  dayRange: Array<Number>;
  yearRange: Array<Number>;
  
  constructor(private router: Router) { 
    this.date = new Date();
    this.yearStart = this.date.getFullYear()-3;
    this.yearRange = [...Array(12).keys()].map(i => i + this.yearStart);
    this.yearSelected = this.date.getFullYear();
    this.monthSelected = this.date.getMonth()+1;
    this.daySelected = this.date.getDate();
    this.dayRange = [...Array(31).keys()].map(i => i + 1);
  }

  ngOnInit(): void {
    this.router.navigate([], {queryParams:{date:this.date.toLocaleDateString("en-US")}});
  }

}
