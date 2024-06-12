import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-frontend',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatIconButton,FormsModule],
  templateUrl: './frontend.component.html',
  styleUrl: './frontend.component.scss'
})
export class FrontendComponent {
  subView: string = '';

  onSubmit() {
    // Do something with the subView value, for example:
    //console.log('Sub-view entered by the user:', this.subView);
    
    // Clear the input field
    this.subView = '';
  }
  getViewRoute(view: string): string {
    switch (view) {
      case 'price':
        return 'view';  
      case 'category':
        return 'view';  
      default:
        return ''; 
    }
  }
}
