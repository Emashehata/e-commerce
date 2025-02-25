import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { IcartDetails } from '../../shared/interfaces/icartDetails/icart-details';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly cartService=inject(CartService);
  cartDetails:IcartDetails={} as IcartDetails ;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails=res.data;
        console.log(this.cartDetails.totalCartPrice);


      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  removeItem(id:string):void{
      this.cartService.removeSpecificCartItem(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartDetails=res.data;

        },
        error:(err)=>{
          console.log(err);

        }
      })
  }


  updateCount(id:string,count:number):void{
    this.cartService.updateProductQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails=res.data

      }
      ,error:(err)=>{
        console.log(err);

      }
    })
  }


  clearItems():void{
    this.cartService.removeAllCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message==='success'){
          this.cartDetails ={} as IcartDetails;
        }

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
