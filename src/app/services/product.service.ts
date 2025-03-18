import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiURL = 'https://dummyjson.com/products';

  constructor(private http: HttpClient, private dbService: NgxIndexedDBService) {}

  fetchProducts(): Observable<any> {
    return this.dbService.getAll('products').pipe(
      switchMap((products) => {
        if (products.length > 0) {
          return from([products]);
        } else {
          return this.http.get(this.apiURL).pipe(
            switchMap((data: any) => {
              data.products.forEach((product:any) => {
                this.dbService.add('products', product).subscribe();
              });
              return from([data.products]);
            })
          );
        }
      })
    );
  }
}
