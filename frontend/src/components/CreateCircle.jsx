// src/components/CreateCircle.jsx
import React, { useState } from 'react';

const CreateCircle = ({ onCreateCircle }) => {
  const [circleName, setCircleName] = useState('');

  const handleCreateCircle = async () => {
    try {
      const response = await fetch('/api/circles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: circleName }),
      });

      if (response.ok) {
        const newCircle = await response.json();
        onCreateCircle(newCircle);
      } else {
        console.error('Circle creation failed');
      }
    } catch (error) {
      console.error('Error creating circle:', error);
    }
  };

  return (
    <div>
      <h2>Create Circle</h2>
      <input
        type="text"
        placeholder="Circle Name"
        value={circleName}
        onChange={(e) => setCircleName(e.target.value)}
      />
      <button onClick={handleCreateCircle}>Create Circle</button>
    </div>
  );
};

export default CreateCircle;
