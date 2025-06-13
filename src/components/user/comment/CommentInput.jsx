import React, { useState } from "react";
import { Input, Button, Avatar, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "./CommentInput.css";
import { useCreateCommentMutation } from "@service/commentApi";
import { useNotification } from "@hooks/useNotification";

const { TextArea } = Input;

const CommentInput = ({
  userAvatar,
  placeholder = "Viết bình luận",
  maxLength = 1000,
  movieId,
  parentCommentId = null,
  width = "100%",
  handleShowRepliesAfterSubmit,
}) => {
  const [comment, setComment] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    const commentData = {
      comment: comment.trim(),
      parentCommentId,
    };
    console.log({ commentData });
    try {
      await createComment({ movieId, comment: commentData }).unwrap();
      setComment("");
      showNotification("success", "Bình luận đã được gửi thành công!");

      // Show replies after successful submission if it's a reply
      if (parentCommentId && handleShowRepliesAfterSubmit) {
        handleShowRepliesAfterSubmit();
      }
    } catch {
      showNotification("error", "Bạn phải đăng nhập để bình luận");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className={`comment-input-antd ${width}`}>
      <TextArea
        placeholder={placeholder}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyPress}
        maxLength={maxLength}
        showCount={{
          formatter: ({ count, maxLength }) => `${count} / ${maxLength}`,
        }}
        autoSize={{ minRows: 3, maxRows: 6 }}
        className="comment-textarea-antd"
      />

      <div className="comment-input-footer">
        <Space align="center">
          {userAvatar && (
            <Avatar src={userAvatar} size={28} className="user-avatar-antd" />
          )}

          {/* {showSpoilerToggle && (
            <Checkbox
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
              className="spoiler-checkbox-antd"
            >
              Tiết lộ?
            </Checkbox>
          )} */}
        </Space>

        <Button
          type={comment.trim() ? "primary" : "default"}
          icon={<SendOutlined />}
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className="send-button-antd"
          loading={isLoading}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
