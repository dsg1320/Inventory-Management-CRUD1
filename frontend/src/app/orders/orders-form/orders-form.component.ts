import { Component,OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule}from '@angular/material/input';
import Product from '../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import Orders from '../../types/orders';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import Supplier from '../../types/supplier';
import { OrderCreation } from '../../types/OrderCreation';

@Component({
  selector: 'app-orders-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule,CommonModule,MatSelectModule],
  templateUrl: './orders-form.component.html',
  styleUrl: './orders-form.component.scss'
})
export class OrdersFormComponent implements OnInit{
  formBuilder = inject(FormBuilder);
  orderForm:FormGroup=this.formBuilder.group({
    Order_id:[''],
    quantity:['',[Validators.required]],
    amount:['',Validators.required],
    prod_id:['',Validators.required],
    sup_id:['',Validators.required],
  });
  orderService=inject(OrdersService)
  router=inject(Router)
  route=inject(ActivatedRoute);
  editUserId!:string;
  suppliers:Supplier[] =[];
  products: Product[]=[];
  ngOnInit(){
    this.editUserId=this.route.snapshot.params["id"];
    this.orderService.getSuppliers().subscribe((suppliers: Supplier[]) => {
      this.suppliers = suppliers;
    });

    this.orderService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
    this.editUserId=this.route.snapshot.params["id"];
    if(this.editUserId){
      this.orderService.getOrder(this.editUserId).subscribe((result:Orders[])=>{
        console.log("result:" , result[0])
        const supplier = this.suppliers.find(s => s.Suppl_id === result[0].sup_id);
        const product = this.products.find(p => p.Prod_ID === result[0].prod_id);
        this.orderForm.patchValue({
          Order_id: result[0].Order_id,
          quantity: result[0].quantity,
          amount: result[0].amount,
          prod_id: product?.name,
          sup_id: supplier?.name
        });
      });
    }

  }
  addOrder(){
    if(this.orderForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const formValue = this.orderForm.value;
    const selectedSupplier = this.suppliers.find(s => s.name === formValue.sup_id);
    const selectedProduct = this.products.find(p => p.name === formValue.prod_id);
    if(selectedSupplier && selectedProduct){
      const model:OrderCreation={
        quantity: formValue.quantity,
        amount: formValue.amount,
        prod_id: selectedProduct.Prod_ID,
        sup_id:selectedSupplier.Suppl_id
      };
    this.orderService.addOrder(model).subscribe(()=>{
      alert("User added succesfully");
      this.router.navigateByUrl('/orders');
    },
    error => {
      if (error.status === 500 && error.code === 'ER_DUP_ENTRY') {
        alert(`Product ID already exists. Please provide a different Product ID.`);
      } else {
        alert('Invalid Value. Please try again.');
      }
    });
  }else{
    alert('Selected supplier is invalid')
  }
  }

  updateOrder(){
    if(this.orderForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const formValue = this.orderForm.value;
    const selectedSupplier = this.suppliers.find(s => s.name === formValue.sup_id);
    const selectedProduct = this.products.find(p => p.name === formValue.prod_id);
    if(selectedSupplier && selectedProduct){
      const model:Orders={
        Order_id: formValue.Order_id,
        quantity: formValue.quantity,
        amount: formValue.amount,
        prod_id: selectedProduct.Prod_ID,
        sup_id:selectedSupplier.Suppl_id
      };
    this.orderService.updateOrder(this.editUserId,model).subscribe(()=>{
      alert("Order Updated Successfully");
      this.router.navigateByUrl('/orders');
    });
  }
}
}
