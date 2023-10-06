import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'register', component: SignupComponent
  }, {
    path: 'login', component: SigninComponent
  }]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignupComponent, SigninComponent],
})

export class AuthModule { }