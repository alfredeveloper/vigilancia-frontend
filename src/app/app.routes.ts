import { Routes, RouterModule } from '@angular/router';
import { AutodiagnosisComponent } from './autodiagnosis/autodiagnosis.component';

// Impor user
import { LoginComponent } from './login/login.component';
import { ResultsComponent } from './results/results.component';
import { SwornDeclarationComponent } from './sworn-declaration/sworn-declaration.component';

const AppRoutes: Routes = [

  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'declaracion-jurada', component: SwornDeclarationComponent },
  { path: 'autodiagnostico', component: AutodiagnosisComponent },
  { path: 'resultados', component: ResultsComponent },
  { path: '**', component: LoginComponent },
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' }

];

export const APP_ROUTES = RouterModule.forRoot( AppRoutes, { useHash: true } );

// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
