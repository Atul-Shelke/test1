import { Component, OnInit } from '@angular/core';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpRequestService,
              private authinfo:AuthInfoService
            ) { }
  data:any;
  price:number=100;
  bookings:any=[];
  totalprice:number=0
  seatno:number=0;
  
  ngOnInit(): void {
    this.getAllSeats();
   
    
  }

   username:any=localStorage.getItem('token')
   userName=JSON.parse(this.username)

  getAllSeats(){
    this.http.request('get','/booking',null).subscribe((res:any)=>{
      this.data=res;
      console.log('res',res)
    })
  }

  handleChange(event:any,value:any){
    console.log('event',event.target.checked);
    console.log('event',event);
     const id=value
    this.http.request('put',`/booking/${id}`,{isbook:event.target.checked}).subscribe((res:any)=>{
      console.log(res);
        if(event.target.checked ==true){
          this.bookings.push(res);
          console.log('datastote',this.bookings)
        }
        else {
          this.bookings.splice(this.bookings.indexOf(res))
          
        }
        this.seatno=this.bookings.length;
        this.totalprice=this.bookings.length*this.price;
        console.log('price',this.totalprice)
    })
  }
}
