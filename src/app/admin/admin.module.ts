import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


import { ADMIN_ROUTES } from './admin.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shareds/shared.module';
import { AdminComponent } from './admin.component';
import { LoginGuard } from '../guards/login.guard';

import { UserComponent } from './user/user.component';

import { ChartsModule } from 'ng2-charts';
import { CollaboratorsComponent } from './collaborators/collaborators.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AdminComponent,
        UserComponent,
        CollaboratorsComponent,
    ],
    exports: [
        DashboardComponent,
        AdminComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ADMIN_ROUTES,
        MaterialModule,
        ReactiveFormsModule,
        ChartsModule
    ],
    entryComponents: [
    ],
    providers: [ LoginGuard ]
})

export class AdminModule {
    
}