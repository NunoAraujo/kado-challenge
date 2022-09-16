import { Avatar, List, Statistic, Typography } from 'antd';
import { forwardRef } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Token } from '../tokens';

export interface TokenListItemProps {
  token: Token;
}

export const TokenListItem = forwardRef(
  ({ token }: TokenListItemProps, ref) => {
    const { address } = useAccount();
    const { data } = useBalance({
      addressOrName: address,
      token: token.address,
    });

    return data ? (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={token.logoURI} />}
          title={token.symbol}
          description={token.name}
        />
        <div style={{maxWidth: '50%'}}>
          <Statistic
            title="Balance"
            value={data.formatted}
            valueRender={() => (
              <Typography.Text
                ellipsis={{ tooltip: { title: data.formatted } }}
              >
                {data.formatted}
              </Typography.Text>
            )}
            style={{ textAlign: 'end' }}
          />
        </div>
      </List.Item>
    ) : null;
  }
);

export default TokenListItem;
