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

import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { DeclarationsComponent } from './declarations/declarations.component';
import { DiagnosesComponent } from './diagnoses/diagnoses.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AdminComponent,
        UserComponent,
        CollaboratorsComponent,
        DeclarationsComponent,
        DiagnosesComponent,
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
    ],
    entryComponents: [
    ],
    providers: [ LoginGuard ]
})

export class AdminModule {
    
}