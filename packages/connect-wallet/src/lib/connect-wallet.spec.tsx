import { render } from '@testing-library/react';

import ConnectWallet from './connect-wallet';

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: jest.fn(),
  },
  getDefaultWallets: jest.fn(() => ({ connectors: [] })),
  RainbowKitProvider: jest.fn(),
}));

describe('ConnectWallet', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConnectWallet />);
    expect(baseElement).toBeTruthy();
  });
});