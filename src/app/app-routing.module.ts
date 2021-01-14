import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AdminScheduleComponent} from './admin-schedule/admin-schedule.component';;

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, children: [
    {
      path: '', 
      component: AdminCalendarComponent, 
    },
    {
      path: 'calendar', 
      component: AdminCalendarComponent, 
    },
    {
      path: 'schedule', 
      component: AdminScheduleComponent, 
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
