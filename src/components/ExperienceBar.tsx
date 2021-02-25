import { useContext, useMemo } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
  const { level, currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = useMemo(() => {
    return Math.floor(currentExperience * 100) / experienceToNextLevel;
  }, [currentExperience, experienceToNextLevel]);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span 
          className={styles.currentExperience} 
          style={{ left: `${percentToNextLevel}%` }}
          >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}