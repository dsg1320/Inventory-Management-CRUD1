import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule}from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common'
import Product from '../../types/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import Supplier from '../../types/supplier';
import { ProductCreation } from '../../types/ProductCreation';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  userForm:FormGroup=this.formBuilder.group({
    Prod_ID:[''],
    name:['',[Validators.required]],
    category:['',Validators.required],
    Price:['',Validators.required],
    s_id:['',Validators.required],
  });
  productService=inject(ProductsService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  editUserId!:string;
  suppliers:Supplier[] =[];
  ngOnInit(){
    this.userForm = this.formBuilder.group({
      Prod_ID: [''],
      name: ['', [Validators.required]],
      category: ['', Validators.required],
      Price: ['', Validators.required],
      s_id: ['', Validators.required],
    });
    this.productService.getSupplier().subscribe((suppliers: Supplier[])=>{
      this.suppliers=suppliers;
    });
    this.editUserId=this.route.snapshot.params["id"];
    if(this.editUserId){
      this.productService.getProduct(this.editUserId).subscribe((result:Product[])=>{
        const supplier = this.suppliers.find(s => s.Suppl_id === result[0].s_id);
        console.log("result:" , result[0])
        this.userForm.patchValue({
          Prod_ID: result[0].Prod_ID,
          name: result[0].name,
          category: result[0].category,
          Price: result[0].Price,
          s_id: supplier?.name,
        });
      });
    }

  }
  addProduct(){
    if(this.userForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const formValue = this.userForm.value;
    const selectedSupplier = this.suppliers.find(s => s.name === formValue.s_id);
    if(selectedSupplier){
      const model:ProductCreation={
        name: formValue.name,
        category: formValue.category,
        Price: formValue.Price,
        s_id:selectedSupplier.Suppl_id
      };
    
    this.productService.addProduct(model).subscribe(()=>{
      alert("User added succesfully");
      this.router.navigateByUrl('/products');
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
  updateProduct(){
    if(this.userForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const formValue = this.userForm.value;
    const selectedSupplier = this.suppliers.find(s => s.name === formValue.s_id);
    if(selectedSupplier){
      const model:Product={
        Prod_ID: formValue.Prod_ID,
        name: formValue.name,
        category:formValue.category,
        Price: formValue.Price,
        s_id: selectedSupplier.Suppl_id
      };
    this.productService.updateProduct(this.editUserId,model).subscribe(()=>{
      alert("Product Updated Successfully");
      this.router.navigateByUrl('/products');
    });
  }
}
}
