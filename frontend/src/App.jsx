
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CreateCircle from './components/CreateCircle';
import CommunityList from './components/CommunityList';
import Community from './components/Community';
import ActivationList from './components/ActivationList';
import backgroundImage from './components/background.png';
import * as util_request from './request/util.request'

const App = () => {
  const [user, setUser] = useState(null); 
  const [CurrentCommunity, setCurrentCommunity] = useState(null);
  const [Activation, setActivation] = useState(null); 
  const [title, setTitle] = useState("");

  const USER_KEY = 'jianghaixin_user';
  const COMMUNITY_KEY = 'jianghaixin_community'
  const ACTIVATION_KEY = 'jianghaixin_activation'
  useEffect(() => {
    const storedUser = sessionStorage.getItem(USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCommunity = sessionStorage.getItem(COMMUNITY_KEY);
    if (storedCommunity) {
      setCurrentCommunity(JSON.parse(storedCommunity));
    }
    const storedActivation = sessionStorage.getItem(ACTIVATION_KEY);
    if (storedActivation) {
      setActivation(JSON.parse(storedActivation));
    }
  }, []);

  const handleLogin = (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user); 
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem(USER_KEY);
    setUser(null); 
    setCurrentCommunity(null); 
  };

  const handleSelectCircle = (community) => {
    sessionStorage.setItem(COMMUNITY_KEY, JSON.stringify(community));
    setCurrentCommunity(community); 
  };

  const handleActivation = () => {
    sessionStorage.setItem(ACTIVATION_KEY, JSON.stringify(CurrentCommunity));
    setActivation(CurrentCommunity);
  };

  const handleReturn = async () => {
    if(Activation){
        setActivation(null);
        sessionStorage.removeItem(ACTIVATION_KEY);
    }
    else{
        setCurrentCommunity(null);
        sessionStorage.removeItem(COMMUNITY_KEY)
    }
  };

  
  util_request.getTitle().then(result => {
    setTitle(result);
  })

  return (
    <div
     style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
        height: '100vh', 
        margin: 0, 
        padding: 0, 
        overflow: 'auto' 
    }}
    >
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
        !Activation ? ( 
            <div>
            <button onClick={handleReturn} style={{ marginRight: '8px' }}>返回</button>
            <button onClick={handleActivation}>活跃度排行</button>
            <Community community={CurrentCommunity} user={user} />
          </div>
          ) : (
            <div>
              <button onClick={handleReturn}>返回</button>
              <ActivationList community={CurrentCommunity} user={user} />
            </div>
          )
        
      )
        
      )}
    </div>
  );
};

export default App;
