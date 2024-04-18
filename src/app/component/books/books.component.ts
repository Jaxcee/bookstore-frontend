import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  books: any[] = [];  // Assuming this gets populated from an API call to /books
  addedToCartIds: Set<number> = new Set();
   // Update with your correct endpoint

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<any[]>('http://localhost:8080/books').subscribe(data => {
      console.log('Books fetched:', data);
      this.books = data;
      console.log(this.books)
    }, error => console.error('Failed to fetch books', error));
  }

  addToCart(bookId: any) {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Authentication token is not available');
        return;
    }

    // Set up HTTP headers with the token
    const headers = new HttpHeaders().set('token', `${token}`);

    // Cart data to be sent to the backend
    const cartData = {
        bookId: bookId,
        quantity: 1,
    };

    // Backend URL configured for adding items to the cart
    const url = 'http://localhost:8080/cart/add';

    // Make the HTTP POST request
    this.http.post<any>(url, cartData, { headers  }).subscribe(
        response => {
            console.log('Response from addToCart:', response );
            this.addedToCartIds.add(bookId);
            // Assuming `addedToCartIds` tracks added items
        },
        error => {
            console.error('Failed to add item to cart:', error);
        }
    );
}
}
