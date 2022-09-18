import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectWalletContext, ConnectWalletContextDefaultValue } from './connect-wallet-context';

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism],
  [publicProvider()]
);

export const { connectors } = getDefaultWallets({
  appName: 'Kado Challenge',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export interface ConnectWalletProviderProps {
  condensed?: boolean;
  itemsToShow?: number;
  children: ReactNode;
}

export function ConnectWalletProvider({
  condensed = ConnectWalletContextDefaultValue.condensed,
  itemsToShow = ConnectWalletContextDefaultValue.itemsToShow,
  children,
}: ConnectWalletProviderProps) {
  return (
    <ConnectWalletContext.Provider value={{ condensed, itemsToShow }}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </ConnectWalletContext.Provider>
  );
}

export default ConnectWalletProvider;
