// src/components/CreateCircle.jsx
import React, { useState } from 'react';

const base = "http://127.0.0.1:7002/community/create"

const CreateCircle = ({ onCreateCircle }) => {
  const [circleName, setCircleName] = useState('');

  const handleCreateCircle = async () => {
    try {
      const response = await fetch(base, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: circleName }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) { 
          console.log('Community creation succeed');
        //   onLogin(data.data); 
        } else {
          // 登录失败，显示错误信息
          console.error(`Creation failed: ${data.message}`);
        }
      } else {
        // HTTP 请求失败，显示网络错误信息等
        console.error('HTTP request failed');
      }
    } catch (error) {
      console.error('Error creating circle:', error);
    }
  };

  return (
    <div>
      <h2>创建兴趣圈</h2>
      <input
        type="text"
        placeholder="Circle Name"
        value={circleName}
        onChange={(e) => setCircleName(e.target.value)}
      />
      <button onClick={handleCreateCircle}>确认</button>
    </div>
  );
};

export default CreateCircle;
