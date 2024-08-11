
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CreateCircle from './components/CreateCircle';
import CommunityList from './components/CommunityList';
import Community from './components/Community';
import ActivationList from './components/ActivationList';
import MyActivation from './components/MyActivation';
import backgroundImage from './components/background.png';
import * as util_request from './request/util.request'

const App = () => {
  const [user, setUser] = useState(null); 
  const [CurrentCommunity, setCurrentCommunity] = useState(null);
  const [Activation, setActivation] = useState(null); 
  const [myActivation, setmyActivation] = useState(null); 
  const [title, setTitle] = useState("");

  const USER_KEY = 'jianghaixin_user';
  const COMMUNITY_KEY = 'jianghaixin_community'
  const ACTIVATION_KEY = 'jianghaixin_activation'
  const MYACTIVATION_KEY = 'jianghaixin_myactivation'
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
    const storedmyActivation = sessionStorage.getItem(MYACTIVATION_KEY);
    if (storedmyActivation) {
        setActivation(JSON.parse(storedmyActivation));
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

  const handleCreate = () => {
    window.location.reload();
  };

  const handleSelectCircle = (community) => {
    sessionStorage.setItem(COMMUNITY_KEY, JSON.stringify(community));
    setCurrentCommunity(community); 
  };

  const handleActivation = () => {
    sessionStorage.setItem(ACTIVATION_KEY, JSON.stringify(user));
    setActivation(user);
  };

  const handlemyActivation = () => {
    sessionStorage.setItem(MYACTIVATION_KEY, JSON.stringify(user));
    // console.log(user);
    setmyActivation(user);
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

  const handleReturnmyActivation = async () => {
    setmyActivation(null);
    sessionStorage.removeItem(MYACTIVATION_KEY);
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
          !myActivation ? ( 
                    <div>
          <button onClick={handleLogout} style={{ marginRight: '8px' }}>注销</button>
          <button onClick={handlemyActivation}>我的活跃度</button>
          <CreateCircle  onCreateCircle={handleCreate}/>
          <CommunityList user={user} onSelectCircle={handleSelectCircle} />
          </div>
          ) : (
            <div>
              <button onClick={handleReturnmyActivation}>返回</button>
              <MyActivation username={user.name} />
            </div>
          )

      ) : (
        !Activation ? ( 
            <div>
            <button onClick={handleReturn} style={{ marginRight: '8px' }}>返回</button>
            <button onClick={handleActivation}>活跃度排行</button>
            <Community community={CurrentCommunity} user={user} onCreate = {handleCreate}/>
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
