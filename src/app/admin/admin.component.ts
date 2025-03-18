import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
 
import { InvoiceComponent } from './invoice/invoice.component';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, MatDialogModule, RouterModule, MatIconModule, MatTableModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  orders: any[] = [];
  displayedColumns: string[] = ['id', 'date', 'items', 'actions'];

  constructor(private orderService: CartService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  openInvoiceDialog(order: any) {
    this.dialog.open(InvoiceComponent, {
      width: '600px',
      data: order
    });
  }
}
