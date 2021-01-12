import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {

  currentDate:Date;
  yearStart:number;
  yearSelected:number = 0;
  monthSelected:number = 0;
  daySelected:number = 0;
  dayRange: Array<number>;
  yearRange: Array<number>;
  monthRange: Array<string>;
  dateParam: string = "";
  
  constructor() { 
    
    this.currentDate = new Date();
    this.yearStart = this.currentDate.getFullYear()-3;

    this.yearRange = [...Array(12).keys()].map(i => i + this.yearStart);
    this.dayRange = [...Array(31).keys()].map(i => i + 1);
    this.monthRange = ["January", "February", "March",
                       "April", "May", "June", "July",
                       "August", "September", "October",
                       "November", "December"
                      ]

    this.yearSelected = this.currentDate.getFullYear();
    this.monthSelected = this.currentDate.getMonth()+1;
    this.daySelected = this.currentDate.getDate();    

  }

  ngOnInit(): void { 
  }

  changeYear(year:number){
    var datesArr:Array<string> = this.dateParam.split("/");
    datesArr[2] = year.toString();
    this.yearSelected = parseInt(datesArr[2]);
  }

  changeMonth(month:number){
    var datesArr:Array<string> = this.dateParam.split("/");
    datesArr[1] = month.toString();
    this.monthSelected = parseInt(datesArr[1]);
  }

  changeDay(day:number){
    var datesArr:Array<string> = this.dateParam.split("/");
    datesArr[0] = day.toString();
    this.daySelected = parseInt(datesArr[0]);
  }

  changeCalendarWeek(){
    var date:String = this.daySelected+"/" + this.monthSelected + "/"+ this.yearSelected;
    console.log(date);
  }
}
