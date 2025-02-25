import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private httpClient:HttpClient) { }
  myToken:any =localStorage.getItem('user token');
  checkOutPayment(id:string|null,data:object):Observable<any>
  {
   return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
      }
    )
  }
}
