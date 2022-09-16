import { render, screen } from '@testing-library/react';
import ConnectWalletProvider from '../connect-wallet-provider/connect-wallet-provider';
import Connection from './connection';
import { getConnectButton } from './connect-button/connect-button.utils';
import {
  getAccountButton,
  getChainButton,
} from './connection-management/connection-management.utils';

let mockAccount: unknown;
let mockChain: unknown;
let mockMounted = false;

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: ({ children }: { children: (data: unknown) => unknown }) =>
      children({
        account: mockAccount,
        chain: mockChain,
        mounted: mockMounted,
      }),
  },
  getDefaultWallets: () => ({ connectors: [] }),
  RainbowKitProvider: ({ children }: any) => children,
}));

describe('Connection', () => {
  const renderComponent = () =>
    render(
      <ConnectWalletProvider>
        <Connection />
      </ConnectWalletProvider>
    );

  const getConnectContainer = () => screen.getByTestId('connect-container');

  describe('when rendering component', () => {
    beforeEach(() => renderComponent());

    it('should have the container hidden', () => {
      expect(getConnectContainer().getAttribute('aria-hidden')).toBe('true');
      expect(getConnectContainer().getAttribute('style')).toBe(
        'opacity: 0; pointer-events: none; user-select: none;'
      );
    });
  });

  describe('when mounted', () => {
    beforeEach(() => {
      mockMounted = true;
      renderComponent();
    });

    it('should show the container and the connect button', () => {
      expect(getConnectContainer().getAttribute('aria-hidden')).toBe(null);
      expect(getConnectContainer().getAttribute('style')).toBe(null);
      expect(getConnectButton()).toBeTruthy();
    });

    afterEach(() => {
      mockMounted = false;
    });
  });

  describe('when connected', () => {
    beforeEach(() => {
      mockMounted = true;
      mockAccount = {};
      mockChain = {};
      renderComponent();
    });

    it('should show the container and the connection management buttons', () => {
      expect(getConnectContainer().getAttribute('aria-hidden')).toBe(null);
      expect(getConnectContainer().getAttribute('style')).toBe(null);
      expect(getChainButton()).toBeTruthy();
      expect(getAccountButton()).toBeTruthy();
    });

    afterEach(() => {
      mockMounted = false;
      mockAccount = undefined;
      mockChain = undefined;
    });
  });
});
