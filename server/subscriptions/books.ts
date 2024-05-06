import { RedisPubSub } from "graphql-redis-subscriptions";
import { Meteor } from "meteor/meteor";

const settings = Meteor.settings.redisOplog.redis;
const redisPubSub = new RedisPubSub({ connection: settings });

export const booksSubscriptions = {
  bookCreated: {
    subscribe: () => {
      return redisPubSub.asyncIterator("bookCreated");
    },
  },
  bookUpdated: {
    subscribe: () => {
      return redisPubSub.asyncIterator("bookUpdated");
    },
  },
};
