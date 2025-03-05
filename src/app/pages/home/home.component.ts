import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoryService } from '../../core/services/category/category.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly productsService=inject(ProductsService);
  private readonly categoryService=inject(CategoryService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  products:Iproduct[]=[];
  categories:Icategory[]=[];




  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
}

  getProductsData(){
    this.productsService.getAllProducts().subscribe(
      {
        next:(res)=>{
            console.log(res.data);
            this.products=res.data;
        }
      }
    )
  }

  getCategoriesData(){
    this.categoryService.getAllCategories().subscribe(
      {
        next:(res)=>{
          this.categories=res.data;
          console.log(res);
        }
      }
    )
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplaySpeed:3000,
    navSpeed: 700,
    rtl:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav:true,
    rtl:true,


}

addToCart(id:string):void
{
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          // console.log(res);
          if(res.status==='success'){
            this.toastrService.success(res.message,'Fresh Cart');
            // this.cartService.cartNumbers=res.numOfCartItems;
            this.cartService.cartNumbers.next(res.numOfCartItems);
            console.log(this.cartService.cartNumbers);

          }

        }
      })
}


}
