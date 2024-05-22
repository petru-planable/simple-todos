/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
  books?: Maybe<Array<Book>>;
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

export type BooksQueryVariables = Exact<{ [key: string]: never }>;

export type BooksQuery = {
  __typename?: "Query";
  books?: Array<{
    __typename?: "Book";
    _id?: string | null;
    title?: string | null;
  }> | null;
};

export type BookCreatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type BookCreatedSubscription = {
  __typename?: "Subscription";
  bookCreated?: {
    __typename?: "Book";
    _id?: string | null;
    title?: string | null;
    author?: {
      __typename?: "Author";
      _id?: string | null;
      name?: string | null;
    } | null;
  } | null;
};

export type BookRemovedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type BookRemovedSubscription = {
  __typename?: "Subscription";
  bookRemoved?: { __typename?: "Book"; _id?: string | null } | null;
};

export type RemoveBookMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type RemoveBookMutation = {
  __typename?: "Mutation";
  removeBook?: string | null;
};

export type CreateBookMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  author?: InputMaybe<AuthorInput>;
}>;

export type CreateBookMutation = {
  __typename?: "Mutation";
  createBook?: {
    __typename?: "Book";
    title?: string | null;
    author?: {
      __typename?: "Author";
      _id?: string | null;
      name?: string | null;
    } | null;
  } | null;
};

export const BooksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "books" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "books" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BooksQuery, BooksQueryVariables>;
export const BookCreatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "BookCreated" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bookCreated" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "author" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  BookCreatedSubscription,
  BookCreatedSubscriptionVariables
>;
export const BookRemovedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "BookRemoved" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bookRemoved" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  BookRemovedSubscription,
  BookRemovedSubscriptionVariables
>;
export const RemoveBookDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "removeBook" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeBook" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RemoveBookMutation, RemoveBookMutationVariables>;
export const CreateBookDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateBook" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "author" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AuthorInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createBook" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "author" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "author" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "title" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "author" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateBookMutation, CreateBookMutationVariables>;
