import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private http: HttpRequestService,
    private toastr: ToastrService,
    private router: Router,
    private authInfo: AuthInfoService
  ) { }

  loginForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8), // Minimum length of 8 characters
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Custom pattern for special characters, lowercase, and uppercase
    ]]
  })
  ngOnInit(): void {
  }

  onClick() {

    if (this.loginForm.valid) {
      this.http.request('get', '/signup', null).subscribe((res: any) => {
        console.log('token', res)


        const user = res.find((a: any) => {
          if (a.email === this.loginForm.value.email && a.password === this.loginForm.value.password){
            a.token = a.username
            return a
          }
        
      });
        if (user) {

          this.authInfo.setAuthToken = user['token'];
          localStorage.setItem('token', JSON.stringify(this.authInfo.getAuthToken))

          this.toastr.success('Login Successfull')
          this.loginForm.reset();
          this.router.navigateByUrl('home')
        }
        else {
          this.toastr.error('User Not Found')
        }
      })
    }
    else {
      this.toastr.error('Login form is not valid')
    }
  }

}
