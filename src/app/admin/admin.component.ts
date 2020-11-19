import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SidebarService } from '../shareds/utils/sidebar.service';
import { SwPush } from '@angular/service-worker';
import { notifyMe } from '../../assets/js/notification';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  readonly VAPID_PUBLIC_KEY = "BJ-melS9_EfMopFVF_h9oC7ne-n4-HOvu-cfBPMmU88bxJ6PlG3oFHBGSp-0Y-3TVRLUE74GsuQ39C55N_DhTh0";

  pages = [];
  
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));
    

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private _sidebarService: SidebarService,
    private swPush: SwPush,
  ) { }

  ngOnInit() {
    notifyMe();

    this.construirSidenav();
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => console.log(sub))
    .catch(err => console.error("No es posible suscribirse a notificaciones", err));
  }

  cerrarSesion() {

    this.authService.logout();
    this.router.navigate(['/iniciar-sesion'])

  }

  construirSidenav() {

    this.pages = this._sidebarService.menu;

    // const role = JSON.parse(localStorage.getItem('currentUser')).role;
    
    // this.pages = JSON.parse(role.pages).pages;
  }

}
