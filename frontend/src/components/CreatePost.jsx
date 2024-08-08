import React, { useState } from 'react';

const CreatePost = ({ newPostTitle, setNewPostTitle, newPostContent, setNewPostContent, author, community}) => {
  const [images, setImages] = useState([]); // 用于存储上传的多个图片
  const base = "http://127.0.0.1:7002/posts/create";
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    console.log(files);
  };
//   const handleCreate = () => {
//     // 构建带有多个图片的数据对象
//     const formData = new FormData();
//     formData.push('title', newPostTitle);
//     formData.push('content', newPostContent);
//     images.forEach((image, index) => {
//       formData.push(`image${index}`, image);
//     });
    
//     // 调用父组件的处理函数来创建帖子
//     onCreatePost(formData);
//   };

  const handleCreatePost = async (user) => {
    const formData = [];
    formData.push('title', newPostTitle);
    formData.push('content', newPostContent);
    formData.push('author', author);
    formData.push('community', community);
    const imagearray = [];
    images.forEach((image, index) => {
      imagearray.push(`image${index}`, image);
    });
    formData.push('images', imagearray);
    try {
      const response = await fetch(base, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${author}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Post creation succeed');
        // const newPost = await response.json();
        // setPosts([...posts, newPost]);
        // setNewPostTitle('');
        // setNewPostContent('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <textarea type="text" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} placeholder="Post Title" />
      <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Post Content" />
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;


