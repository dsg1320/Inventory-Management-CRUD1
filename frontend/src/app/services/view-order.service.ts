import { inject,Injectable } from '@angular/core';
import Orders from '../types/orders';
import { HttpClient } from '@angular/common/http';
import orderatt from '../types/order_attribute';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderService {
  apiUrl="http://localhost:8080/api/v1/inventory"
  httpClient=inject(HttpClient);
  constructor() { }
  getAttributes(){
    return this.httpClient.get<orderatt[]>(this.apiUrl+"/getorders");
  }
  getOrdersView(view: string,selectedView: string){
    return this.httpClient.get<Orders[]>(this.apiUrl+'/get/'+view+'/'+selectedView);
  }
}
