import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import CharacterCard from "./CharacterCard";
import CharacterDetailModal from "./CharacterDetailModal";

function CharacterList({ page, filter, userId = "user123" }) {

  const variables = {
    page,
    limit: 15,
    ...filter,
  };

  Object.keys(variables).forEach(
    (key) =>
      (variables[key] == null || variables[key] === "") && delete variables[key]
  );

  const { loading, error, data } = useQuery(GET_CHARACTERS, { variables });
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = data?.characters || [];

  return (
    <>
      {loading && (
        <p className="text-blue-500 text-center my-8 text-lg animate-pulse">
          Loading characters...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center my-8 text-lg">
          Error: {error.message}
        </p>
      )}
      {!loading && !error && characters.length === 0 && (
        <p className="text-gray-500 text-center my-8 text-lg">
          No characters found.
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => setSelectedCharacter(char)}
          />
        ))}
      </div>

      {selectedCharacter && (
        <CharacterDetailModal
          character={selectedCharacter}
          userId={userId}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </>
  );
}

export default CharacterList;
