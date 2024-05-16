import React from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Book } from "../api/books";
import { CreateBook } from "./createBook";

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
const removedBookSub = gql`
  subscription BookRemoved {
    bookRemoved {
      _id
    }
  }
`;

const REMOVE_BOOK = gql`
  mutation removeBook($id: String!) {
    removeBook(id: $id)
  }
`;

export const Info = () => {
  const [books, setBooks] = React.useState<Book[]>([]);

  const { loading, error, data } = useQuery(getBooks, {
    onCompleted: (data) => {
      setBooks(data.books);
    },
  });
  const [
    removeBook,
    { data: _data, loading: loadingRemove, error: errorRemove },
  ] = useMutation(REMOVE_BOOK, {
    refetchQueries: [
      "books", // Query name // lucreaza doar ca noi nu folosim direct useQuery data, dar useState
    ],
    onCompleted: (count) => {
      console.log(`removed count: `, count);
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

  // Remove through subscription
  useSubscription(removedBookSub, {
    onData: (subD) => {
      setBooks(
        books.filter((book) => book._id !== subD.data?.data?.bookRemoved._id)
      );
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <button
          style={{ marginLeft: "10px" }}
          className="btn"
          onClick={() => removeBook({ variables: { id: book._id } })}
        >
          Remove
          {loadingRemove && <p>Removing...</p>}
          {errorRemove && <p>Error removing: {errorRemove.message}</p>}
        </button>
      </li>
    );
  };

  return (
    <div>
      <h2>Good GraphQL!</h2>
      <ul>{books.map(makeBook)}</ul>

      <CreateBook />
    </div>
  );
};
