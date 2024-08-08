// src/components/Circle.jsx
import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost';

const Community = ({ circleId, user }) => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const base = "http://127.0.0.1:7002/posts/fetch"
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(base, {
          headers: {
            Authorization: `Bearer ${user.name}`,
          },
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
      <h2>Posts in Circle {circleId}</h2>
      <CreatePost
        newPostTitle={newPostTitle}
        setNewPostTitle={setNewPostTitle}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
        author = {user.name}
        community = {circleId}
      />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.images && post.images.map((image, index) => (
              <img key={index} src={image} alt={`Post Image ${index}`} style={{ maxWidth: '100%' }} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;


