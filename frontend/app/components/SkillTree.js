// components/SkillTree.js
import React from "react";
import styles from "./SkillTree.module.css";

const SkillTree = ({ jobGrowName, skillData }) => {
  // Define the layouts for each class
  const layouts = {
    "Neo: Dragon Knight": [
      { id: "4e995a5ff20512f33d684dc87ee25395", gridColumn: 1, gridRow: 1 },
      null,
      null,
      null,
      { id: "b791c07a766fb2dd08ad9726058aecec", gridColumn: 5, gridRow: 1 },
      { id: "afe3e772827fcae485fd429c08b5d715", gridColumn: 2, gridRow: 2 },
      null,
      null,
      null,
      null,
    ],
    "Neo: Vanguard": [
      null,
      null,
      { id: "skill-4", gridColumn: 3, gridRow: 1 },
      null,
      null,
      { id: "skill-5", gridColumn: 1, gridRow: 2 },
      null,
      { id: "skill-6", gridColumn: 3, gridRow: 2 },
      null,
      null,
    ],
  };

  // Check if jobGrowName and layout are defined
  if (!jobGrowName || !layouts[jobGrowName]) {
    return null; // or return a loading indicator
  }

  const layout = layouts[jobGrowName];

  return (
    <div className={styles.skillTree}>
      {layout.map((cell, index) => {
        if (cell) {
          const skill = skillData.find((s) => s.skillId === cell.id);
          if (!skill) {
            console.error(`Skill with id ${cell.id} not found in skillData`);
            return null;
          }
          return (
            <div
              key={index}
              className={styles.skillIcon}
              style={{ gridColumn: cell.gridColumn, gridRow: cell.gridRow }}
            >
              <img
                src={`/skills/${skill.skillId}.png`}
                alt={skill.name}
                className={styles.skillImage}
              />
              <span className={styles.skillLevel}>{skill.level}</span>
            </div>
          );
        }
        return (
          <div
            key={index}
            className={styles.emptySlot}
            style={{ gridColumn: index % 5 + 1, gridRow: Math.floor(index / 5) + 1 }}
          />
        );
      })}
    </div>
  );
};

export default SkillTree;
