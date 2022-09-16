import { render } from '@testing-library/react';
import ConnectWalletProvider from '../../connect-wallet-provider/connect-wallet-provider';
import { Token } from '../tokens';

import TokenListItem from './token-list-item';

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: jest.fn(),
  },
  getDefaultWallets: jest.fn(() => ({ connectors: [] })),
  RainbowKitProvider: jest.fn(),
}));

describe('TokenListItem', () => {
  const token = {} as Token;

  it('should render successfully', () => {
    const { baseElement } = render(
      <ConnectWalletProvider>
        <TokenListItem {...{ token }} />
      </ConnectWalletProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
