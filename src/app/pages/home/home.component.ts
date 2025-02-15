import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoryService } from '../../core/services/category/category.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly productsService=inject(ProductsService);
  private readonly categoryService=inject(CategoryService);
  products:Iproduct[]=[];
  categories:Icategory[]=[];

  getProductsData(){
    this.productsService.getAllProducts().subscribe(
      {
        next:(res)=>{
            // console.log(res.data);
            this.products=res.data;
        },
        error:(error)=>{
          console.log(error);

        },
      }
    )
  }

  getCategoriesData(){
    this.categoryService.getAllCategories().subscribe(
      {
        next:(res)=>{
          this.categories=res.data;
          console.log(res);
        },
        error:(error)=>{
            console.log(error);

        }
      }
    )
  }

  ngOnInit(): void {
      this.getProductsData();
      this.getCategoriesData();
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
    nav:true

}
}
