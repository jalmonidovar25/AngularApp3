import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-delete',
  standalone: true,
  templateUrl: './book-delete.html',
  styleUrl: './book-delete.css'
})
export class BookDelete implements OnInit {
  private bookService = inject(BookService);
  private cdr = inject(ChangeDetectorRef);

  books: Book[] = [];
  message = '';

  // Load all books from the database
  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.cdr.detectChanges();
    });
  }

  // Delete the selected book
  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.message = 'Book deleted successfully!';
          this.ngOnInit();
          this.cdr.detectChanges();
        },
        error: () => {
          this.message = 'Unable to delete book.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}