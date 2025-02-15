import { NavbarComponent } from './../navbar/navbar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
