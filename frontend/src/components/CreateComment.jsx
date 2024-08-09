// src/components/CreateComment.jsx
import React, { useState } from 'react';

const base = "http://127.0.0.1:7002/posts/comment"

const CreateComment = ({ author, community, index }) => {
  const [CommentContent, setCommentContent] = useState('');

  const handleCreateComment = async () => {
    try {
      const response = await fetch(base, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: CommentContent , author, community, index}),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) { 
          console.log('Comment creation succeed');
        //   onLogin(data.data); 
        } else {
          // 登录失败，显示错误信息
          console.error(`Creation failed: ${data.message}`);
        }
      } else {
        // HTTP 请求失败，显示网络错误信息等
        console.error('HTTP request failed');
      }
    } catch (error) {
      console.error('Error creating Comment:', error);
    }
  };


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <h3 style={{ marginRight: '10px' }}>评论</h3>
    <input
      type="text"
      placeholder="Content"
      value={CommentContent}
      onChange={(e) => setCommentContent(e.target.value)}
    />
    <button onClick={handleCreateComment}>确认</button>
    </div>
  );
};

export default CreateComment;