import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  
  data: any;
  customerDetails = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    pincode: '',
    locality: '',
    address: '',
    cityTown: '',
    landmark: ''
  };

  




  cartItems: any[] = []; 
  total: number = 0; // Assuming this gets populated either from an API call or local storage

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
      this.calculateTotal();
      console.log(this.total);
      
    });

  }

  removeItem(cartId:number): void {
    
    this.http.delete(`http://localhost:8080/cart/remove/${cartId}`).subscribe({
      next: () => {
        // Remove the item from the cartItems array to update UI
        this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
        console.log('Item removed successfully');
        this.calculateTotal();
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

  submitCustomerDetails(form: any) {
    if (form.valid) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('JWT token is not available in local storage.');
        return;
      }

      const headers = new HttpHeaders().set('token', `${token}`);
      const url = 'http://localhost:8080/customer/store';

      this.http.post(url, this.customerDetails, { headers }).subscribe({
        next: (response) => console.log('Customer details stored successfully', response),
        error: (error) => console.error('Error storing customer details', error)
      });
    } else {
      console.error('Form is not valid!');
    }
  }

  placeOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token is not available in local storage.');
      return;
    }

    const orderDetails = {
      cartItems: this.cartItems,
      customerDetails: this.customerDetails,
      total: this.total
    };

    const headers = new HttpHeaders().set('token', `${token}`);
    const url = 'http://localhost:8080/orders/placeOrder';

    this.http.post(url, orderDetails, { headers }).subscribe({
      next: (response) => console.log('Order placed successfully', response),
      error: (error) => console.error('Error placing order', error)
    });
  }

  calculateTotal() {
    this.total = this.data.reduce((acc:number, item:any) => acc + item.totalPrice, 0);
  }
}


