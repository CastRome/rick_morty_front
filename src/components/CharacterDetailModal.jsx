import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMMENTS, GET_FAVORITES } from "../graphql/queries";
import { ADD_FAVORITE, REMOVE_FAVORITE, ADD_COMMENT } from "../graphql/mutations";
import { ChevronLeft, Heart } from "lucide-react";

function CharacterDetailModal({ character, onClose, userId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");

  // Ref for the main modal container
  const modalRef = useRef(null);

  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery(GET_COMMENTS, {
    variables: { characterId: Number(character.id) },
  });

  const { data: favoritesData, refetch: refetchFavorites } = useQuery(GET_FAVORITES, {
    variables: { userId },
  });

  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);
  const [addComment] = useMutation(ADD_COMMENT);

  // Update favorite state when favorites data changes
  useEffect(() => {
    if (favoritesData?.favorites) {
      setIsFavorite(favoritesData.favorites.some(fav => fav.characterId === Number(character.id)));
    }
  }, [favoritesData, character.id]);

  // Focus the modal container when opened
  useEffect(() => {
    modalRef.current?.focus();
  }, [character]);

  const handleToggleFavorite = async () => {
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

  const handleAddComment = async () => {
    setCommentError("");
    if (!comment.trim()) return;
    setCommentLoading(true);
    try {
      await addComment({ variables: { characterId: Number(character.id), userId, text: comment } });
      setComment("");
      refetchComments();
    } catch {
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
      ref={modalRef}
      tabIndex={-1}
      className={`
        fixed md:static inset-0 z-50 flex items-center justify-center
        md:justify-end bg-black bg-opacity-50 md:bg-transparent
        ${character ? "block" : "hidden"} p-2
      `}
      onKeyDown={handleKeyDown}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`
          bg-white rounded-lg shadow-lg flex flex-col outline-none
          w-full h-full md:h-[90vh] md:max-w-[calc(100vw-375px)]
          md:rounded-none md:shadow-none md:border-l md:mt-4 md:mr-4
        `}
      >
        {/* Header for mobile screens only */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="text-primary-500 flex items-center space-x-1 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" color="#8054C7" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
          {/* Left: Image and details */}
          <div className="w-full md:w-1/3 flex-shrink-0 min-w-[375px] p-6 flex flex-col border-b md:border-b-0 md:border-r overflow-auto">
            <div className="mb-6">
              <div className="relative h-[75px] w-[75px] sm:h-[120px] sm:w-[120px]">
                <img
                  src={character.image}
                  alt={character.name}
                  className="rounded-full h-full w-full object-cover border border-gray-200"
                />
                <button
                  onClick={handleToggleFavorite}
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md focus:outline-none"
                  aria-label={isFavorite ? "Unmark as favorite" : "Mark as favorite"}
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

            {/* Character detail fields */}
            <div className="w-full text-gray-700 space-y-4">
              <div className="h-[74px] w-full pt-4 pr-6 pb-4">
                <h2 className="font-bold">{character.name}</h2>
              </div>
              <div className="h-[74px] w-full pt-4 pr-6 pb-4">
                <p className="text-base font-semibold">Species</p>
                <p className="text-sm text-gray-600 truncate">{character.species}</p>
              </div>
              <div className="h-[74px] w-full pt-4 pr-6 pb-4 border-t border-gray-200">
                <p className="text-base font-semibold">Status</p>
                <p className="text-sm text-gray-600 truncate">{character.status}</p>
              </div>
              <div className="h-[74px] w-full pt-4 pr-6 pb-4 border-t border-gray-200">
                <p className="text-base font-semibold">Occupation</p>
                <p className="text-sm text-gray-600 truncate">{character.occupation || "Unknown"}</p>
              </div>
            </div>
          </div>

          {/* Right: Comments */}
          <div className="w-full md:w-2/3 flex flex-col p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            <div className="flex-1 mb-4">
              {commentsLoading && <p>Loading comments...</p>}
              {commentsError && <p className="text-red-500">Error loading comments</p>}
              {!commentsLoading && commentsData?.comments.length === 0 && <p>No comments yet!</p>}

              <ul className="space-y-2 pr-1">
                {commentsData?.comments.map(({ id, userId: cUserId, text }) => (
                  <li key={id} className="border rounded p-4 bg-gray-50  md:max-h-60 md:overflow-y-auto">
                    <span className="font-bold text-gray-800">{cUserId}:</span> {text}
                  </li>
                ))}
              </ul>
            </div>

            <textarea
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
              className="self-end px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition disabled:opacity-50"
              disabled={commentLoading || !comment.trim()}
            >
              {commentLoading ? "Sending..." : "Add Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailModal;
