
import React, { useState, useEffect } from 'react';

const base = "http://127.0.0.1:7001/api/activation"

const MyActivation = ({username}) => {
    
  const [users, setUsers] = useState([]);
  const [sortedActivation, setSortedActivation] = useState([]);
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
    const activation = users.find(a => a.username === username)?.activation || [];
    activation.sort((a, b) => b.number - a.number);
    

    setSortedActivation(activation);
  }, [users, username]);

    return (
      <div>
        <h2>{username}的活跃度</h2>
        <ul>
          {sortedActivation.map((activation, index) => (
            <li key={index}>
              <strong>{activation.community}</strong>: {activation.number}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default MyActivation;