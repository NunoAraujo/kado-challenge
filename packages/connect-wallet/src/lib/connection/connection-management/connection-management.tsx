import { Avatar, Button, Space } from 'antd';
import { useContext } from 'react';
import { ConnectWalletContext } from '../../connect-wallet-provider/connect-wallet-context';

export interface ConnectionManagementProps {
  account: {
    address: string;
    balanceDecimals?: number;
    balanceFormatted?: string;
    balanceSymbol?: string;
    displayBalance?: string;
    displayName: string;
    ensAvatar?: string;
    ensName?: string;
    hasPendingTransactions: boolean;
  };
  chain: {
    hasIcon: boolean;
    iconUrl?: string;
    iconBackground?: string;
    id: number;
    name?: string;
    unsupported?: boolean;
  };
  openChainModal: () => void;
  openAccountModal: () => void;
}

export function ConnectionManagement({
  account,
  chain,
  openChainModal,
  openAccountModal,
}: ConnectionManagementProps) {
  const { condensed } = useContext(ConnectWalletContext);
  return (
    <Space>
      <Button
        data-testid="chain-btn"
        type="default"
        size={condensed ? 'middle' : 'large'}
        shape="round"
        icon={
          chain.hasIcon && (
            <Avatar
              size={condensed ? 18 : 24}
              src={chain.iconUrl}
              alt={chain.name ?? 'Chain icon'}
              style={{
                background: chain.iconBackground,
                marginRight: '0.5rem',
              }}
            />
          )
        }
        onClick={openChainModal}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {chain.unsupported ? 'Unsupported Chain' : chain.name}
      </Button>

      <Button
        data-testid="account-btn"
        type="default"
        size={condensed ? 'middle' : 'large'}
        shape="round"
        onClick={openAccountModal}
      >
        {condensed ? account.displayName : account.address}
        {account.displayBalance ? ` (${account.displayBalance})` : ''}
      </Button>
    </Space>
  );
}

export default ConnectionManagement;
