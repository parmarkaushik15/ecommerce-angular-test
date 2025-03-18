import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    { path: 'products', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'admin', component: AdminComponent }
];
