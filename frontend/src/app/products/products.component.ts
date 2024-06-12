import { Component, OnInit, inject } from '@angular/core';
import Product from '../types/product';
import { ProductsService } from '../services/products.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import Supplier from '../types/supplier';
import { SupplierService } from '../services/supplier.service';
import { ProductWithSupplier } from '../types/ProductDisplay';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productss: ProductWithSupplier[]=[];
  suppliers: Supplier[] = [];
  supplierNameMap: { [key: string]: string } = {};
  productService= inject(ProductsService);
  suppliersService = inject(SupplierService);
  ngOnInit(){
    this.suppliersService.getSupplier().subscribe((suppliers: Supplier[]) => {
      this.suppliers = suppliers;
      this.productService.getProducts().subscribe((productss: Product[]) =>{
        this.productss = productss.map(product => ({
          ...product,
          supplierName: this.getSupplierNameById(product.s_id) || 'Unknown'
        }));
        //this.productss = result;
        //this.mapProductsToSupplierNames(result);
      });
    });
  }
  getSupplierNameById(id: number): string | undefined {
    const supplier = this.suppliers.find(s => s.Suppl_id === id);
    return supplier ? supplier.name : undefined;
  }
  delete(id: number){
    const ok = confirm("Are you sure that you want to delete this product?");
    if(ok){
      this.productService.deleteProduct(id).subscribe(() =>{
        alert("Product deleted successfully");
        this.productss=this.productss.filter(u=>u.Prod_ID!=id);
      });
    }
  }

}
