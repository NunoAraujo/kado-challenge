import 'antd/dist/antd.css';

import { publicProvider } from 'wagmi/providers/public';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Space } from 'antd';
import Connection from './connection/connection';
import AssetsBalance from './assets-balance/assets-balance';

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require("buffer").Buffer; 

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Kado Challenge',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export function ConnectWallet() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Space direction="vertical" size="large" style={{padding: '1rem'}}>
          <Connection />
          <AssetsBalance />
        </Space>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default ConnectWallet;
