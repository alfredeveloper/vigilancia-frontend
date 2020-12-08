import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../guards/login.guard';

import { UserComponent } from './user/user.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { DeclarationsComponent } from './declarations/declarations.component';
import { DiagnosesComponent } from './diagnoses/diagnoses.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [LoginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },

      { path: 'usuarios', component: UserComponent, data: {titulo: 'Usuarios'} },

      { path: 'colaboradores', component: CollaboratorsComponent, data: {titulo: 'Colaboradores'} },
      
      { path: 'declaraciones-juradas', component: DeclarationsComponent, data: {titulo: 'Declaraciones Juradas'} },
      
      { path: 'diagnosticos', component: DiagnosesComponent, data: {titulo: 'Autodiagnosticos'} },
      
      { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' },
    ]
  }
  
];

export const ADMIN_ROUTES = RouterModule.forChild( pagesRoutes )