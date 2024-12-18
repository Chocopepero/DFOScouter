'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SkillTree from '../../components/SkillTree';

// Character Page
export default function Char() {
  const { characterName } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [skillData, setSkillData] = useState(null);
  const [error, setError] = useState(null);

  const [isMinimizedEquipment, setIsMinimizedEquipment] = useState(false);
  const [isMinimizedBuff, setIsMinimizedBuff] = useState(false);
  const [isMinimizedAvatar, setIsMinimizedAvatar] = useState(false);
  const [isMinimizedStats, setIsMinimizedStats] = useState(false);
  const [isMinimizedSkills, setIsMinimizedSkills] = useState(false);
  const [isMinimizedTraits, setIsMinimizedTraits] = useState(false);

  const toggleMinimizeEquipment = () => setIsMinimizedEquipment(!isMinimizedEquipment);
  const toggleMinimizeBuff = () => setIsMinimizedBuff(!isMinimizedBuff);
  const toggleMinimizeAvatar = () => setIsMinimizedAvatar(!isMinimizedAvatar);
  const toggleMinimizeStats = () => setIsMinimizedStats(!isMinimizedStats);
  const toggleMinimizeSkills = () => setIsMinimizedSkills(!isMinimizedSkills);
  const toggleMinimizeTraits = () => setIsMinimizedTraits(!isMinimizedTraits);

  const fetchSkillData = async (characterId) => {
    try {
      console.log(`Fetching skill data for characterId: ${characterId}`);
      let data;
      const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

      if (environment === 'development') {
        const res = await fetch(`/data/mockSkillData.json`);
        if (!res.ok) {
          throw new Error('Failed to load mock data');
        }
        data = await res.json();
      } else {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/getskills/${characterId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data from live API');
        }
        data = await res.json();
      }
      // Combine active and passive skills into a single array
      const combinedSkills = [...data.skill.style.active, ...data.skill.style.passive];
      setSkillData(combinedSkills);
    } catch (err) {
      console.error('Error fetching skill data:', err);
      setError(err.message);
    }
  };

  const fetchCharacterData = async (characterName) => {
    try {
      console.log(`Fetching character data for characterName: ${characterName}`);
      const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

      let data;

      if (environment === 'development') {
        const res = await fetch(`/data/mockCharacterData.json`);
        if (!res.ok) {
          throw new Error('Failed to load mock data');
        }
        data = await res.json();
      } else {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/getchar/${characterName}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data from live API');
        }
        data = await res.json();
      }

      console.log('Character data fetched:', data);
      const character = data.rows[0]; // Extract the first character from the rows array
      setCharacterData(character);
      if (character.characterId) {
        console.log(`Character ID: ${character.characterId}`);
        fetchSkillData(character.characterId);
      } else {
        console.log('Character ID not found');
      }
    } catch (err) {
      console.error('Error fetching character data:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    console.log(`useEffect called with characterName: ${characterName}`);
    fetchCharacterData(characterName);
  }, [characterName]);

  if (error) return <div>Error: {error}</div>;
  if (!characterData || !skillData) return <div>Loading...</div>;

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
                <SkillTree jobGrowName={characterData.jobGrowName} skillData={skillData} />
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
            {characterData && <pre>{JSON.stringify(characterData, null, 2)}</pre>}
            {skillData && <pre>{JSON.stringify(skillData, null, 2)}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
}