import styles from './connect-wallet.module.scss';

/* eslint-disable-next-line */
export interface ConnectWalletProps {}

export function ConnectWallet(props: ConnectWalletProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ConnectWallet!</h1>
    </div>
  );
}

export default ConnectWallet;
