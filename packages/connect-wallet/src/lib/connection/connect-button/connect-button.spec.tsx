import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getConnectButton } from './connect-button.utils';

import ConnectButton from './connect-button';

describe('ConnectButton', () => {
  const openConnectModal = jest.fn();
  const renderComponent = () =>
    render(<ConnectButton {...{ openConnectModal }} />);

  describe('when clicking connect button', () => {
    beforeEach(async () => {
      renderComponent();
      await userEvent.click(getConnectButton());
    });
    it('should trigger "openConnectModal"', () =>
      expect(openConnectModal).toBeCalledTimes(1));
  });
});
