import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS, GET_FAVORITES } from "../graphql/queries";
import CharacterCard from "./CharacterCard";
import CharacterDetailModal from "./CharacterDetailModal";
import CharacterFilter from "./CharacterFilters";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CharacterList({ userId = "user123" }) {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Hide character detail modal when page changes
  useEffect(() => {
    setSelectedCharacter(null);
  }, [page]);

  const handlePageChange = (newPage) => setPage(newPage);

  // Prepare query variables, removing empty/null values
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
  const {
    data: favoritesData,
    loading: favoritesLoading,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useQuery(GET_FAVORITES, { variables: { userId } });

  // Get characters and favorites from queries
  const characters = data?.characters || [];
  const favorites = favoritesData?.favorites || [];

  // Local search filter
  const query = filter.query ? filter.query.toLowerCase() : "";
  const filteredCharacters = query
    ? characters.filter(
        (char) =>
          char.name.toLowerCase().includes(query) ||
          char.species.toLowerCase().includes(query) ||
          (char.status && char.status.toLowerCase().includes(query)) ||
          (char.gender && char.gender.toLowerCase().includes(query)) ||
          (char.origin?.name && char.origin.name.toLowerCase().includes(query))
      )
    : characters;

  // Split favorite and non-favorite characters
  const favoriteCharacterIds = favorites.map((fav) => fav.characterId);
  const favoriteCharacters = filteredCharacters.filter((char) =>
    favoriteCharacterIds.includes(Number(char.id))
  );
  const nonFavoriteCharacters = filteredCharacters.filter(
    (char) => !favoriteCharacterIds.includes(Number(char.id))
  );

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Character List Panel */}
      <div className="w-full max-w-[375px] flex-shrink-0 px-2">
        {(loading || favoritesLoading) && (
          <p className="text-blue-500 text-center my-8 text-lg animate-pulse">
            Loading characters...
          </p>
        )}

        {error && (
          <p className="text-red-500 text-center my-8 text-lg">
            Error: {error.message}
          </p>
        )}
        {favoritesError && (
          <p className="text-red-500 text-center my-8 text-lg">
            Error loading favorites.
          </p>
        )}

        {!loading && !favoritesLoading && filteredCharacters.length === 0 && (
          <p className="text-gray-500 text-center my-8 text-lg">
            No characters found.
          </p>
        )}

        <h1 className="text-3xl font-bold text-center mb-6">
          Rick and Morty list
        </h1>

        <div className="flex justify-center mb-6">
          <CharacterFilter onChange={setFilter} />
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-row justify-between items-center mb-4 px-6">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="disabled:opacity-50 bg-primary-600 hover:bg-primary-600 text-white p-2 rounded-l"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="bg-purple-500 hover:bg-primary-600 text-white p-2 rounded-r"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Starred Characters */}
        {favoriteCharacters.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold mb-4 px-6 uppercase text-gray-500">
              Starred Characters ({favoriteCharacters.length})
            </h2>
            <div className="flex flex-col w-full">
              {favoriteCharacters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onClick={() => setSelectedCharacter(char)}
                  isSelected={selectedCharacter?.id === char.id}
                  isFavorite={true}
                  userId={userId}
                />
              ))}
            </div>
          </section>
        )}

        {/* Non-Favorite Characters */}
        {nonFavoriteCharacters.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold mb-4 px-6 uppercase text-gray-500">
              Characters ({nonFavoriteCharacters.length})
            </h2>
            <div className="flex flex-col w-full">
              {nonFavoriteCharacters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onClick={() => setSelectedCharacter(char)}
                  isSelected={selectedCharacter?.id === char.id}
                  isFavorite={false}
                  userId={userId}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Character Detail Panel */}
      {selectedCharacter && (
        <div className="flex-grow">
          <CharacterDetailModal
            character={selectedCharacter}
            userId={userId}
            onClose={() => setSelectedCharacter(null)}
            refetchFavorites={refetchFavorites}
          />
        </div>
      )}
    </div>
  );
}

export default CharacterList;