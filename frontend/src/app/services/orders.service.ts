import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Orders from '../types/orders';
import Supplier from '../types/supplier';
import Product from '../types/product';
import { OrderCreation } from '../types/OrderCreation';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl="http://localhost:8080/api/v1/inventory";
  httpClient=inject(HttpClient);
  constructor() { }
  getSupplier(){
    return this.httpClient.get<Orders[]>(this.apiUrl+'/getorders');
  }
  addOrder(model:OrderCreation){
    return this.httpClient.post(this.apiUrl+'/order/insert',model);
  }
  deleteOrders(id:number){
    return this.httpClient.delete(this.apiUrl + '/delete/order/' + id); 
   }
   getOrder(id:string){
    return this.httpClient.get<Orders[]>(this.apiUrl+'/getorder/'+ id);
  }
  updateOrder(id:string,model:Orders){
    return this.httpClient.put(this.apiUrl + '/update/orders/'+ id,model)
  }
  getSuppliers(){
    return this.httpClient.get<Supplier[]>(this.apiUrl+'/getallsupplier');
  }
  getProducts(){
    return this.httpClient.get<Product[]>(this.apiUrl+'/getall');
  }
}
