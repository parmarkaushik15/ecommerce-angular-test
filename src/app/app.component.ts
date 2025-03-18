import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';
import { NetworkService } from './services/network.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  cartItemCount: number = 0;
  title = 'ecommerce-pwa';
  isOnline: boolean = navigator.onLine;
  networkStatusSubscription: Subscription = Subscription.EMPTY;


  constructor(private networkStatusService: NetworkService, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    this.networkStatusSubscription = this.networkStatusService.onlineStatus$.subscribe(
      (status: boolean) => {
        this.isOnline = status;
      }
    );
  }

  ngOnDestroy() {
    this.networkStatusSubscription.unsubscribe();
  }
}
