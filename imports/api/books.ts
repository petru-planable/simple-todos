import { Mongo } from 'meteor/mongo';
import { Author } from './authors';

export interface Book {
  _id?: string;
  title: string;
  author: Author;
}

export const BooksCollection = new Mongo.Collection<Book>('books');
