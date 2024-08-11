
import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost';
import CreateComment from './CreateComment';

const Community = ({ community, user, onCreate }) => {
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
          body: JSON.stringify({ community }),
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
  }, [community, user]);

  const handleCreate = () => {
    if (onCreate) {
        onCreate(); 
      }
  };

  return (
    <div>
      <h2>{community}</h2>
      <CreatePost
        newPostTitle={newPostTitle}
        setNewPostTitle={setNewPostTitle}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
        author = {user.name}
        community = {community}
        onCreatePost={handleCreate}
      />
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p><strong>作者:</strong> {post.author}</p> 
            <p dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            {post.images && post.images.map((image, index) => (
                <div key={index}>
              <img key={index} src={image} alt={`Post Image ${index}`} style={{ maxWidth: '50%' }} />
              <br />
              </div>
            )
            )}
            <CreateComment author={user.name} community={community} index={index} onCreateComment={handleCreate}/>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
            {(post.comments).map((comment, index) => (
              <li key={index}style={{ marginBottom: '8px' }} >
            <span><strong>{comment.author}: </strong>  </span> 
            <span style={{ margin: 0, whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br />') }} />
            
             </li>
            ))}
            </ul>
          </li>
          
        ))}
        </ul>
      
    </div>
  );
};

export default Community;


