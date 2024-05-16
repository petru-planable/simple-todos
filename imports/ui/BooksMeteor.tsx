import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Book, BooksCollection } from "../api/books";

export const InfoMeteor = () => {
  let booksSize = 0;
  const [loading, setLoading] = React.useState(true);

  // The following two computations both depend on the
  // listId prop. When deps are specified, the computation
  // will be retained.
  const books = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.

    const sub = Meteor.subscribe("books");
    
    if (sub.ready()) {
      setLoading(false);
    }

    const books = BooksCollection.find().fetch();
    booksSize = books.length;

    return books;
  }, [booksSize]);

  const listBook = (book: Book) => {
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
      <h2>Bad Meteor!</h2>
      {loading && <div>Loading...</div>}
      <ul>{books?.map(listBook)}</ul>
    </div>
  );
};
