// src/components/CreatePost.jsx
import React from 'react';

const CreatePost = ({
  newPostTitle,
  setNewPostTitle,
  newPostContent,
  setNewPostContent,
  onCreatePost,
}) => {
  return (
    <div>
      <h3>Create New Post</h3>
      <input
        type="text"
        placeholder="Post Title"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      <textarea
        placeholder="Post Content"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
      ></textarea>
      <button onClick={onCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
