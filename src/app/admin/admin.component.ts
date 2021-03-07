import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    this.cookieService.delete('sessionID', '/');
    window.location.href='/';
  }

}
