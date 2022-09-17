import { Avatar, List, Skeleton, Statistic, Typography } from 'antd';
import { forwardRef } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Token } from '../tokens';

export const itemHeight = 88.71;

export interface TokenListItemProps {
  token?: Token;
}

export const TokenListItem = forwardRef(
  ({ token }: TokenListItemProps, ref) => {
    const { address } = useAccount();
    const { data } = useBalance({
      addressOrName: address,
      token: token?.address,
    });

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
            title="Balance"
            valueRender={() => (
              <Typography.Text
                ellipsis={{ tooltip: { title: data?.formatted } }}
              >
                {data?.formatted || '0.0'}
              </Typography.Text>
            )}
            style={{ textAlign: 'end' }}
          />
        </div>
      </List.Item>
    ) : (
      <List.Item data-testid="token-list-item-skeleton" style={{height: itemHeight + 'px'}}>
        <Skeleton avatar paragraph={{ rows: 0 }} active />
      </List.Item>
    );
  }
);

export default TokenListItem;
