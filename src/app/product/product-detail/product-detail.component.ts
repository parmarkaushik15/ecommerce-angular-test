import { Component, Inject } from '@angular/core'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, MatDialogModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  quantity = 1;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService
  ) {}

  changeQuantity(amount: number) {
    if (this.quantity + amount > 0 && this.quantity + amount <= this.data.stock) {
      this.quantity += amount;
    }
  }

  addToCart() {
    this.cartService.addToCart({ ...this.data, quantity: this.quantity });
    this.dialogRef.close();
  }
}
