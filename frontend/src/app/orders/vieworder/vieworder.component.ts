import { Component, OnInit } from '@angular/core';
import Orders from '../../types/orders';
import { ViewOrderService } from '../../services/view-order.service';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import orderatt from '../../types/order_attribute';
import Supplier from '../../types/supplier';
import Product from '../../types/product';

@Component({
  selector: 'app-vieworder',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconButton, FormsModule,CommonModule],
  templateUrl: './vieworder.component.html',
  styleUrl: './vieworder.component.scss'
})
export class VieworderComponent implements OnInit {
  selectedView: string = 'price'; // Set default view
  orders: Orders[] = []; // Array to store products
  searchText: string = '';
  orderatts:orderatt[]=[];
  prices: number[]=[];
  quantities: number[]=[];
  suppliers: Supplier[] = [];
  products:Product[]=[];


  constructor(private viewOrderService: ViewOrderService) {} // Inject the service

  ngOnInit(): void {
    // Optional: Fetch data on initialization (if needed)
    this.viewOrderService.getAttributes().subscribe(orderatt => {
      this.orderatts = orderatt;
      this.prices = [...new Set(orderatt.map(attr => attr.amount))];
      this.quantities = [...new Set(orderatt.map(attr => attr.quantity))];
    }, error => {
      console.error('Error fetching data:', error);
    });

    this.viewOrderService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    }, error => {
      console.error('Error fetching suppliers:', error);
    });

    this.viewOrderService.getProducts().subscribe(products => {
      this.products = products;
    }, error => {
      console.error('Error fetching products:', error);
    });
  }

  fetchData(selectedView: string, searchText: string) {
    this.viewOrderService.getOrdersView(selectedView, searchText) // Pass view and searchText
      .subscribe(orders => {
        this.orders = orders.map(order => ({
          ...order,
          supplierName: this.suppliers.find(supplier => supplier.Suppl_id === order.sup_id)?.name || 'Unknown',
          productName: this.products.find(product => product.Prod_ID === order.prod_id)?.name || 'Unknown'
        }));
      }, error => {
        // Handle API errors gracefully (optional: display error message)
        console.error('Error fetching data:', error);
        alert('Invalid Value. Please try again.');
      });
  }
}
