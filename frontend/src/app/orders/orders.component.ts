import { inject,Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Orders from '../types/orders';
import { OrdersService } from '../services/orders.service';
import { RouterLink } from '@angular/router';
import { OrderDisplay } from '../types/OrderDisplay';
import Product from '../types/product';
import Supplier from '../types/supplier';
import { ProductsService } from '../services/products.service';
import { SupplierService } from '../services/supplier.service';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  //order:Orders[] = [];
  orderss:OrderDisplay[]=[];
  products: Product[]=[];
  suppliers: Supplier[]=[];
  orderservice=inject(OrdersService);
  productsService = inject(ProductsService);
  suppliersService = inject(SupplierService);
  ngOnInit(){
    this.suppliersService.getSupplier().subscribe(suppliers => {
      this.suppliers = suppliers;
      this.productsService.getProducts().subscribe(products => {
        this.products = products;
        this.orderservice.getSupplier().subscribe((orderss: Orders[]) => {
          this.orderss = orderss.map(orders => ({
            ...orders,
            supplierName: this.getSupplierNameById(orders.sup_id) ||'Unknown',
            productName: this.getProductNameById(orders.prod_id) || 'Unknown'
          }));
        });
      });
    });
  }
  getSupplierNameById(id: number): string | undefined {
    const supplier = this.suppliers.find(s => s.Suppl_id === id);
    return supplier ? supplier.name : undefined;
  }

  getProductNameById(id: number | null): string | undefined {
    const product = this.products.find(p => p.Prod_ID === id);
    return product ? product.name : undefined;
  }
  delete(id: number){
    const ok = confirm("Are you sure that you want to delete this?");
    if(ok){
      this.orderservice.deleteOrders(id).subscribe(()=>{
        alert("Order deleted successfully deleted successfully");
        this.orderss=this.orderss.filter(u=>u.Order_id!=id);
      });
    }
  }
  
}
