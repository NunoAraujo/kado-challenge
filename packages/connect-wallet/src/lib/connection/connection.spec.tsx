import { render } from '@testing-library/react';
import ConnectWalletProvider from '../connect-wallet-provider/connect-wallet-provider';
import Connection from './connection';

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: jest.fn(),
  },
  getDefaultWallets: jest.fn(() => ({ connectors: [] })),
  RainbowKitProvider: jest.fn(),
}));

describe('Connection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ConnectWalletProvider>
        <Connection />
      </ConnectWalletProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
