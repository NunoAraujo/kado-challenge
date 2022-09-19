import { Avatar, List, Skeleton, Statistic, Typography } from 'antd';
import { forwardRef, useContext } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ConnectWalletContext } from '../../connect-wallet-provider/connect-wallet-context';
import { Token } from '../tokens';

export const itemHeight = 73;

export interface TokenListItemProps {
  token?: Token;
}

export const TokenListItem = forwardRef(
  ({ token }: TokenListItemProps, ref) => {
    const { address } = useAccount();
    const { data } = useBalance({
      addressOrName: address,
      token:
        token && token.address !== '0x0000000000000000000000000000000000000000'
          ? token.address
          : undefined,
    });
    const { condensed } = useContext(ConnectWalletContext);

    return token ? (
      <List.Item>
        <List.Item.Meta
          data-testid="token-list-item-meta"
          avatar={<Avatar src={token.logoURI} />}
          title={token.symbol}
          description={token.name}
        />
        <div data-testid="token-list-item-data" style={{ maxWidth: '50%' }}>
          <Statistic
            valueRender={() => (
              <Typography.Text
                ellipsis={{ tooltip: { title: data?.formatted } }}
                style={{ fontSize: condensed ? 18 : 24 }}
              >
                {data?.formatted || '0.0'}
              </Typography.Text>
            )}
            style={{ textAlign: 'end' }}
          />
        </div>
      </List.Item>
    ) : (
      <List.Item
        data-testid="token-list-item-skeleton"
        style={{ height: itemHeight + 'px' }}
      >
        <Skeleton avatar paragraph={{ rows: 0 }} active />
      </List.Item>
    );
  }
);

export default TokenListItem;
