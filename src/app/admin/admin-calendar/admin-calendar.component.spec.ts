import { ComponentFixture, flush, TestBed, fakeAsync } from '@angular/core/testing';

import { AdminCalendarComponent } from './admin-calendar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdminCalendarComponent', () => {
  let component: AdminCalendarComponent;
  let fixture: ComponentFixture<AdminCalendarComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ AdminCalendarComponent ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select officer one', fakeAsync(()=> {

      const isAdminResponse = true;
  
      const req = httpMock.expectOne(`http://localhost:8080/user/isadmin`);
      expect(req.request.method).toBe("POST");
      req.flush(isAdminResponse);
     
      flush();

      const officers = [{id:1, firstName:"joko", lastName:"wijaya"},{id:2, firstName:"fred", lastName:"blog"} ];

      const req2 = httpMock.expectOne(`http://localhost:8080/role/officers`);
      expect(req2.request.method).toBe("POST");
      req2.flush(officers);

      httpMock.expectNone('"http://localhost:8080/user/sessionID/');

      flush();

      expect(component.selectedOfficer).toBe(1);
  
  }));
});
