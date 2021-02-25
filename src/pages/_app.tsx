import { ChellengesProvider } from '../contexts/ChallengesContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChellengesProvider>
      <Component {...pageProps} />
    </ChellengesProvider>
  );
}

export default MyApp
