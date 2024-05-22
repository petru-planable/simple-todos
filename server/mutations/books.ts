import { BooksCollection } from "/imports/api/books";
import { getRedisPusher } from "meteor/cultofcoders:redis-oplog";

import safeJsonStringify from "safe-json-stringify";

export const booksMutations = {
  createBook: async (_, args) => {
    const id = await BooksCollection.insertAsync(args);

    const book = await BooksCollection.findOneAsync({ _id: id });

    getRedisPusher().publish(
      `bookCreated`,
      safeJsonStringify({ bookCreated: { ...book } })
    );

    return book;
  },

  updateTitle: async (_, args) => {
    await BooksCollection.updateAsync(
      { _id: args?.id },
      { $set: { title: args?.newTitle } }
    );

    getRedisPusher().publish(
      `userModified`,
      safeJsonStringify({
        userModified: { profile: { name: args?.profileName } },
      })
    );

    return BooksCollection.findOneAsync({ _id: args?.id });
  },

  updateBook: async (_, args) => {
    await BooksCollection.updateAsync(
      { _id: args?.id },
      { $set: { ...args?.input } }
    );

    getRedisPusher().publish(
      `bookUpdated`,
      safeJsonStringify({ bookUpdated: { ...args?.input, _id: args?.id } })
    );

    return BooksCollection.findOneAsync({ _id: args?.id });
  },

  removeBook: async (_, args) => {
    const response = await BooksCollection.removeAsync({ _id: args?.id });

    getRedisPusher().publish(
      `bookRemoved`,
      safeJsonStringify({ bookRemoved: { _id: args?.id } })
    );

    return response;
  },
};
