import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: AuthorInput) {
    createBook(title: $title, author: $author) {
      title
      author {
        _id
        name
      }
    }
  }
`;

export const CreateBook = () => {
  let input: { value: string };
  const [createBook] = useMutation(CREATE_BOOK);

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createBook({ variables: { title: input.value } });
            input.value = "";
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          />
          <button type="submit">Create Book</button>
        </form>
      </div>
    </div>
  );
};
