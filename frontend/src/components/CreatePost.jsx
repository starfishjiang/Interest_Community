import React, { useState } from 'react';

const CreatePost = ({ newPostTitle, setNewPostTitle, newPostContent, setNewPostContent, author, community}) => {
  const [images, setImages] = useState([]); // 用于存储上传的多个图片
  const base = "http://127.0.0.1:7002/posts/create";
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    console.log(files);
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('title', newPostTitle);
    formData.append('content', newPostContent);
    formData.append('author', author);
    formData.append('community', community);
    const fileInput = document.querySelector('input[type="file"]');
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        formData.append('imagearray', files[i]);
    }
    try {
        // console.log(newPostContent, newPostContent, author, community);
      const response = await fetch(base, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newPostTitle, newPostContent, author, community}),
      });

    //     try {
    //   const response = await fetch(base, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${author}`,
    //     },
    //     body: FormData,
    //   });

      if (response.ok) {
        const data = await response.json();
        if (data.success) { 
          console.log('Post creation succeed');
        //   onLogin(data.data); 
        // const newPost = await response.json();
    //     // setPosts([...posts, newPost]);
    //     // setNewPostTitle('');
    //     // setNewPostContent('');
        } else {
          console.error(`Creation failed: ${data.message}`);
        }
      } else {
        console.error('HTTP request failed');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <textarea type="text" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} placeholder="Title" />
      <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Content" />
      {/* <input type="file" accept="image/*" multiple onChange={handleImageChange} /> */}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleCreatePost}>发布</button>
    </div>
  );
};

export default CreatePost;


