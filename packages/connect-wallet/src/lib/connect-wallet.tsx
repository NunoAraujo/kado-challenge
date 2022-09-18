import 'antd/dist/antd.css';
import { Space } from 'antd';
import Connection from './connection/connection';
import AssetsBalance from './assets-balance/assets-balance';
import ConnectWalletProvider from './connect-wallet-provider/connect-wallet-provider';

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer;

export interface ConnectWalletProps {
  condensed?: boolean;
  itemsToShow?: number;
}

export function ConnectWallet({
  condensed,
  itemsToShow,
}: ConnectWalletProps) {
  return (
    <ConnectWalletProvider {...{ condensed, itemsToShow }}>
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', padding: '1rem' }}
      >
        <Connection />
        <AssetsBalance />
      </Space>
    </ConnectWalletProvider>
  );
}

export default ConnectWallet;
