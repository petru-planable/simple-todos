import React from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { Book } from "../api/books";

const getBooks = gql`
  query books {
    books {
      _id
      title
    }
  }
`;

const booksSub = gql`
  subscription BookCreated {
    bookCreated {
      _id
      title
      author {
        _id
        name
      }
    }
  }
`;

export const Info = () => {
  const [books, setBooks] = React.useState<Book[]>([]);

  const { loading, error, data } = useQuery(getBooks, {
    onCompleted: (data) => {
      setBooks(data.books);
    },
  });

  const {
    data: subData,
    loading: subLoading,
    error: subError,
  } = useSubscription(booksSub, {
    onData: (subD) => {
      // TODO: refactor this variable name .....
      setBooks([subD.data?.data?.bookCreated, ...books]);
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (subLoading) {
  //   return <div>Subscription loading...</div>;
  // }

  if (error) {
    console.log(`full error: `, error);
    return <p>Error: {error.message}</p>;
  }

  if (subError) {
    console.log(`full sub error: `, subError);
    return <p>Subscription error: {subError.message}</p>;
  }

  const makeBook = (book: Book) => {
    return (
      <li key={book._id}>
        <a href={book.title} target="_blank">
          {book.title}
        </a>
      </li>
    );
  };

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{books.map(makeBook)}</ul>
    </div>
  );
};
