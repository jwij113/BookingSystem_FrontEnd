import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCalendarComponent } from './admin/admin-calendar/admin-calendar.component';
import { AdminSettingComponent } from './admin/admin-setting/admin-setting.component';
import { AdminScheduleComponent} from './admin/admin-schedule/admin-schedule.component';

import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent} from './public/public.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'public', component: PublicComponent},
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
