import { useCallback, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { handleResetCountdown } = useContext(CountdownContext);
  const { 
    activeChallenge, 
    resetChallenge, 
    completeChallenge 
  } = useContext(ChallengesContext);

  const hanleChallengeSucceeded = useCallback(() => {
    completeChallenge();
    handleResetCountdown();
  }, [completeChallenge, handleResetCountdown]);

  const handleChanllengeFailed = useCallback(() => {
    resetChallenge();
    handleResetCountdown();
  }, [resetChallenge, handleResetCountdown]);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button" 
              className={styles.challengeFailedButton}
              onClick={handleChanllengeFailed}
            >
              Falhei
            </button>

            <button 
              type="button" 
              className={styles.challengeSucceedButton}
              onClick={hanleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
      )}      
    </div>
  );
}