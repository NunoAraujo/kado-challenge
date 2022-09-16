import { render } from '@testing-library/react';
import ConnectWalletProvider from './connect-wallet-provider';

jest.mock('@rainbow-me/rainbowkit', () => ({
  getDefaultWallets: jest.fn(() => ({ connectors: [] })),
  RainbowKitProvider: jest.fn(),
}));

describe('ConnectWalletProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ConnectWalletProvider>Connect Wallet Content</ConnectWalletProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
