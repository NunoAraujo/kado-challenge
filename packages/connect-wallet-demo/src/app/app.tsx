// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { ConnectWallet } from '@nunoaraujo/connect-wallet';
import { useEffect, useState } from 'react';

const getWidowSize = () => ({width: window.innerWidth, height: window.innerHeight});

export function App() {
  const [windowSize, setWindowSize] = useState(getWidowSize());

  useEffect(() => {
    const handleWindowResize = () => setWindowSize(getWidowSize());

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  
  return (
    <div className={styles['container']}>
      <ConnectWallet condensed={windowSize.width < 768}  itemsToShow={windowSize.width < 768 ? 4 : 6}/>
    </div>
  );
}

export default App;
