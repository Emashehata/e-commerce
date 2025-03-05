import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate:[loggedGuard],
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'forget-password',
        title: 'forget-password',
        loadComponent: () => import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent)
      }
    ]
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),

      },
      {
        path: 'cart',
        title: 'Cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'products',
        title: 'Products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'brands',
        title: 'Brands',
        loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent)
      },
      {
        path: 'categories',
        title: 'Categories',
        loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path: 'checkout/:id',
        title: 'Checkout',
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      {
        path: 'detail/:productID',
        title: 'detail',
        loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent)
      },
      {
        path: 'allorders',
        title: 'allorders',
        loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent)
      },
      {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent)
      },
    ]
  }
];
