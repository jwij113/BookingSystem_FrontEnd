import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  password:String;
  email:String;
  loginFailedAlert:Boolean = false;

  constructor(private router: Router, private http: HttpClient) {
    this.password = "";
    this.email = "";

  }

  ngOnInit(): void {
  }

  actOnLoginResponse(loginResponse:LoginResponse){
    if (loginResponse.success == 'false'){
        this.loginFailedAlert = true;
    }else{
        loginResponse.redirectTo == "admin" ? this.router.navigate(['/admin']): this.router.navigate(['/public']);
    }
  }

  login(){
    var loginToken = {password:this.password, email:this.email}

    this.http.post<LoginResponse>("http://localhost:8080/user/login", loginToken ).subscribe(
      val=> this.actOnLoginResponse(val),
      error => console.log(error)
    ); 
  }

  

}

class LoginResponse{
  success:String ="";
  sessionID: String ="";
  redirectTo: String ="";
}
