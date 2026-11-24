import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-add.html',
  styleUrl: './book-add.css'
})
export class BookAdd {
  private bookService = inject(BookService);
  private cdr = inject(ChangeDetectorRef);

  title = '';
  author = '';
  description = '';
  message = '';
  selectedFile: File | null = null;

  // Select a book cover image
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  // Send book information and image to PHP
  addBook(): void {
    if (!this.title.trim() || !this.author.trim()) {
      this.message = 'Please complete the required fields.';
      return;
    }

    const formData = new FormData();

    formData.append('title', this.title);
    formData.append('author', this.author);
    formData.append('description', this.description);

    if (this.selectedFile) {
      formData.append('cover', this.selectedFile);
    }

    this.bookService.addBook(formData).subscribe({
      next: () => {
        this.message = 'Book added successfully!';
        this.title = '';
        this.author = '';
        this.description = '';
        this.selectedFile = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.message = 'Unable to add book.';
        this.cdr.detectChanges();
      }
    });
  }
}