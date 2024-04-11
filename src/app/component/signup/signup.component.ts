import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  private signupUrl = 'http://localhost:8080/registration';

  constructor(private http: HttpClient ,private router: Router) {}

  onSignup(form: NgForm): void {
    if (!form.valid) {
      return; // Prevent submission if form is invalid
    }

    // Post the form data to the backend
    this.http.post(this.signupUrl, form.value,{responseType:'text'}).subscribe(
      response => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
        // Handle successful signup, e.g., navigate to the login page
      },
      error => {
        console.error('Signup failed', error);
        // Handle errors, e.g., display error messages to the user
      }
    );
  }

}
