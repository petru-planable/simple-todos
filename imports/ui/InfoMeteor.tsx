import React from "react";
import { Book } from "../api/books";

export const InfoMeteor = () => {
  const [books, setBooks] = React.useState<Book[]>([]);

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>TODO</ul>
    </div>
  );
};
