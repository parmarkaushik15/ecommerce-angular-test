import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, MatIconModule, MatTableModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItems: any[] = [];
  totalAmount: number = 0;
  displayedColumns: string[] = ['title', 'price', 'quantity', 'total', 'actions'];

  constructor(private cartService: CartService, private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  updateQuantity(item: any, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      this.cartService.updateCart(item).subscribe(() => this.calculateTotal());
    }
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    this.cartService.checkout(this.cartItems).subscribe(() => {
      this.snackBar.open('Order placed successfully!', 'OK', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.cartService.clearCart();
      this.loadCart();
      setTimeout(() => {
        this.router.navigate(['/checkout']);
      }, 2000);
    });
  }
}
