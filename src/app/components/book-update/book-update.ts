import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-update.html',
  styleUrl: './book-update.css'
})
export class BookUpdate implements OnInit {
  private bookService = inject(BookService);
  private cdr = inject(ChangeDetectorRef);

  books: Book[] = [];
  selectedBook: Book | null = null;
  message = '';

  // Load available books
  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.cdr.detectChanges();
    });
  }

  // Select a book to edit
  selectBook(book: Book): void {
    this.selectedBook = { ...book };
    this.message = '';
  }

  // Save updated book information
  updateBook(): void {
    if (this.selectedBook) {
      this.bookService.updateBook(this.selectedBook).subscribe({
        next: () => {
          this.message = 'Book updated successfully!';
          this.ngOnInit();
          this.cdr.detectChanges();
        },
        error: () => {
          this.message = 'Unable to update book.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}