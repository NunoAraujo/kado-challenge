// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { ConnectWallet } from '@kado-challenge/connect-wallet';

export function App() {
  return (
    <div className={styles['container']}>
      <ConnectWallet />
    </div>
  );
}

export default App;
