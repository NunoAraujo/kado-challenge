import { render } from '@testing-library/react';
import ConnectWalletProvider from '../../connect-wallet-provider/connect-wallet-provider';
import ConnectionManagement, {
  ConnectionManagementProps,
} from './connection-management';

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: jest.fn(),
  },
  getDefaultWallets: jest.fn(() => ({ connectors: [] })),
  RainbowKitProvider: jest.fn(),
}));

describe('ConnectButton', () => {
  const account = {} as ConnectionManagementProps['account'];
  const chain = {} as ConnectionManagementProps['chain'];
  const openChainModal = () => undefined;
  const openAccountModal = () => undefined;

  it('should render successfully', () => {
    const { baseElement } = render(
      <ConnectWalletProvider>
        <ConnectionManagement
          {...{ account, chain, openChainModal, openAccountModal }}
        />
      </ConnectWalletProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
