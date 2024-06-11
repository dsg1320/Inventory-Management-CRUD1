import { Component ,OnInit,inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule}from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import Supplier from '../../types/supplier';
import { CommonModule } from '@angular/common';
import { SupplierCreation } from '../../types/SupplierCreation';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  supplierForm:FormGroup=this.formBuilder.group({
    Suppl_id:[''],
    name:['',[Validators.required]],
    phone:['',Validators.required],
  });
  supplierService=inject(SupplierService)
  router=inject(Router)
  route=inject(ActivatedRoute);
  editUserId!:string;
  ngOnInit(){
    this.editUserId=this.route.snapshot.params["id"];
    if(this.editUserId){
      this.supplierService.getSupplierbyID(this.editUserId).subscribe((result:Supplier[])=>{
        console.log("result:" , result[0])
        this.supplierForm.patchValue(result[0]);
      });
    }

  }
  addSupplier(){
    if(this.supplierForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const model :SupplierCreation = this.supplierForm.value;
    this.supplierService.addSupplier(model).subscribe(()=>{
      alert("User added succesfully");
      this.router.navigateByUrl('/supplier');
    },
    error => {
      if (error.status === 500 && error.code === 'ER_DUP_ENTRY') {
        alert(`Product ID already exists. Please provide a different Product ID.`);
      } else {
        alert('Invalid Value. Please try again.');
      }
    });
  }
  updateSupplier(){
    if(this.supplierForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const model :Supplier = this.supplierForm.value;
    this.supplierService.updateSupplier(this.editUserId,model).subscribe(()=>{
      alert("Product Updated Successfully");
      this.router.navigateByUrl('/supplier');
    });
  }
}
