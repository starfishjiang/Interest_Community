
import React, { useState, useEffect } from 'react';

const base = "http://127.0.0.1:7002/api/activation"

const ActivationList = ({ community }) => {
    
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchActivation = async () => {
      try {
        const response = await fetch(base, {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/json',
            // },
            body: JSON.stringify({ community }),
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
//   const handleEnterCircle = (name) => {
//     onSelectCircle(name);
//   };


  const sortedUsers = users
  .filter(user => {
    const activationIndex = user.activation.findIndex(a => a.community === community);
    return activationIndex !== -1;
  })
  .map(user => {
    const activationIndex = user.activation.findIndex(a => a.community === community);
    return {
      name: user.username,
      activationNumber: user.activation[activationIndex].number
    };
  })
  .sort((a, b) => b.activationNumber - a.activationNumber);
  
    return (
      <div>
        <h2>Users in {community} (Sorted by Activity)</h2>
        <ul>
          {sortedUsers.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong>: {user.activationNumber}
            </li>
          ))}
        </ul>
      </div>
    );


//   return (
//     <div>
//       <h2>{community}圈活跃度</h2>
//       <ul>
//         {users.map((community, index) => (
//           <li key={index}>
//             {community.name+'  '}
//             <button onClick={() => handleEnterCircle(community.name)}>进入</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
};

export default ActivationList;