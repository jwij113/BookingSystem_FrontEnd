import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor( private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    this.cookieService.delete('sessionID', '/');
    window.location.href='/';
  }

}
