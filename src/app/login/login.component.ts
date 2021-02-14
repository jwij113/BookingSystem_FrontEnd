import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { tick } from '@angular/core/testing';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import {style, state, animate, transition, trigger} from '@angular/animations';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [  
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {
  
  password:String;
  email:String;
  loginFailedAlert:Boolean = false;

  constructor(private router: Router, private http: HttpClient, private cookieService:CookieService) {
    this.password = "";
    this.email = "";

  }

  @HostListener('window:keyup.enter', ['$event'])
  onKeyup(event: any) {
    this.login();
  }

  ngOnInit(): void {
  }
 

  actOnLoginResponse(loginResponse:LoginResponse){
    if (loginResponse.success == 'false'){
        this.loginFailedAlert = true;
    }else  if (loginResponse.success == 'true'){
        loginResponse['redirectTo'] == "admin" ? this.router.navigate(['/admin']): this.router.navigate(['/public']);
        this.cookieService.set("sessionID", loginResponse.sessionID);
    }
  }

  login(){
    var loginToken = {password:this.password, email:this.email}

    //hide login alert first so that the animation works when showing the alert if the login failed
    this.loginFailedAlert = false;

    this.http.post<LoginResponse>("http://localhost:8080/user/login", loginToken ).subscribe(
      val=> this.actOnLoginResponse(val),
      error => console.log(error)
    ); 
  }
}

class LoginResponse{
  success:String ="";
  sessionID: string ="";
  redirectTo: String ="";
}
