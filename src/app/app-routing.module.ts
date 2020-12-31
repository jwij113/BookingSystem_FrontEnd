import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, children: [
    {
      path: 'calendar', 
      component: AdminCalendarComponent, 
    },
    {
      path: 'setting',
      component: AdminSettingComponent, 
    },
  ], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
