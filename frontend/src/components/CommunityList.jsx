
import React, { useState, useEffect } from 'react';

const base = "http://127.0.0.1:7001/community/fetch"

const CommunityList = ({ user, onSelectCommunity }) => {
  const [Communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch(base, {
        //   headers: {
        //     Authorization: `Bearer ${user.name}`, 
        //   },
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
  const handleEnterCommunity = (name) => {
    onSelectCommunity(name);
  };

  return (
    <div>
      <h2>浏览兴趣圈</h2>
      <ul>
        {Communities.map((community, index) => (
          <li key={index}>
            {community.name+'  '}
            <button onClick={() => handleEnterCommunity(community.name)}>进入</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;



