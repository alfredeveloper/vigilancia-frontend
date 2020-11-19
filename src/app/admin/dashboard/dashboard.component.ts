import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/services/dashboard.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patients: number = 0;
  users: number = 0;
  total: number = 0;
  follows: number = 0;

  constructor(
    private _dashboardService: DashboardService,
    private _snackBar: MatSnackBar
  ) {} 

  ngOnInit() {
    this.obtenerDashboard();
  }

  obtenerDashboard() {
    this._dashboardService.getDashboard().subscribe(
      response => {
        console.log('RESPONSE DASHBOARD', response)
        this.patients = response.patients;
        this.users = response.users;
        this.total = response.patients + response.users;
        this.follows = response.follows;
      },
      error => {
        this.openError('Error al obtener dashboard', 'Ok');
      }
    )
  }

  openError(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}