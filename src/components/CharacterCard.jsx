import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FAVORITES } from "../graphql/queries";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../graphql/mutations";
import { Heart } from "lucide-react";

/**
 * CharacterCard displays a character's info and allows marking as favorite.
 * @param {object} character - Character data.
 * @param {function} onClick - Callback for selecting the character.
 * @param {boolean} isSelected - If the card is currently selected.
 * @param {string} userId - Current user ID.
 */
function CharacterCard({ character, onClick, isSelected = false, userId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Keyboard accessibility for card selection
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick(character);
    }
  };

  // Query for user's favorites
  const {
    data: favoritesData,
    refetch: refetchFavorites,
  } = useQuery(GET_FAVORITES, {
    variables: { userId },
  });

  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

  // Toggle favorite status
  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      if (isFavorite) {
        await removeFavorite({ variables: { characterId: Number(character.id), userId } });
      } else {
        await addFavorite({ variables: { characterId: Number(character.id), userId } });
      }
      setIsFavorite(!isFavorite);
      await refetchFavorites();
    } catch {
      alert("Error updating favorite");
    }
  };

  // Update favorite state when favorites data changes
  useEffect(() => {
    if (favoritesData?.favorites) {
      setIsFavorite(favoritesData.favorites.some(fav => fav.characterId === Number(character.id)));
    }
  }, [favoritesData, character.id]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${character.name}`}
      className={`w-full px-4 py-4 ${
        isSelected ? "bg-primary-100 border shadow-md rounded-2xl" : "bg-white border-b border-gray-200"
      } flex items-center justify-between cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-100`}
      onClick={() => onClick(character)}
      onKeyDown={handleKeyDown}
    >
      {/* Character image */}
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
        <img
          src={character.image}
          alt={character.name}
          className="w-8 h-8 rounded-full object-cover border border-gray-300"
          loading="lazy"
        />
      </div>

      {/* Character info */}
      <div className="flex flex-col justify-center flex-1 px-4 overflow-hidden">
        <h2 className="text-base font-semibold truncate" title={character.name}>
          {character.name}
        </h2>
        <p className="text-sm text-gray-600 truncate" title={character.species}>
          {character.species}
        </p>
      </div>

      {/* Favorite heart button */}
      <div className="flex-shrink-0">
        <button
          onClick={handleToggleFavorite}
          className={`${isFavorite ? "shadow-md" : ""} h-8 w-8 rounded-full bg-white flex items-center justify-center focus:outline-none`}
          aria-label={isFavorite ? "Unmark as favorite" : "Mark as favorite"}
          tabIndex={0}
        >
          <Heart
            size={18}
            className={`${
              isFavorite ? "text-secondary-600 fill-secondary-600" : "text-gray-400"
            } transition-colors`}
          />
        </button>
      </div>
    </div>
  );
}

export default CharacterCard;
