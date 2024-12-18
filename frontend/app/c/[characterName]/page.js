'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Character Page
export default function Char() {
  const { characterName } = useParams();
  const [characterData, setCharacterData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const [isMinimizedEquipment, setIsMinimizedEquipment] = useState(false);
  const [isMinimizedBuff, setIsMinimizedBuff] = useState(false);
  const [isMinimizedAvatar, setIsMinimizedAvatar] = useState(false);
  const [isMinimizedStats, setIsMinimizedStats] = useState(false);
  const [isMinimizedSkills, setIsMinimizedSkills] = useState(false);
  const [isMinimizedTraits, setIsMinimizedTraits] = useState(false);
  const [data, setData] = useState(null);

  const toggleMinimizeEquipment = () => setIsMinimizedEquipment(!isMinimizedEquipment);
  const toggleMinimizeBuff = () => setIsMinimizedBuff(!isMinimizedBuff);
  const toggleMinimizeAvatar = () => setIsMinimizedAvatar(!isMinimizedAvatar);
  const toggleMinimizeStats = () => setIsMinimizedStats(!isMinimizedStats);
  const toggleMinimizeSkills = () => setIsMinimizedSkills(!isMinimizedSkills);
  const toggleMinimizeTraits = () => setIsMinimizedTraits(!isMinimizedTraits);

  const fetchCharacterData = async (characterName) => {
    try {
      // Check if the environment is production or development
      const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  
      let data;
      
      if (environment === 'development') {
        // Load data from a local JSON file in development
        const res = await fetch(`/data/mockCharacterData.json`);
        if (!res.ok) {
          throw new Error('Failed to load mock data');
        }
        data = await res.json();
      } else {
        // Fetch data from live API in production
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/getchar/${characterName}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data from live API');
        }
        data = await res.json();
      }
  
      setCharacterData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    fetchCharacterData(characterName);
  }, [characterName]);

  if (error) return <div>Error: {error}</div>;
  if (!characterData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row m-8 main-content">
      <div className="min-w-80 max-w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg lg:sticky lg:top-16 rounded-lg lg:mr-8 mb-8 lg:mb-0">
        {/* Character Picture Window */}
        <h1>{characterData.characterName}</h1>
        <p>{characterData.jobGrowName}</p>
        <p>{characterData.level}</p>
      </div>
      <div className="flex-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg">
        <div className="p-4">
          <div className="mb-4">
            <div className="cursor-pointer bg-gray-800 p-2 rounded" onClick={toggleMinimizeEquipment}>
              Equipment
            </div>
            {!isMinimizedEquipment && (
              <div className="bg-stone-600 p-4 rounded shadow">
                <p>This is the content of Equipment.</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="cursor-pointer bg-gray-800 p-2 rounded" onClick={toggleMinimizeBuff}>
              Buff Swap
            </div>
            {!isMinimizedBuff && (
              <div className="bg-stone-600 p-4 rounded shadow">
                <p>This is the content of Buff Swap.</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="cursor-pointer bg-gray-800 p-2 rounded" onClick={toggleMinimizeAvatar}>
              Avatar
            </div>
            {!isMinimizedAvatar && (
              <div className="bg-stone-600 p-4 rounded shadow">
                <p>This is the content of Avatar.</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="cursor-pointer bg-gray-800 p-2 rounded" onClick={toggleMinimizeStats}>
              Stats
            </div>
            {!isMinimizedStats && (
              <div className="bg-stone-600 p-4 rounded shadow">
                <p>This is the content of Stats.</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="cursor-pointer bg-gray-800 p-2 rounded" onClick={toggleMinimizeSkills}>
              Skills
            </div>
            {!isMinimizedSkills && (
              <div className="bg-stone-600 p-4 rounded shadow">
                <p>This is the content of Skills.</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="cursor-pointer bg-gray-800 p-2 rounded" onClick={toggleMinimizeTraits}>
              Traits
            </div>
            {!isMinimizedTraits && (
              <div className="bg-stone-600 p-4 rounded shadow">
                <p>This is the content of Traits.</p>
              </div>
            )}
          </div>

          <div>
            {/* Display fetched data */}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
}