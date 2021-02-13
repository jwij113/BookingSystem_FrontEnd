import { ComponentFixture, TestBed, getTestBed, tick, fakeAsync, flush   } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import {Location} from "@angular/common";

import {Router, RouterModule} from '@angular/router';
import {routes} from '../app-routing.module';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let location: Location;
  let router:Router;
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    injector = getTestBed();
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to admin', fakeAsync(() => {

    component.login();

    const loginResponse = {success:"true", sessionID:"tetetete", redirectTo:"admin"};

    const req = httpMock.expectOne(`http://localhost:8080/user/login`);
    expect(req.request.method).toBe("POST");
    req.flush(loginResponse);
   
    flush();
    
    expect(location.path()).toBe('/admin');

  }));

  it('should redirect to public', fakeAsync(() => {

    component.login();

    const loginResponse = {success:"true", sessionID:"tetetete", redirectTo:"public"};

    const req = httpMock.expectOne(`http://localhost:8080/user/login`);
    expect(req.request.method).toBe("POST");
    req.flush(loginResponse);
   
    flush();
    
    expect(location.path()).toBe('/public');

  }));

  afterEach(() => {
    httpMock.verify();
  });

});
