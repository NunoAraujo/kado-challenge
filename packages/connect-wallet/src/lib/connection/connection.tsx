import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import ConnectionManagement from './connection-management/connection-management';
import ConnectButton from './connect-button/connect-button';

export function Connection() {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {connected ? (
              <ConnectionManagement
                {...{ account, chain, openChainModal, openAccountModal }}
              />
            ) : (
              <ConnectButton {...{ openConnectModal }} />
            )}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}

export default Connection;
