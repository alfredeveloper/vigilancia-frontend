import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './shareds/sidenav/sidenav.component';
import { HeaderComponent } from './shareds/header/header.component';
import { FooterComponent } from './shareds/footer/footer.component';
import { AdminModule } from './admin/admin.module';
import { ErrorComponent } from './error/error.component';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SwornDeclarationComponent } from './sworn-declaration/sworn-declaration.component';
import { AutodiagnosisComponent } from './autodiagnosis/autodiagnosis.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    SwornDeclarationComponent,
    AutodiagnosisComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTES,
    MaterialModule,
    AdminModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
