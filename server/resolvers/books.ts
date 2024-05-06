import { BooksCollection } from "/imports/api/books";

export const bookResolvers = {
  books: async () => {
    return BooksCollection.find().fetchAsync();
  },
  book: async (_, args) => {
    return BooksCollection.findOneAsync({ _id: args?.id });
  },
};
