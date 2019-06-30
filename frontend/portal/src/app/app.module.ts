import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { AngularRoutingModule } from './angular-routing/angular-routing.module';

import { JobsComponent } from './jobs/jobs.component';
import { CompaniesComponent } from './companies/companies.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AccountsComponent } from './accounts/accounts.component';

import { CompanyModule } from './company/company.module';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    CompaniesComponent,
    SigninComponent,
    SignupComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularMaterialModule,
    AngularRoutingModule,
    CompanyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }