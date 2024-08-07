// src/components/communityList.jsx
import React, { useState, useEffect } from 'react';

const base = "http://127.0.0.1:7002/community/fetch"

const CommunityList = ({ user, onSelectCircle }) => {
  const [Communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch(base, {
          headers: {
            Authorization: `Bearer ${user.name}`, // 假设登录后返回了用户token
          },
        });

        if (response.ok) {
          const CommunitiesData = await response.json(); 
          setCommunities(CommunitiesData);
        } else {
          console.error('Failed to fetch Communities');
        }
      } catch (error) {
        console.error('Error fetching Communities:', error);
      }
    };

    fetchCommunities();
  }, [user]); 
  const handleEnterCircle = (name) => {
    // 这里可以执行进入圈子的逻辑，例如导航到相应的圈子页面等
    onSelectCircle(name);
  };

  return (
    <div>
      <h2>浏览兴趣圈</h2>
      <ul>
        {Communities.map((community, index) => (
          <li key={index}>
            {community.name+'  '}
            <button onClick={() => handleEnterCircle(community.name)}>进入</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;



