
import React, { useState, useEffect } from 'react';

const base = "http://127.0.0.1:7001/api/activation"

const ActivationList = ({ community }) => {
    
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  useEffect(() => {
    const fetchActivation = async () => {
      try {
        const response = await fetch(base, {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({ community }),
        });
        if (response.ok) {
            // console.log(response)
            const data = await response.json(); 
            if (data.success) { 
                
                setUsers(data.data);
              } else {
                console.error(`Failed to fetch Activation: ${response.message}`);
              }
          
        } else {
          console.error('Failed to fetch Activation');
        }
      } catch (error) {
        console.error('Error fetching Activaiton:', error);
        
      }
    };

    fetchActivation();
  }, []); 


  useEffect(() => {
    const sorted = users
      .map(user => {
        if (Array.isArray(user.activation)) {
          const activation = user.activation.find(a => a.community === community);
          return activation ? { name: user.username, activationNumber: activation.number } : null;
        }
        return null;
      })
      .filter(user => user !== null) 
      .sort((a, b) => b.activationNumber - a.activationNumber);

    setSortedUsers(sorted);
  }, [users, community]);

    return (
      <div>
        <h2>{community}圈活跃度</h2>
        <ul>
          {sortedUsers.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong>: {user.activationNumber}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default ActivationList;