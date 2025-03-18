import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable(); 

  private latestOrder = new BehaviorSubject<any>(null);
  latestOrder$ = this.latestOrder.asObservable();
 
  constructor(private dbService: NgxIndexedDBService) {
    this.updateCartCount(); 
  }

  addToCart(product:any) {
    this.dbService.getByKey('cart', product.id).subscribe((cartItem:any) => {
      if (cartItem) {
        cartItem.quantity += product.quantity;
        this.dbService.update('cart', cartItem).subscribe(() => this.updateCartCount());
      } else {
        this.dbService.add('cart', product).subscribe(() => this.updateCartCount());
      }
    });
  }

  getCart() {
    return this.dbService.getAll('cart');
  }

  updateCartCount() {
    this.dbService.count('cart').subscribe(count => this.cartCount.next(count));
  }

  updateCart(item: any): Observable<any> {
    return this.dbService.update('cart', item);
  }

  removeFromCart(id: number): Observable<any> {
    return this.dbService.delete('cart', id);
  }

  private generateOrderNumber(): string {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `ORD-${timestamp}-${randomNum}`;
  }

  checkout(orderItems: any[]): Observable<any> {
    const order = {
      orderNo: this.generateOrderNumber(),
      date: new Date(),
      items: orderItems
    };
    return new Observable(observer => {
      this.dbService.add('orders', order).subscribe(() => {
        this.dbService.clear('cart').subscribe(() => {
          this.latestOrder.next(order); // Store latest order in BehaviorSubject
          observer.next(order);
          observer.complete();
        });
      });
    });
  }

  clearCart() {
    this.dbService.clear('cart').subscribe(() => this.updateCartCount());
  }

  getOrders(): Observable<any[]> {
    return this.dbService.getAll('orders');
  }

  getLatestOrder(): Observable<any> {
    return this.latestOrder$;
  }
}
