import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    menu: any = [
        {
            titulo: 'Dashboard',
            icono: 'dashboard',
            url: '/dashboard',
            submenus: [],
            enabled: true,
        },
        {
            titulo: 'Administradores',
            icono: 'emoji_people',
            url: '/usuarios',
            submenus: [],
            enabled: true,
        },
        {
            titulo: 'Colaboradores',
            icono: 'people_alt',
            url: '/colaboradores',
            submenus: [],
            enabled: true,
        },
        {
            titulo: 'Declaraciones Juradas',
            icono: 'article',
            url: '/declaraciones-juradas',
            submenus: [],
            enabled: true,
        },
        {
            titulo: 'Autodiagnosticos',
            icono: 'assignment_turned_in',
            url: '/diagnosticos',
            submenus: [],
            enabled: true,
        },
        
    ]

    constructor() { }

}
