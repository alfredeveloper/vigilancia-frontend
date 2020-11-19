import { Component, OnInit } from '@angular/core';
import { swiper } from '../../assets/utils/swiper';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';
import { MatStartDate } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  login = true;
  select = false;

  user: User;
  errorMessage: String = '';
  messageButton: String = 'INGRESAR';
  loading: Boolean = false;
  nextLogin: Boolean = true;

  sucursales = [];
  companias = [];
  sedes = [];

  subsidiaryId: number = 0;
  seatId: number = 0;
  companyId: number = 0;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) { 
    
    this.user = new User('', '', '', '', '', false, '');

  }

  ngOnInit() {
    this.isAuth();
    swiper();
  }

  isAuth() {

    const auth = localStorage.getItem('auth');

    if (auth === 'true') {

      this.router.navigate(['/dashboard']);

    }

  }

  ingresar(f: NgForm) {

    this.messageButton = 'VERIFICANDO';

    this.authService.login(this.user).subscribe(
      response => {
        
        console.log('response', response)
        this.messageButton = 'INGRESAR';
        this.nextLogin = false;
        this.router.navigate(['/dashboard']);

      },
      error => {

        this.openError('Error de Credenciales', 'Ok');
        this.messageButton = 'INGRESAR';

      }
    )
    
  }

  openError(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
