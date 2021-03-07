import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { FormBuilder, Validators  } from '@angular/forms';
import {DatePipe} from '@angular/common';
import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [  
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ])
    ])
  ],
  providers: [ DatePipe ]
})
export class AdminScheduleComponent implements OnInit {

  timeRange : Array<String>;
  picker: String ="";
  selectedOfficer:number = 0; 
  officerSelectShow:Boolean = false;
  officerList:Array<Officer> = [];
  submitFormSuccess:Boolean = false;
  submitFormUnsuccess:Boolean = false;

  bookingTimeForm = this.fb.group({
    officer: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required]
  });

  constructor(private http: HttpClient, private cookieService:CookieService, private fb: FormBuilder,private datePipe: DatePipe) {

    this.timeRange = ["9.00", "10.00", "11.00", "12.00", "13.00",
                      "14.00", "15.00", "16.00", "17.00"]
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

  get bookingFormControl() {
    return this.bookingTimeForm.controls;
  }

  submitForm(){

    var bookingFormJson = { officer : this.bookingTimeForm.get("officer")?.value, 
                            date : this.datePipe.transform(this.bookingTimeForm.get("date")?.value, 'dd/MM/yyyy'),
                            time : this.bookingTimeForm.get("time")?.value,
                            sessionID : this.cookieService.get("sessionID")
                          };

    //hide submit form success first so that the animation works when showing the alert
    this.submitFormSuccess = false;  
    this.submitFormUnsuccess = false;                    

    this.http.post("http://localhost:8080/booking/submitAvailableTime",  bookingFormJson).subscribe(
      val=> {if (<Boolean> val==true){
                this.submitFormSuccess = true;
                this.bookingTimeForm.get("officer")?.setValue('');
                this.bookingTimeForm.get("date")?.setValue('');
                this.bookingTimeForm.get("time")?.setValue('');
              }else
                this.submitFormUnsuccess = true;
            },
      error => console.log(error)
    );

  }



}

class Officer{
  id:number = 0
  firstName:string = ""
  lastName:string = ""
}
