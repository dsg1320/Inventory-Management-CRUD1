import { inject,Injectable } from '@angular/core';
import Product from '../types/product';
import { HttpClient } from '@angular/common/http';
import attribute from '../types/prod_attribut';
import Supplier from '../types/supplier';


@Injectable({
  providedIn: 'root'
})
export class SubViewService {
  apiUrl="http://localhost:8080/api/v1/inventory"
  httpClient=inject(HttpClient);
  constructor() { }
  getSupplier(){
    return this.httpClient.get<Supplier[]>(this.apiUrl+'/getallsupplier');
  }
  getAttributes(){
    return this.httpClient.get<attribute[]>(this.apiUrl+"/getall");
  }

  getProductsView(view: string,selectedView: string){
    return this.httpClient.get<Product[]>(this.apiUrl+'/get/product/'+view+'/'+selectedView);
  }
}
