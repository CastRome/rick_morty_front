function CharacterCard({ character, onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick(character);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${character.name}`}
      className="bg-gray-100 border border-gray-300 rounded-lg w-64 h-96 p-4 shadow-md cursor-pointer flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => onClick(character)}
      onKeyDown={handleKeyDown}
    >
      <h2 className="text-lg font-semibold mb-2 truncate w-full text-center" title={character.name}>
        {character.name}
      </h2>

      <div className="w-full h-64 mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-white">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <p className="text-sm text-gray-600 truncate w-full text-center" title={character.species}>
        {character.species}
      </p>
    </div>
  );
}

export default CharacterCard;
