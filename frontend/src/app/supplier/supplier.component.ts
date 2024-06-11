import { inject,Component, OnInit } from '@angular/core';
import Supplier from '../types/supplier';
import { SupplierService } from '../services/supplier.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements OnInit{
  supplier:Supplier[] = [];
  supplierservice=inject(SupplierService);
  ngOnInit(){
    this.supplierservice.getSupplier().subscribe(result => {
      this.supplier=result;
      console.log(this.supplier);
    })
  }
  delete(id: number){
    const ok = confirm("Are you sure that you want to delete this?");
    if(ok){
      this.supplierservice.deleteSupplier(id).subscribe(()=>{
        alert("Supplier deleted successfully deleted successfully");
        this.supplier=this.supplier.filter(u=>u.Suppl_id!=id);
      });
    }
  }
}
