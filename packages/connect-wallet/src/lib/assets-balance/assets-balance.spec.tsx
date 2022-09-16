import { render } from '@testing-library/react';
import ConnectWalletProvider from '../connect-wallet-provider/connect-wallet-provider';

import AssetsBalance from './assets-balance';

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: jest.fn(),
  },
  getDefaultWallets: jest.fn(() => ({ connectors: [] })),
  RainbowKitProvider: jest.fn(),
}));

describe('AssetsBalance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ConnectWalletProvider>
        <AssetsBalance />
      </ConnectWalletProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
