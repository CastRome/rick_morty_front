// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $page: Int
    $limit: Int
    $name: String
    $status: String
    $species: String
    $gender: String
    $origin: String
    $sort: String
  ) {
    characters(
      page: $page
      limit: $limit
      name: $name
      status: $status
      species: $species
      gender: $gender
      origin: $origin
      sort: $sort
    ) {
      id
      name
      image
      status
      species
      gender
      origin
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($characterId: Int!) {
    comments(characterId: $characterId) {
      id
      userId
      text
      characterId
    }
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites($userId: String!) {
    favorites(userId: $userId) {
      id
      characterId
      userId
    }
  }
`;
