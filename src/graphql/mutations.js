import { gql } from "@apollo/client";

export const ADD_FAVORITE = gql`
  mutation AddFavorite($characterId: Int!, $userId: String!) {
    addFavorite(characterId: $characterId, userId: $userId) {
      id
      userId
      characterId
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($characterId: Int!, $userId: String!) {
    removeFavorite(characterId: $characterId, userId: $userId)
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($characterId: Int!, $userId: String!, $text: String!) {
    addComment(characterId: $characterId, userId: $userId, text: $text) {
      id
      userId
      text
      characterId
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: ID!, $userId: String!) {
    removeComment(commentId: $commentId, userId: $userId)
  }
`;
