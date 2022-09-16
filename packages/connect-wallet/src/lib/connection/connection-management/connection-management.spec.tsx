import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConnectionManagement, {
  ConnectionManagementProps,
} from './connection-management';
import {
  getAccountButton,
  getChainButton,
} from './connection-management.utils';

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

describe('ConnectButton', () => {
  const account = {
    address: 'mockaddress',
  } as ConnectionManagementProps['account'];
  const chain = { name: 'TestChain' } as ConnectionManagementProps['chain'];
  const openChainModal = jest.fn();
  const openAccountModal = jest.fn();
  const renderComponent = () =>
    render(
      <ConnectionManagement
        {...{ account, chain, openChainModal, openAccountModal }}
      />
    );

  describe('when rendering component', () => {
    beforeEach(() => renderComponent());
    
    it('should render chain name inside chain button', async () =>
      expect(
        getChainButton().getElementsByTagName('span').item(0)?.innerHTML
      ).toBe(chain.name));

    it('should render account address inside account button', async () =>
      expect(
        getAccountButton().getElementsByTagName('span').item(0)?.innerHTML
      ).toBe(account.address));

    describe('when clicking chain button', () => {
      beforeEach(async () => {
        await userEvent.click(getChainButton());
      });
      it('should trigger "openChainModal"', () =>
        expect(openChainModal).toBeCalledTimes(1));
    });

    describe('when clicking account button', () => {
      beforeEach(async () => {
        await userEvent.click(getAccountButton());
      });
      it('should trigger "openAccountModal"', () =>
        expect(openAccountModal).toBeCalledTimes(1));
    });
  });

  describe('when the chain is unsupported', () => {
    beforeEach(() => {
      chain.unsupported = true;
      renderComponent();
    });

    it('should render "Unsupported Chain" inside chain button', async () =>
      expect(
        getChainButton().getElementsByTagName('span').item(0)?.innerHTML
      ).toBe('Unsupported Chain'));

    afterEach(() => {
      chain.unsupported = false;
    });
  });

  describe('when the chain has icon', () => {
    beforeEach(() => {
      chain.hasIcon = true;
      chain.iconUrl = 'https://placeholder.com/50';
      chain.iconBackground = 'rgb(0, 0, 0)';
      renderComponent();
    });

    it('should render chain avatar and chain name inside chain button', async () => {
      const chainBtn = getChainButton();
      const chainAvatar = chainBtn.getElementsByTagName('span').item(0);
      const chainImage = chainAvatar?.getElementsByTagName('img').item(0);

      expect(chainAvatar?.getAttribute('style')).toContain(
        `background: ${chain.iconBackground};`
      );
      expect(chainImage?.getAttribute('src')).toBe(chain.iconUrl);
      expect(chainBtn.getElementsByTagName('span').item(1)?.innerHTML).toBe(
        chain.name
      );
    });
  });
});
