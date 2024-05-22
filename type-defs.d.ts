import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Author = {
  __typename?: "Author";
  _id?: Maybe<Scalars["String"]["output"]>;
  books?: Maybe<Array<Maybe<Book>>>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type AuthorInput = {
  _id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Book = {
  __typename?: "Book";
  _id?: Maybe<Scalars["String"]["output"]>;
  author?: Maybe<Author>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type BookInput = {
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createBook?: Maybe<Book>;
  removeBook?: Maybe<Scalars["String"]["output"]>;
  updateBook?: Maybe<Book>;
  updateTitle?: Maybe<Book>;
};

export type MutationCreateBookArgs = {
  author?: InputMaybe<AuthorInput>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRemoveBookArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateBookArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  input?: InputMaybe<BookInput>;
};

export type MutationUpdateTitleArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  newTitle?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
};

export type QueryBookArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  bookCreated?: Maybe<Book>;
  bookRemoved?: Maybe<Book>;
  bookUpdated?: Maybe<Book>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  AuthorInput: AuthorInput;
  Book: ResolverTypeWrapper<Book>;
  BookInput: BookInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  AuthorInput: AuthorInput;
  Book: Book;
  BookInput: BookInput;
  Boolean: Scalars["Boolean"]["output"];
  Mutation: {};
  Query: {};
  String: Scalars["String"]["output"];
  Subscription: {};
};

export type AuthorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Author"] = ResolversParentTypes["Author"],
> = {
  _id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  books?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Book"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Book"] = ResolversParentTypes["Book"],
> = {
  _id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes["Author"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createBook?: Resolver<
    Maybe<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    Partial<MutationCreateBookArgs>
  >;
  removeBook?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    Partial<MutationRemoveBookArgs>
  >;
  updateBook?: Resolver<
    Maybe<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    Partial<MutationUpdateBookArgs>
  >;
  updateTitle?: Resolver<
    Maybe<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    Partial<MutationUpdateTitleArgs>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  book?: Resolver<
    Maybe<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    Partial<QueryBookArgs>
  >;
  books?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Book"]>>>,
    ParentType,
    ContextType
  >;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  bookCreated?: SubscriptionResolver<
    Maybe<ResolversTypes["Book"]>,
    "bookCreated",
    ParentType,
    ContextType
  >;
  bookRemoved?: SubscriptionResolver<
    Maybe<ResolversTypes["Book"]>,
    "bookRemoved",
    ParentType,
    ContextType
  >;
  bookUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes["Book"]>,
    "bookUpdated",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};
