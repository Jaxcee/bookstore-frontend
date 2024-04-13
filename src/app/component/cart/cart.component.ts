import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  data: any;

increaseQuantity(_t9: any) {
throw new Error('Method not implemented.');
}
decreaseQuantity(_t9: any) {
throw new Error('Method not implemented.');
}
  cartItems: any[] = [];  // Assuming this gets populated either from an API call or local storage

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
    if (!token) {
      console.error('JWT token is not available in local storage.');
      return;
    }
    
    // Set up the HTTP headers
    const headers = new HttpHeaders().set('token', `${token}`);

    // Assuming the backend service is setup to extract the userId from the token and return the appropriate data
    const url = 'http://localhost:8080/cart/allcartitems';
    
    this.http.get<any[]>(url, { headers }).subscribe((response)=>{
      this.data= response;
      console.log('cart Data' , this.data);
    });

  }

  removeItem(cartId:number): void {
    
    this.http.delete(`http://localhost:8080/cart/remove/${cartId}`).subscribe({
      next: () => {
        // Remove the item from the cartItems array to update UI
        this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
        console.log('Item removed successfully');
      },
      error: (error) => {
        console.error('Error removing item from cart', error);
      }
    });
    
  }
  decrease(book : any){
    if(book.quantity > 1){
      book.quantity--;
      
    }
    
    
  }
  increase(book : any){
    book.quantity++;
    
  }
  
}
