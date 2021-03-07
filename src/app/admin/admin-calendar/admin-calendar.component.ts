import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';


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
  timeRange : Array<String>;
  weekdayRange : Array<String>;
  dateParam: string = "";
  selectedOfficer:number = 0; 
  officerSelectShow:Boolean = false;
  officerList:Array<Officer> = [];

  constructor(private http: HttpClient, private cookieService:CookieService) { 
    
    this.currentDate = new Date();
    this.yearStart = this.currentDate.getFullYear()-3;

    this.yearRange = [...Array(12).keys()].map(i => i + this.yearStart);
    this.dayRange = [...Array(31).keys()].map(i => i + 1);
    this.monthRange = ["January", "February", "March",
                       "April", "May", "June", "July",
                       "August", "September", "October",
                       "November", "December"
                      ]
    this.timeRange = ["9.00", "10.00", "11.00", "12.00", "13.00",
                      "14.00", "15.00", "16.00", "17.00"]

    this.weekdayRange = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]                  
    this.yearSelected = this.currentDate.getFullYear();
    this.monthSelected = this.currentDate.getMonth()+1;
    this.daySelected = this.currentDate.getDate();  
     

  }

  ngOnInit(): void { 
    this.initOfficerDropDownAndSetOfficer();
  }


  async initOfficerDropDownAndSetOfficer(){

    await this.http.post("http://localhost:8080/user/isadmin", this.cookieService.get("sessionID") ).toPromise().then(
      val=> {if (<Boolean> val==true)
                  {
                    this.officerSelectShow = true;
                  }
            },
      error => console.log(error)
    ); 
  
    if (this.officerSelectShow){
      await this.http.post<Officer[]>("http://localhost:8080/role/officers", "" ).toPromise().then(
        val=> {this.officerList = val, this.selectedOfficer = this.officerList[0].id;},
        error => console.log(error)
      ); 

    } else{
      await this.http.get<Officer>("http://localhost:8080/user/sessionID/" + this.cookieService.get("sessionID") ).toPromise().then(
            val=> {this.selectedOfficer = val.id;},
            error => console.log(error)
          ); 
    }
    
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

class Officer{
  id:number = 0
  firstName:string = ""
  lastName:string = ""
}