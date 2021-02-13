import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss']
})
export class AdminScheduleComponent implements OnInit {

  timeRange : Array<String>;
  picker: String ="";
  constructor() {

    this.timeRange = ["9.00", "10.00", "11.00", "12.00", "13.00",
                      "14.00", "15.00", "16.00", "17.00"]
   }

  ngOnInit(): void {
  }

}
