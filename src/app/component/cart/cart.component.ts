import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];  // Assuming this gets populated either from an API call or local storage

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const userId = 152;
    this.http.get<any[]>(`http://localhost:8080/cart/allForUser/${userId}`).subscribe(
      (data: any[]) => {
        // For each item in the cart, fetch complete book details
        data.forEach(item => {
          this.http.get<any>(`http://localhost:8080/books/${item.bookId}`).subscribe(
            (bookDetails: any) => {
              // Merge book details with cart item
              const cartItem = {
                ...item,
                book: bookDetails // Assuming book details include name, author, price, and image URL
              };
              this.cartItems.push(cartItem);
            },
            error => console.error('Failed to fetch book details', error)
          );
        });
      },
      error => console.error('Failed to load cart items', error)
    );
  }

  removeItem(cartId:any): void {
    // const cartId = 28;
    // this.http.delete(`http://localhost:8080/cart/remove/${cartId}`).subscribe({
    //   next: () => {
    //     // Remove the item from the cartItems array to update UI
    //     this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
    //     console.log('Item removed successfully');
    //   },
    //   error: (error) => {
    //     console.error('Error removing item from cart', error);
    //   }
    // });
    console.log(cartId)
  }
}
