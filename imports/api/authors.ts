import { Mongo } from 'meteor/mongo';
import { Book } from './books';

export interface Author {
  _id?: string;
  name: string;
  books: Book[];
}

export const AuthorsCollection = new Mongo.Collection<Author>('authors');
