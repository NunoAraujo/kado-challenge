import { Button } from 'antd';

export interface ConnectButtonProps {
  openConnectModal: () => void;
}

export function ConnectButton({ openConnectModal }: ConnectButtonProps) {
  return (
    <Button
      type="primary"
      size="large"
      shape="round"
      onClick={openConnectModal}
    >
      Connect Wallet
    </Button>
  );
}

export default ConnectButton;