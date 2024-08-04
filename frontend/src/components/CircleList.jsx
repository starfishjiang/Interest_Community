// src/components/CircleList.jsx
import React, { useState, useEffect } from 'react';

const CircleList = ({ user }) => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        const response = await fetch('/api/circles', {
          headers: {
            Authorization: `Bearer ${user.token}`, // 假设登录后返回了用户token
          },
        });

        if (response.ok) {
          const circlesData = await response.json();
          setCircles(circlesData);
        } else {
          console.error('Failed to fetch circles');
        }
      } catch (error) {
        console.error('Error fetching circles:', error);
      }
    };

    fetchCircles();
  }, [user]);

  return (
    <div>
      <h2>Circle List</h2>
      <ul>
        {circles.map(circle => (
          <li key={circle.id}>
            <a href={`/circle/${circle.id}`}>{circle.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CircleList;
