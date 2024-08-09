// src/components/Circle.jsx
import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost';
import CreateComment from './CreatePost';

const Community = ({ circleId, user }) => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const base = "http://127.0.0.1:7002/posts/fetch"
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(base, {
            method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ circleId }),
        });

        if (response.ok) {
          const postsData = await response.json();
          setPosts(postsData);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [circleId, user]);



  return (
    <div>
      <h2>{circleId}</h2>
      <CreatePost
        newPostTitle={newPostTitle}
        setNewPostTitle={setNewPostTitle}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
        author = {user.name}
        community = {circleId}
      />
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p><strong>作者:</strong> {post.author}</p> 
            <p dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            {post.images && post.images.map((image, index) => (
              <img key={index} src={image} alt={`Post Image ${index}`} style={{ maxWidth: '100%' }} />
            <CreateComment />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;


