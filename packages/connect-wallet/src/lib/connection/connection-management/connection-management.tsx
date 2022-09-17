import { Avatar, Button, Space } from 'antd';

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
  return (
    <Space>
      <Button
        data-testid="chain-btn"
        type="default"
        size="large"
        shape="round"
        icon={
          chain.hasIcon && (
            <Avatar
              size="small"
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
        size="large"
        shape="round"
        onClick={openAccountModal}
      >
        {account.address}
        {account.displayBalance ? ` (${account.displayBalance})` : ''}
      </Button>
    </Space>
  );
}

export default ConnectionManagement;
