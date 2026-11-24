import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookAdd } from './components/book-add/book-add';
import { BookDelete } from './components/book-delete/book-delete';
import { BookUpdate } from './components/book-update/book-update';

// Routes for book management
export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BookList },
  { path: 'add', component: BookAdd },
  { path: 'delete', component: BookDelete },
  { path: 'update', component: BookUpdate }
];