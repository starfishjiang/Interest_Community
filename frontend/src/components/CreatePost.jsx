import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ newPostTitle, setNewPostTitle, newPostContent, setNewPostContent, author, community}) => {
  const [images, setImages] = useState([]); // 用于存储上传的多个图片
  const database = "http://127.0.0.1:7002/posts/create";
  const imagebase = "http://127.0.0.1:7002/posts/upload";
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    console.log(files);
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    // formData.append('title', newPostTitle);
    // formData.append('content', newPostContent);
    // formData.append('author', author);
    // formData.append('community', community);

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
    //   const postResponse = await axios.post(database, {
    //     content,
    //     creator: user.username,
    //     circleId: Number(circleId),
    //     imageUrls,
    //   });

        if (response.ok) {
            const data = await postResponse.json();
            if (data.success) { 
            console.log('Post creation succeed');
            } else {
            console.error(`Creation failed: ${data.message}`);
            }  
        } else {
            console.error('HTTP request failed');
        }
    } catch (error) {
        console.error('Error creating post:', error);
    }


//     const fileInput = document.querySelector('input[type="file"]');
//     const files = fileInput.files;
//     for (let i = 0; i < files.length; i++) {
//         formData.append('imagearray', files[i]);
//     }
//     try {
//         // console.log(newPostContent, newPostContent, author, community);
//       const response = await fetch(base, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({newPostTitle, newPostContent, author, community}),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) { 
//           console.log('Post creation succeed');
//         } else {
//           console.error(`Creation failed: ${data.message}`);
//         }
//       } else {
//         console.error('HTTP request failed');
//       }
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }


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


