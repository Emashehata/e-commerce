import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private renderer2:Renderer2;
  constructor(private translateService:TranslateService,
    @Inject(PLATFORM_ID) private platId:object,
    private renderer:RendererFactory2,
  ) {

      this.renderer2=this.renderer.createRenderer(null,null)

      if(isPlatformBrowser(platId)){
        this.translateService.setDefaultLang('en');
        const savedLang= localStorage.getItem('lang');
        if(savedLang){
          this.translateService.use(savedLang!)
        }
        this.changeDirection();
      }
   }

  changeDirection():void{
    if(localStorage.getItem('lang')=== 'en'){
        this.renderer2.setAttribute(document.documentElement,'dir','ltr');
        this.renderer2.setAttribute(document.documentElement,'lang','en');
    }
    else if(localStorage.getItem('lang')=== 'ar'){
        this.renderer2.setAttribute(document.documentElement,'dir','rtl');
        this.renderer2.setAttribute(document.documentElement,'lang','ar');
    }
  }



  changeLangTranslate(lang:string):void{
     //1-save to local storage

      localStorage.setItem('lang',lang);

        //2-use lang
      this.translateService.use(lang);

        //3-change direction
        this.changeDirection();
  }

}
