import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import Product from '../../types/product';
import { SubViewService } from '../../services/sub-view.service';
import attribute from '../../types/prod_attribut';
import { CommonModule } from '@angular/common';
import Supplier from '../../types/supplier';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconButton, FormsModule,CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit{
  selectedView: string = 'price'; // Set default view
  products: Product[] = []; // Array to store products
  searchText: string = '';
  attributes:attribute[]=[];
  prices: number[]=[];
  categories: string[]=[];
  suppliers: Supplier[] = [];

  constructor(private subViewService: SubViewService) {} // Inject the service

  ngOnInit(): void {
    // Optional: Fetch data on initialization (if needed)
    this.subViewService.getAttributes().subscribe(attributes => {
      this.attributes = attributes;
      this.prices = [...new Set(attributes.map(attr => attr.Price))];
      this.categories = [...new Set(attributes.map(attr => attr.category))];
    }, error => {
      console.error('Error fetching data:', error);
    });

    this.subViewService.getSupplier().subscribe(suppliers => {
      this.suppliers = suppliers;
    }, error => {
      console.error('Error fetching suppliers:', error);
    });
  }

  fetchData(selectedView: string, searchText: string) {
    this.subViewService.getProductsView(selectedView, searchText) // Pass view and searchText
      .subscribe(products => {
        this.products = products.map(product => ({
          ...product,
          supplierName: this.suppliers.find(supplier => supplier.Suppl_id === product.s_id)?.name || 'Unknown'
        }));
      }, error => {
        // Handle API errors gracefully (optional: display error message)
        console.error('Error fetching data:', error);
        alert('Invalid Value. Please try again.');
      });
  }
}
