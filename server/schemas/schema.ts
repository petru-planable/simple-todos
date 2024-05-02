export const typeDefs = `#graphql
    type Book {
        _id: String
        title: String # returns a String
        author: Author # returns an Author
    }

    input BookInput {
        title: String # returns a String
    }

    type Author {
        _id: String
        name: String
        books: [Book]
    }

    type Query {
        books: [Book]
        book(id: String): Book
    }

    input AuthorInput {
        _id: String!
        name: String
    }

    type Mutation {
        createBook(title: String, author: AuthorInput): Book
        updateTitle(id: String, newTitle: String): Book
        updateBook(id: String, input: BookInput): Book
    }

    type Subscription {
        bookCreated: Book
        bookUpdated: Book
    }
`;
