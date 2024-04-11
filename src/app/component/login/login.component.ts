import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private loginUrl = 'http://localhost:8080/login';  
email: any;
password: any;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(form: NgForm): void {
    if (!form.valid) {
      return; // Prevent submission if form is invalid
    }

    this.http.post<any>(this.loginUrl, form.value).subscribe(
      response => {
        if(response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        } else {
          console.error('Token not found in response');
        }
      },
      error => {
        console.error('Login failed', error);
        alert("wrong credentials");
      }
    );
  }    
}
