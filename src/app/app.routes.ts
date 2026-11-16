
import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BookList },
  { path: '**', redirectTo: 'list' }
];
