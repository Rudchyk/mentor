import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

import { AuthGuardService } from './auth-guard.service';

import { AppComponent } from './app.component';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent, DialogOverviewComponent } from './admin/admin.component';
import { BackToHomeComponent } from './back-to-home/back-to-home.component';
import { AreYouSureDialogComponent } from './are-you-sure-dialog/are-you-sure-dialog.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MentorsListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MentorsListComponent,
    LoginComponent,
    AdminComponent,
    BackToHomeComponent,
    DialogOverviewComponent,
    AreYouSureDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [
    DialogOverviewComponent,
    AreYouSureDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
