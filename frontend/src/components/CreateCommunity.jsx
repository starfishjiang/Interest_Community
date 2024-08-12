
import React, { useState } from 'react';

const base = "http://127.0.0.1:7001/community/create"

const CreateCommunity = ({ onCreateCommunity }) => {
  const [communityName, setCommunityName] = useState('');

  const handleCreateCommunity = async () => {
    if(communityName){
        try {
            const response = await fetch(base, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: communityName }),
            });
            if (response.ok) {
              const data = await response.json();
              if (data.success) { 
                console.log('Community creation succeed');
                if (onCreateCommunity) {
                  onCreateCommunity(); 
                }
              } else {
                console.error(`Creation failed: ${data.message}`);
              }
            } else {
              console.error('HTTP request failed');
            }
          } catch (error) {
            console.error('Error creating community:', error);
          }
    }
    
  };

  return (
    <div>
      <h2>创建兴趣圈</h2>
      <input
        type="text"
        placeholder="Community Name"
        value={communityName}
        onChange={(e) => setCommunityName(e.target.value)}
      />
      <button onClick={handleCreateCommunity}>确认</button>
    </div>
  );
};

export default CreateCommunity;
