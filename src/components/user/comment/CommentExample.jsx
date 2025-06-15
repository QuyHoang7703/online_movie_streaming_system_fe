import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { useGetCommentsQuery } from "@service/commentApi";
import { useSelector } from "react-redux";

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

  // Reset về page 1 khi có comment mới (RTK Query sẽ tự động refetch)
  const handleCommentCreated = () => {
    if (page !== 1) {
      setPage(1);
      setCommentsOfMovie([]); // Clear current comments để tránh hiển thị cũ
    }
  };

  useEffect(() => {
    if (isSuccess && commentsOfMovieResponse?.data?.result) {
      const newComments = commentsOfMovieResponse.data.result;

      setCommentsOfMovie((prev) => {
        // Reset lại danh sách khi page = 1 (comment mới được tạo)
        if (page === 1) {
          return newComments;
        }

        // Tạo một Set chứa các commentId đã có để kiểm tra trùng lặp nhanh hơn
        const existingIds = new Set(prev.map((comment) => comment.commentId));

        // Chỉ thêm những comment chưa tồn tại
        const uniqueNewComments = newComments.filter(
          (comment) => !existingIds.has(comment.commentId),
        );

        return [...prev, ...uniqueNewComments];
      });
    }
  }, [commentsOfMovieResponse, isSuccess, page]);

  // const currentUserAvatar =
  //   "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log({ userInfo_comment: userInfo });
  return (
    <div className="min-h-screen bg-dark-400 p-5">
      <p className="mb-3 text-lg font-medium">Bình luận: </p>

      <CommentInput
        userAvatar={userInfo?.avatarUrl}
        placeholder="Viết bình luận"
        maxLength={1000}
        movieId={movieId}
        onCommentSubmitted={handleCommentCreated}
      />

      {commentsOfMovie.map((comment) => (
        <CommentItem key={comment.commentId} {...comment} movieId={movieId} />
      ))}
      {commentsOfMovie.length > 0 && (
        <p
          className="mt-5 text-base font-medium text-gray-500 hover:text-gray-300"
          onClick={handleLoadMoreComments}
        >
          Tải thêm bình luận
        </p>
      )}
    </div>
  );
};

export default CommentExample;
