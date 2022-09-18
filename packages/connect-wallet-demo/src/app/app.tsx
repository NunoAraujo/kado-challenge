// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { ConnectWallet } from '@nunoaraujo/connect-wallet';

export function App() {
  return (
    <div className={styles['container']}>
      <ConnectWallet />
    </div>
  );
}

export default App;
