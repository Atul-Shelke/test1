import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private fb:FormBuilder,
              private http:HttpRequestService,
              private router:Router
               ) 
              { }

  data:any
  //sign-up form
  registerForm:any=this.fb.group({
    email   :['',[Validators.required,Validators.email]],
    password:['',[
      Validators.required,
      Validators.minLength(8), // Minimum length of 8 characters
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Custom pattern for special characters, lowercase, and uppercase
    ]],
    username:['',Validators.required]
  })
  ngOnInit(): void {
  }

  onSubmit(){
    this.http.request('post','/signup',this.registerForm.value).subscribe((res:any)=>{
     this.data=res;
     this.registerForm.reset();
     this.router.navigateByUrl('auth');
    })
  }
}
