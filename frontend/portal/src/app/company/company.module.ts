import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { AccountsComponent } from './accounts/accounts.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { UsersAppliedComponent } from './users-applied/users-applied.component';

const routes : Routes = [
  { path : 'companies/jobs_list', component : JobsListComponent },
  { path : 'companies/create_jobs' , component : CreateJobsComponent },
  { path : 'companies/accounts', component : AccountsComponent },
  { path : 'companies/users_applied', component : UsersAppliedComponent }
];

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports : [
    
  ],
  declarations: [AccountsComponent, JobsListComponent, CreateJobsComponent, UsersAppliedComponent]
})

export class CompanyModule { }
