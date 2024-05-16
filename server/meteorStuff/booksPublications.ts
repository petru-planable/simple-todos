import { Meteor } from "meteor/meteor";
import { BooksCollection } from "/imports/api/books";

// Server: Publish the `Books` collection, minus secret info...
Meteor.publish("books", function () {
  return BooksCollection.find({});
});
