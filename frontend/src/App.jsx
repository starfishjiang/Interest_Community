
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CreateCircle from './components/CreateCircle';
import CommunityList from './components/CommunityList';
import Community from './components/Community';
import * as util_request from './request/util.request'

const App = () => {
  const [user, setUser] = useState(null); // 用户状态，如果登录成功会有用户信息
  const [CurrentCommunity, setCurrentCommunity] = useState(null); // 当前选择的圈子ID
  const [title, setTitle] = useState("");

  const USER_KEY = 'jianghaixin_user';
  const COMMUNITY_KEY = 'jianghaixin_community'
  useEffect(() => {
    const storedUser = sessionStorage.getItem(USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCircleId = sessionStorage.getItem(COMMUNITY_KEY);
    if (storedCircleId) {
      setCurrentCommunity(JSON.parse(storedCircleId));
    }
  }, []);

  const handleLogin = (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user); // 设置登录后的用户信息;
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem(USER_KEY);
    setUser(null); // 登出操作，清空用户信息
    setCurrentCommunity(null); // 同时清空当前选择的圈子ID
  };

  const handleSelectCircle = (circleId) => {
    sessionStorage.setItem(COMMUNITY_KEY, JSON.stringify(circleId));
    setCurrentCommunity(circleId); // 选择某个圈子后，更新当前圈子ID
  };

  const handleReturnToCommunities = async () => {
    setCurrentCommunity(null);
    sessionStorage.removeItem(COMMUNITY_KEY);
  };
  

  // 在App组件中传递给CreateCircle组件
//   <CreateCircle onCreateCircle={handleCreateCircle} />
  
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
      ) : (!CurrentCommunity ? ( 
        <div>
          <button onClick={handleLogout}>注销</button>
          <CreateCircle  />
          <CommunityList user={user} onSelectCircle={handleSelectCircle} />
        </div>
      ) : (
        <div>
          <button onClick={handleReturnToCommunities}>返回</button>
          {CurrentCommunity && <Community circleId={CurrentCommunity} user={user} />}
        </div>
      )
        
      )}
    </div>
  );
};

export default App;
