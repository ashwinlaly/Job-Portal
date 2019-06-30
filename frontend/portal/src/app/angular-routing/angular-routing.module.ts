import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobsComponent } from '../jobs/jobs.component';
import { CompaniesComponent } from '../companies/companies.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { AccountsComponent } from '../accounts/accounts.component';

const routes : Routes = [
  { path : '' , component : JobsComponent },
  { path : 'companies', component : CompaniesComponent },
  { path : 'accounts', component : AccountsComponent},
  { path : 'signin' , component : SigninComponent },
  { path : 'signup' , component : SignupComponent },
 
]
// { path : '**' , component : JobsComponent }

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash : true})
  ],
  exports : [
    RouterModule
  ],
  declarations: []
})
export class AngularRoutingModule { }