import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMMENTS, GET_FAVORITES } from "../graphql/queries";
import { ADD_FAVORITE, REMOVE_FAVORITE, ADD_COMMENT } from "../graphql/mutations";

function CharacterDetailModal({ character, onClose, userId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const commentInputRef = useRef(null);

  const { data: commentsData, loading: commentsLoading, error: commentsError, refetch: refetchComments } = useQuery(GET_COMMENTS, {
    variables: { characterId: Number(character.id) },
  });

  const { data: favoritesData, loading: favoritesLoading } = useQuery(GET_FAVORITES, {
    variables: { userId },
  });

  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);
  const [addComment] = useMutation(ADD_COMMENT);

  useEffect(() => {
    if (favoritesData?.favorites) {
      setIsFavorite(favoritesData.favorites.some(fav => fav.characterId === Number(character.id)));
    }
  }, [favoritesData, character.id]);

  // Focus textarea when modal opens
  useEffect(() => {
    commentInputRef.current?.focus();
  }, []);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite({ variables: { characterId: Number(character.id), userId } });
      } else {
        await addFavorite({ variables: { characterId: Number(character.id), userId } });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      alert("Error updating favorite");
    }
  };

  const handleAddComment = async () => {
    setCommentError("");
    if (!comment.trim()) return;
    setCommentLoading(true);
    try {
      await addComment({ variables: { characterId: Number(character.id), userId, text: comment } });
      setComment("");
      refetchComments();
    } catch (e) {
      setCommentError("Error adding comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col outline-none">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 font-bold text-lg focus:outline-none"
            aria-label="Close modal"
            autoFocus
          >
            ×
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Image and details */}
          <div className="w-1/3 p-6 flex flex-col items-center border-r overflow-auto">
            <img src={character.image} alt={character.name} className="rounded w-full object-cover mb-4" />
            <div className="w-full space-y-2 text-gray-700">
              <p><strong>Species:</strong> {character.species}</p>
              <p><strong>Status:</strong> {character.status}</p>
              <p><strong>Gender:</strong> {character.gender}</p>
            </div>
            <button
              className={`mt-6 px-6 py-2 rounded font-semibold transition-colors focus:outline-none ${
                isFavorite
                  ? "bg-yellow-400 hover:bg-yellow-300"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={handleToggleFavorite}
              disabled={favoritesLoading}
              aria-pressed={isFavorite}
            >
              {isFavorite ? "★ Favorite" : "☆ Mark as Favorite"}
            </button>
          </div>

          {/* Right: Comments */}
          <div className="w-2/3 flex flex-col p-6">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            <div className="flex-1 overflow-y-auto mb-4 border rounded p-4 bg-gray-50">
              {commentsLoading && <p>Loading comments...</p>}
              {commentsError && <p className="text-red-500">Error loading comments</p>}
              {!commentsLoading && commentsData?.comments.length === 0 && <p>No comments yet!</p>}

              <ul className="space-y-2">
                {commentsData?.comments.map(({ id, userId: cUserId, text }) => (
                  <li key={id} className="border-b pb-2 last:border-none">
                    <span className="font-bold text-gray-800">{cUserId}:</span> {text}
                  </li>
                ))}
              </ul>
            </div>

            <textarea
              ref={commentInputRef}
              className="resize-none p-3 border rounded h-24 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              aria-label="Add a comment"
              disabled={commentLoading}
            />
            {commentError && <p className="text-red-500 mb-2">{commentError}</p>}

            <button
              onClick={handleAddComment}
              className="self-end px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={commentLoading || !comment.trim()}
            >
              {commentLoading ? "Sending..." : "Send Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailModal;
