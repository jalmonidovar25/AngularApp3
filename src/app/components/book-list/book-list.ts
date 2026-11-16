
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  private bookService = inject(BookService);
  private cdr = inject(ChangeDetectorRef);

  books: Book[] = [];
  errorMessage = '';

  // Load books from the PHP backend
  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load books. Check the PHP server.';
        this.cdr.detectChanges();
      }
    });
  }
}
