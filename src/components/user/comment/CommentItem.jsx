import React, { useState } from "react";
import { Avatar, Button, Space, Typography } from "antd";
import { LikeOutlined, LikeFilled, MessageOutlined } from "@ant-design/icons";
import "./CommentItem.css";
import dayjs from "dayjs";
import CommentInput from "./CommentInput";

const { Text } = Typography;

const CommentItem = ({
  id,
  avatar,
  name,
  comment,
  createdAt,
  replyCount = 0,
  replies = [],
  movieId,
  onLike,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  // Ensure replies is always an array
  const safeReplies = Array.isArray(replies) ? replies : [];

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) onLike();
  };

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  // Function to show replies after successful comment submission
  const handleShowRepliesAfterSubmit = () => {
    setShowReplies(true);
    setShowCommentInput(false);
  };

  return (
    <div className="comment-item-antd">
      <div className="comment-content-antd">
        <Avatar src={avatar} size={40} className="comment-avatar-antd" />

        <div className="comment-details-antd">
          <Space size={8} className="comment-header-antd">
            <Text strong className="comment-username-antd">
              {name}
            </Text>
            <Text type="secondary" className="comment-time-antd">
              • {dayjs(createdAt).fromNow()}
            </Text>
          </Space>

          <Text className="comment-text-antd">{comment}</Text>

          <Space size={16} className="comment-actions-antd">
            <Button
              type="text"
              size="small"
              icon={isLiked ? <LikeFilled /> : <LikeOutlined />}
              onClick={handleLike}
              className={`action-btn-antd like-btn-antd ${
                isLiked ? "liked" : ""
              }`}
            >
              {1}
            </Button>

            <Button
              type="text"
              size="small"
              icon={<MessageOutlined size={16} />}
              onClick={handleToggleCommentInput}
              className="action-btn-antd reply-btn-antd"
            >
              Trả lời
            </Button>
          </Space>

          {showCommentInput && (
            <div className="comment-replies-antd">
              <CommentInput
                parentCommentId={id}
                movieId={movieId}
                width={200}
                handleShowRepliesAfterSubmit={handleShowRepliesAfterSubmit}
                placeholder="Viết phản hồi..."
              />
            </div>
          )}

          {replyCount > 0 && (
            <div>
              <Button
                type="link"
                size="small"
                onClick={handleToggleReplies}
                className="show-replies-btn-antd"
              >
                {showReplies
                  ? "Ẩn phản hồi"
                  : `Xem thêm ${replyCount} phản hồi`}
              </Button>
            </div>
          )}
        </div>
      </div>

      {showReplies && (
        <div className="comment-replies-antd">
          {safeReplies.map((reply, index) => (
            <CommentItem key={index} movieId={movieId} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
