import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice',
  imports: [CommonModule, RouterModule, MatDialogModule, MatIconModule, MatTableModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getTotal() {
    return this.data.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }
}
