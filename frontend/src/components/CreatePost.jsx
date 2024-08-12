import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ newPostTitle, setNewPostTitle, newPostContent, setNewPostContent, author, community, onCreatePost}) => {
  const [images, setImages] = useState([]); // 用于存储上传的多个图片
  const database = "http://127.0.0.1:7001/posts/create";
  const imagebase = "http://127.0.0.1:7001/posts/upload";
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    console.log(files);
  };

  const handleCreatePost = async () => {
    if(newPostContent && newPostTitle){
        const formData = new FormData();

        let imageUrls = [];
        if (images.length > 0) {
          const formData = new FormData();
          for (const image of images) {
            formData.append('files', image);
          }
          try {
            const UploadResponse = await axios.post(imagebase, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            imageUrls = UploadResponse.data.urls;
          } catch (error) {
            console.error('Failed to upload images');
            return;
          }
        }
    
        try {
            const postResponse = await fetch(database, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({newPostTitle, newPostContent, author, community, imageUrls}),
                files:formData,
            });
    
            if (postResponse.ok) {
                const data = await postResponse.json();
                if (data.success) { 
                console.log('Post creation succeed');
                if (onCreatePost) {
                    onCreatePost(); 
                  }
                } else {
                console.error(`Creation failed: ${data.message}`);
                }  
            } else {
                console.error('HTTP request failed');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }
  };

  return (
    <div>
      <textarea type="text" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} placeholder="Title" />
      <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Content" />
      <br />
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <button onClick={handleCreatePost}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发&nbsp;&nbsp;&nbsp;贴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
        </button>
    </div>
  );
};

export default CreatePost;


