import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getConnectButton } from './connect-button.utils';

import ConnectButton from './connect-button';
import {
  ConnectWalletContext,
  ConnectWalletContextDefaultValue,
} from '../../connect-wallet-provider/connect-wallet-context';

const mockConnectWalletContext = ConnectWalletContextDefaultValue;

describe('ConnectButton', () => {
  const openConnectModal = jest.fn();
  const renderComponent = () =>
    render(
      <ConnectWalletContext.Provider value={mockConnectWalletContext}>
        <ConnectButton {...{ openConnectModal }} />
      </ConnectWalletContext.Provider>
    );

  describe('when rendering', () => {
    beforeEach(() => renderComponent());

    it('should render button with large size', () =>
      expect(getConnectButton().classList).toContain('ant-btn-lg'));

    describe('when clicking connect button', () => {
      beforeEach(async () => await userEvent.click(getConnectButton()));
      it('should trigger "openConnectModal"', () =>
        expect(openConnectModal).toBeCalledTimes(1));
    });
  });

  describe('when condensed', () => {
    beforeEach(() => {
      mockConnectWalletContext.condensed = true;
      renderComponent();
    });

    it('should render button with medium size', () =>
      expect(getConnectButton().classList).not.toContain('ant-btn-lg'));

    afterEach(() => {
      mockConnectWalletContext.condensed = false;
    });
  });
});
