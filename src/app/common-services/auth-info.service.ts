import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInfoService {
  
  constructor() { }
  authToken:any;
  
  //set auth token...
  set setAuthToken(val:any){
    this.authToken=val;
  }

  //get auth token...
  get getAuthToken(){
    return this.authToken;
  }



  

}
