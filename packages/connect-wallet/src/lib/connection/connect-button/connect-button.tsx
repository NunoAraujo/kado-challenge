import { Button } from 'antd';
import { useContext } from 'react';
import { ConnectWalletContext } from '../../connect-wallet-provider/connect-wallet-context';

export interface ConnectButtonProps {
  openConnectModal: () => void;
}

export function ConnectButton({ openConnectModal }: ConnectButtonProps) {
  const { condensed } = useContext(ConnectWalletContext);
  return (
    <Button
      data-testid="connect-btn"
      type="primary"
      size={condensed ? 'middle' : 'large'}
      shape="round"
      onClick={openConnectModal}
    >
      Connect Wallet
    </Button>
  );
}

export default ConnectButton;
