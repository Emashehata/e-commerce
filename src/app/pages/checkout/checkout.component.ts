import { OrdersService } from './../../core/services/orders/orders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  isLoading:boolean=false;
  messageError:string='';
  succesMsg:string='';
  cartId:string='';
  private readonly formBuilder=inject(FormBuilder);
  private readonly router=inject(Router);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly ordersService=inject(OrdersService);

  checkForm!:FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.getCardId();
  }
  initForm():void{
    this.checkForm = this.formBuilder.group({
      details:[null,[Validators.required]],
      phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null,[Validators.required]]
    })
  }

  getCardId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
          this.cartId =  param.get('id')!;
      }
    })
  }


  sumbitForm():void{
            if(this.checkForm.valid){
              this.isLoading=true;
              this.ordersService.checkOutPayment(this.cartId,this.checkForm.value).subscribe({
                next: (res) => {
                  console.log(res);
                  if(res.status === 'success' ){
                    setTimeout(() => {
                       open(res.session.url,'_self')
                    }, 500);
                    this.succesMsg=res.message;
                  }
                  this.isLoading=false;
                },
                error: (err:HttpErrorResponse) => {
                  console.log(err);
                  this.messageError= err.error.message;
                  this.isLoading=false;
                  //show message to user
                }
              })
            }
            else{
              this.checkForm.markAllAsTouched();
            }
          }

}
