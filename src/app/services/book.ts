import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost/AngularApp3API/books.php';

  // Get all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Add a book with file upload
  addBook(book: FormData): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  // Update an existing book
  updateBook(book: Book): Observable<any> {
    return this.http.put(this.apiUrl, book);
  }

  // Delete a book
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }
}