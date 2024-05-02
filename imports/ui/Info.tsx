import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Book } from "../api/books";

const getBooks = gql`
  query books {
    books {
      _id
      title
    }
  }
`;

export const Info = () => {
  const { loading, error, data } = useQuery(getBooks);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  if (error) {
    console.log(`full error: `, error);
    return <p>Error: {error.message}</p>;
  }

  const makeBook = (book: Book) => {
    return (
      <li key={book._id}>
        <a href={book.title} target="_blank">
          {book.author?.name}
        </a>
      </li>
    );
  };

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{data.books?.map(makeBook)}</ul>
    </div>
  );
};
