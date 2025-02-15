import { ProductsComponent } from './../products/products.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent  implements OnInit{

  detailProduct:Iproduct |null=null;
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
          next:(p)=>
            {
                let productID=p.get('productID');
                this.productsService.getSpecificProduct(productID).subscribe({
                  next:(res)=>{
                    console.log(res.data);
                    this.detailProduct=res.data;

                  },
                  error:(err)=>{
                    console.log(err);

                  }
                })
            }
        })
    }
}
