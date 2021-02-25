import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  handleStartCountDown: () => void;
  handleResetCountdown: () => void;
}

interface CountdownProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProps) {
  const { startNewChanllenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChanllenge();
    }

  }, [isActive, time]);

  const handleStartCountDown = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleResetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
    setHasFinished(false);
  }, []);
  
  return (
    <CountdownContext.Provider 
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        handleStartCountDown,
        handleResetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
