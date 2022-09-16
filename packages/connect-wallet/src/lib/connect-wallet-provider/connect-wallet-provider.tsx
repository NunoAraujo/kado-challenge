import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Kado Challenge',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export interface ConnectWalletProviderProps {
  children: ReactNode;
}

export function ConnectWalletProvider({
  children,
}: ConnectWalletProviderProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

export default ConnectWalletProvider;
