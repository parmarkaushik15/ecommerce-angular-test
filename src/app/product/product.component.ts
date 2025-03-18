import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { ProductDetailComponent } from './product-detail/product-detail.component';
@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
  ],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  products: any[] = [];
  cols: number = 4;
  constructor(public dialog: MatDialog, private productService: ProductService) {}

  ngOnInit() {
    this.productService.fetchProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setGridColumns(event.target.innerWidth);
  }

  setGridColumns(width: number) {
    if (width < 600) {
      this.cols = 1; // Mobile
    } else if (width < 900) {
      this.cols = 2; // Tablets
    } else {
      this.cols = 4; // Desktop
    }
  }

  getGridColumns() {
    return `repeat(${this.cols}, 1fr)`;
  }
 
  
  openProductDialog(product: any) {
    this.dialog.open(ProductDetailComponent, {
      width: '600px',
      data: product
    });
  }
}
