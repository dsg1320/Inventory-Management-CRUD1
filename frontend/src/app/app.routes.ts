import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FrontendComponent } from './frontend/frontend.component';
import { OrdersComponent } from './orders/orders.component';
import { ExcelComponent } from './excel/excel.component';
import { ViewComponent } from './products/view/view.component';
import { VieworderComponent } from './orders/vieworder/vieworder.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { SupplierFormComponent } from './supplier/supplier-form/supplier-form.component';

export const routes: Routes = [
    {
        path:'supplier/:id',
        component:SupplierFormComponent,
    },
    {
        path:'order/:id',
        component:OrdersFormComponent,
    },
    {
        path:'product/:id',
        component:ProductFormComponent,
    },
    {
        path:'suppliers/add',
        component:SupplierFormComponent,
    },
    {
        path:'orders/add',
        component:OrdersFormComponent,
    },
    {
        path:'products/add',
        component:ProductFormComponent,
    },
    {
        path:'supplier',
        component:SupplierComponent,
    },
    {
        path:'products',
        component:ProductsComponent,
    },
    {
        path:'',
        component:FrontendComponent,
    },
    {
        path:'orders',
        component:OrdersComponent,
    },
    {
        path:'excel',
        component:ExcelComponent,
    },
    {
        path:'Productview',
        component:ViewComponent,
    },
    {
        path:'Orderview',
        component:VieworderComponent,
    },
];
