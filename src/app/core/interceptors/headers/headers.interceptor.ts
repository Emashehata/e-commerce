import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('user token'))
    {
      if(req.url.includes('cart')||req.url.includes('orders')||req.url.includes('wishlist')){
        req = req.clone({
          setHeaders:{
            token:localStorage.getItem('user token')!
          }
        }) 
      }
    }
  return next(req);
};
