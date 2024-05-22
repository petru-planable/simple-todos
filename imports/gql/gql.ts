/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query books {\n    books {\n      _id\n      title\n    }\n  }\n":
    types.BooksDocument,
  "\n  subscription BookCreated {\n    bookCreated {\n      _id\n      title\n      author {\n        _id\n        name\n      }\n    }\n  }\n":
    types.BookCreatedDocument,
  "\n  subscription BookRemoved {\n    bookRemoved {\n      _id\n    }\n  }\n":
    types.BookRemovedDocument,
  "\n  mutation removeBook($id: String!) {\n    removeBook(id: $id)\n  }\n":
    types.RemoveBookDocument,
  "\n  mutation CreateBook($title: String!, $author: AuthorInput) {\n    createBook(title: $title, author: $author) {\n      title\n      author {\n        _id\n        name\n      }\n    }\n  }\n":
    types.CreateBookDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query books {\n    books {\n      _id\n      title\n    }\n  }\n",
): (typeof documents)["\n  query books {\n    books {\n      _id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  subscription BookCreated {\n    bookCreated {\n      _id\n      title\n      author {\n        _id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  subscription BookCreated {\n    bookCreated {\n      _id\n      title\n      author {\n        _id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  subscription BookRemoved {\n    bookRemoved {\n      _id\n    }\n  }\n",
): (typeof documents)["\n  subscription BookRemoved {\n    bookRemoved {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation removeBook($id: String!) {\n    removeBook(id: $id)\n  }\n",
): (typeof documents)["\n  mutation removeBook($id: String!) {\n    removeBook(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateBook($title: String!, $author: AuthorInput) {\n    createBook(title: $title, author: $author) {\n      title\n      author {\n        _id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateBook($title: String!, $author: AuthorInput) {\n    createBook(title: $title, author: $author) {\n      title\n      author {\n        _id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
