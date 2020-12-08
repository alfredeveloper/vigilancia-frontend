import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ErrorComponent } from './dialog/error/error.component';
import { SuccessComponent } from './dialog/success/success.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { FileComponent } from './dialog/file/file.component';
import { FormsModule } from '@angular/forms';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CollaboratorEditComponent } from './collaborator/collaborator-edit/collaborator-edit.component';
import { CollaboratorAddComponent } from './collaborator/collaborator-add/collaborator-add.component';
import { FollowsComponent } from './follow/follows/follows.component';
import { FollowEditComponent } from './follow/follow-edit/follow-edit.component';
import { FollowAddComponent } from './follow/follow-add/follow-add.component';
import { ResultDetailComponent } from './survey/result-detail/result-detail.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        SidenavComponent,
        FooterComponent,
        ErrorComponent,
        SuccessComponent,
        ConfirmationComponent,
        FileComponent,
        UserAddComponent,
        UserEditComponent,
        CollaboratorEditComponent,
        CollaboratorAddComponent,
        FollowsComponent,
        FollowEditComponent,
        FollowAddComponent,
        ResultDetailComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ErrorComponent,
        SuccessComponent,
        ConfirmationComponent,
        FileComponent,
        UserAddComponent,
        UserEditComponent,
        CollaboratorEditComponent,
        CollaboratorAddComponent,
        FollowsComponent,
        ResultDetailComponent,
    ],
    entryComponents: [
        ErrorComponent,
        SuccessComponent,
        ConfirmationComponent,
        FileComponent,
        UserAddComponent,
        UserEditComponent,
        CollaboratorEditComponent,
        CollaboratorAddComponent,
        FollowsComponent,
        ResultDetailComponent,
    ]
})

export class SharedModule {
    
}