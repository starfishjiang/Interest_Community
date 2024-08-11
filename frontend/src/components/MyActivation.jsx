
import React, { useState, useEffect } from 'react';

const base = "http://127.0.0.1:7002/api/activation"

const MyActivation = ({username}) => {
    
  const [users, setUsers] = useState([]);
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
                // console.log(users);
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




    const sortedUsers = [];

//   users.forEach(user => {
//     if (Array.isArray(user.activation)) {
    //   let activationNumber = null;
    //   user.activation.forEach(a => {
    //     if (a.community === community) {
    //       activationNumber = a.number;
    //     }
    //   });

    // if (activationNumber !== null) {
    //     sortedUsers.push({
    //       name: user.username,
    //       activationNumber: activationNumber
    //     });
    //     }
    // }
//   });

//   sortedUsers.sort((a, b) => b.activationNumber - a.activationNumber);

    return (
      <div>
        <h2>{username}的活跃度</h2>
        {/* <ul>
          {sortedUsers.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong>: {user.activationNumber}
            </li>
          ))}
        </ul> */}
      </div>
    );
};

export default MyActivation;