import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { useGetCommentsQuery } from "@service/commentApi";

const CommentExample = ({ movieId }) => {
  const [page, setPage] = useState(1);
  const size = 7;
  const [commentsOfMovie, setCommentsOfMovie] = useState([]);
  const { data: commentsOfMovieResponse, isSuccess } = useGetCommentsQuery({
    movieId,
    page,
    size,
  });

  const handleLoadMoreComments = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (isSuccess) {
      setCommentsOfMovie((prev) => [
        ...prev,
        ...commentsOfMovieResponse.data.result,
      ]);
    }
  }, [commentsOfMovieResponse, isSuccess, setCommentsOfMovie]);

  const currentUserAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <div className="min-h-screen bg-dark-400 p-5">
      <p className="mb-3 text-lg font-medium">Bình luận: </p>

      <CommentInput
        userAvatar={currentUserAvatar}
        placeholder="Viết bình luận"
        maxLength={1000}
        movieId={movieId}
      />

      {commentsOfMovie.map((comment) => (
        <CommentItem key={comment.commentId} {...comment} movieId={movieId} />
      ))}
      <p
        className="mt-5 text-base font-medium text-gray-500 hover:text-gray-300"
        onClick={handleLoadMoreComments}
      >
        Tải thêm bình luận
      </p>
    </div>
  );
};

export default CommentExample;
