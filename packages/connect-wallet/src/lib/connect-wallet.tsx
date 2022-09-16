import 'antd/dist/antd.css';
import { Space } from 'antd';
import Connection from './connection/connection';
import AssetsBalance from './assets-balance/assets-balance';
import ConnectWalletProvider from './connect-wallet-provider/connect-wallet-provider';

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer;

export function ConnectWallet() {
  return (
    <ConnectWalletProvider>
      <Space direction="vertical" size="large" style={{ padding: '1rem' }}>
        <Connection />
        <AssetsBalance />
      </Space>
    </ConnectWalletProvider>
  );
}

export default ConnectWallet;
