
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CreateCircle from './components/CreateCircle';
import CircleList from './components/CircleList';
import Circle from './components/Circle';
import * as util_request from './request/util.request'
import * as websocket_client from './request/client.websocket'

const App = () => {
  const [user, setUser] = useState(null); // 用户状态，如果登录成功会有用户信息
  const [currentCircleId, setCurrentCircleId] = useState(null); // 当前选择的圈子ID
  const [title, setTitle] = useState("");

  const handleLogin = (user) => {
    setUser(user); // 设置登录后的用户信息;
  };
  
  const handleLogout = () => {
    setUser(null); // 登出操作，清空用户信息
    setCurrentCircleId(null); // 同时清空当前选择的圈子ID
  };

  const handleSelectCircle = (circleId) => {
    setCurrentCircleId(circleId); // 选择某个圈子后，更新当前圈子ID
  };

  const handleCreateCircle = async (circleName) => {
    try {
      const response = await fetch('/api/circles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // 假设登录后返回了用户token
        },
        body: JSON.stringify({ name: circleName }),
      });
  
      if (response.ok) {
        const newCircle = await response.json();
        // 在这里可能需要更新圈子列表或者执行其他相关操作
        console.log('Circle created:', newCircle);
      } else {
        console.error('Failed to create circle');
      }
    } catch (error) {
      console.error('Error creating circle:', error);
    }
  };
  

  // 在App组件中传递给CreateCircle组件
  <CreateCircle onCreateCircle={handleCreateCircle} />
  
  util_request.getTitle().then(result => {
    setTitle(result);
  })

  return (
    <div>
      <h1>{title}{user ? `, ${user.name}` : ''}</h1>
      {!user ? (
        <div>
          <Login onLogin={handleLogin} />
          <Register />
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>注销</button>
          <CreateCircle onCreateCircle={handleCreateCircle} />
          <CircleList user={user} onSelectCircle={handleSelectCircle} />
          {currentCircleId && <Circle circleId={currentCircleId} user={user} />}
        </div>
      )}
    </div>
  );
};

export default App;


