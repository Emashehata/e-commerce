import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
    isLogin= input<boolean>(true);
    private readonly  authService=inject(AuthService);
    private readonly myTranslateService=inject(MyTranslateService);
    readonly translateService=inject(TranslateService);
    private readonly cartService=inject(CartService)
    countCart! :number;

    ngOnInit(): void {
      this.cartService.cartNumbers.subscribe({
        next:(value)=>{
          this.countCart=value;
        }
      })
      this.cartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          this.cartService.cartNumbers.next(res.numOfCartItems)
        }
      })
    }

    logedOut():void{
      this.authService.logOut();
    }


    changeLang(lang:string):void{
        this.myTranslateService.changeLangTranslate(lang)
    }
    checkCurrentLang(lang:string):boolean{
      return this.translateService.currentLang=== lang;
    }
}
