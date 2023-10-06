import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  readonly registerForm = new FormGroup({
    fullName: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([''])
    }
  }

  register() {
    if (this.registerForm.valid) {
      const { fullName, email, password } = this.registerForm.value as {
        fullName: string;
        email: string;
        password: string;
      };
      this.authService.register(fullName, email, password).subscribe(resData => {
        console.log(resData)
        localStorage.setItem("token", resData.token)
        if (resData.token) {
          this.router.navigate(['/'])
        }
      })
      this.registerForm.reset()
    } else {
      console.log("Form is not Valid")
    }

  }

}
