import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, MatIconModule, MatTableModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  order: any;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getLatestOrder().subscribe(order => {
      this.order = order;
    });
  }

  getTotal() {
    return this.order?.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }
}
