import { inject, Injectable } from '@angular/core';
import Supplier from '../types/supplier';
import { HttpClient } from '@angular/common/http';
import { SupplierCreation } from '../types/SupplierCreation';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  apiUrl="http://localhost:8080/api/v1/inventory"
  httpClient=inject(HttpClient);
  constructor() { }
  getSupplier(){
    return this.httpClient.get<Supplier[]>(this.apiUrl+'/getallsupplier');
  }
  addSupplier(model:SupplierCreation){
    return this.httpClient.post(this.apiUrl+'/supplier/insert',model);
  }
  deleteSupplier(id:number){
    return this.httpClient.delete(this.apiUrl + '/delete/supplier/' + id); 
   }
   getSupplierbyID(id:string){
    return this.httpClient.get<Supplier[]>(this.apiUrl+'/getsupplier/' + id);
  }
  updateSupplier(id:string,model:Supplier){
    return this.httpClient.put(this.apiUrl + '/update/supplier/'+ id,model)
  }
}
