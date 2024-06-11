import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../types/product';
import Supplier from '../types/supplier';
import { Observable } from 'rxjs';
import { ProductCreation } from '../types/ProductCreation';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl="http://localhost:8080/api/v1/inventory"
  httpClient=inject(HttpClient);
  constructor() { }
  getSupplier(){
    return this.httpClient.get<Supplier[]>(this.apiUrl+'/getallsupplier');
  }
  getProducts(){
    return this.httpClient.get<Product[]>(this.apiUrl+'/getall');
  }
  addProduct(model:ProductCreation){
    return this.httpClient.post(this.apiUrl+'/insert_product',model);
  }
  deleteProduct(id:number){
    return this.httpClient.delete(this.apiUrl + '/delete/' + id); 
   }
   getProduct(id:string){
    return this.httpClient.get<Product[]>(this.apiUrl+'/getall/'+ id);
  }
  updateProduct(id:string,model:Product){
    return this.httpClient.put(this.apiUrl + '/update/'+ id,model)
  }
  getSupplierbyID(id:string): Observable<Supplier[]>{
    return this.httpClient.get<Supplier[]>(this.apiUrl+'/getsupplier/'+ id);
  }
}
