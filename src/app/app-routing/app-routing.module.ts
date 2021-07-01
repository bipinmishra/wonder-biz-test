import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../component/home/home.component';
import { LoginComponent } from '../component/login/login.component';

const appRoutes: Routes = [

  //Site routes goes here
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  
  /* Pages */
  {path: 'login', component: LoginComponent},
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '**', redirectTo: '' }

]

export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

