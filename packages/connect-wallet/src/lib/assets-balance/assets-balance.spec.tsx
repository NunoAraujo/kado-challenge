import { act, render, screen } from '@testing-library/react';
import {
  ConnectWalletContext,
  ConnectWalletContextDefaultValue,
} from '../connect-wallet-provider/connect-wallet-context';
import AssetsBalance, {
  searchTokensPlaceHolder,
  unsupportedChainErrorMsg,
} from './assets-balance';
import { itemHeight } from './token-list-item/token-list-item';

const mockAccount = {
  isConnected: false,
};

const mockNetwork = {
  chain: { unsupported: true },
};

const mockTokens = [{ address: 'testTokenAddress' }];
const mockConnectWalletContext = ConnectWalletContextDefaultValue;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('wagmi', () => ({
  useAccount: () => mockAccount,
  useNetwork: () => mockNetwork,
  useBalance: () => ({}),
}));

jest.mock('./tokens', () => ({
  getTokens: () => mockTokens,
}));

describe('AssetsBalance', () => {
  const renderComponent = () =>
    render(
      <ConnectWalletContext.Provider value={mockConnectWalletContext}>
        <AssetsBalance />
      </ConnectWalletContext.Provider>
    );

  describe('when rendering component', () => {
    beforeEach(
      async () => await act(async () => renderComponent() && undefined)
    );

    it('should render empty div', () =>
      expect(document.body.getElementsByTagName('div').item(0)?.innerHTML).toBe(
        ''
      ));
  });

  describe('when account is connected', () => {
    beforeEach(
      async () =>
        await act(async () => {
          mockAccount.isConnected = true;
          renderComponent();
        })
    );

    it('should render error message', () =>
      expect(screen.getByText(unsupportedChainErrorMsg)).toBeTruthy());

    afterEach(() => {
      mockAccount.isConnected = false;
    });
  });

  describe('when account is connected and chain is supported', () => {
    beforeEach(
      async () =>
        await act(async () => {
          mockAccount.isConnected = true;
          mockNetwork.chain.unsupported = false;
          renderComponent();
        })
    );

    it('should render search input', () =>
      expect(
        screen.getByPlaceholderText(searchTokensPlaceHolder)
      ).toBeTruthy());

    it('should render list with correct height', () =>
      expect(
        screen
          .getByTestId('assets-balance-list')
          .getElementsByClassName('rc-virtual-list-holder')
          .item(0)
          ?.getAttribute('style')
      ).toContain(
        `height: ${itemHeight * mockConnectWalletContext.itemsToShow}px`
      ));

    afterEach(() => {
      mockAccount.isConnected = false;
      mockNetwork.chain.unsupported = true;
    });
  });
});
