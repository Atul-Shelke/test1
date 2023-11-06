import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http:HttpClient) { }

  baseURL=environment.DEV.BASE_URL;

  //function for crud
  request(requestType:string,requestUrl:string,requestBody:any) :any{
   
    //for get request...
    if(requestType==='get'){
      return this.http.get<any>(this.baseURL+requestUrl)
    }

    //for post request(adding)...
    if(requestType==='post'){
      return this.http.post<any>(this.baseURL+requestUrl,requestBody)
    }

    //for put request(updating with all required value)
    if(requestType==='put'){
      return this.http.put<any>(this.baseURL+requestUrl,requestBody)
    }

    //for patch request(updating with partial values)
    if(requestType==='patch'){
      return this.http.patch<any>(this.baseURL+requestUrl,requestBody)
    }

    //for delete request...
    if(requestType==='delete'){
      return this.http.delete<any>(this.baseURL+requestUrl)
    }
  }
}
