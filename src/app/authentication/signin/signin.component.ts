import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([''])
    }
  }

  readonly loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value as {
        email: string, password: string
      }
      this.authService.login(email, password).subscribe(response => {
        console.log(response)
        localStorage.setItem("token", response.token)
        if (response.token) {
          this.router.navigate(['/'])
        }
      })
      this.loginForm.reset()
    }
  }

}
