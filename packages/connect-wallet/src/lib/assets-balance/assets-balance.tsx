import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import TokenListItem from './token-list-item/token-list-item';
import VirtualList from 'rc-virtual-list';
import { Alert, Input, List, Space } from 'antd';
import { getTokens, Token } from './tokens';

const itemHeight = 88.71;
const itemsToShow = 5;
const itemsToLoad = 20;

export function AssetsBalance() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const [tokens, setTokens] = useState<Token[]>();
  const [lastIndex, setLastIndex] = useState(itemsToLoad);
  const [filter, setFilter] = useState('');

  const filteredTokens = useMemo(
    () =>
      filter === ''
        ? tokens || []
        : tokens?.filter(
            (item) =>
              item.name.toLowerCase().includes(filter.toLowerCase()) ||
              item.symbol.toLowerCase().includes(filter.toLowerCase())
          ) || [],
    [filter, tokens]
  );

  const data = useMemo(
    () => filteredTokens.slice(0, lastIndex),
    [lastIndex, filteredTokens]
  );

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLElement, UIEvent>) =>
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
        Math.round(itemHeight * itemsToShow) &&
      setLastIndex(data.length + itemsToLoad),
    [data]
  );

  useEffect(() => {
    setFilter('');
    (async () => {
      setTokens(chain ? await getTokens(chain.name) : []);
    })();
  }, [chain]);

  return isConnected ? (
    <Space direction="vertical" style={{ width: '100%' }}>
      {chain && !chain.unsupported ? (
        <>
          <Input.Search
            allowClear
            enterButton
            placeholder="Search tokens"
            onSearch={(value) => setFilter(value)}
          />
          <List>
            <VirtualList
              data={data}
              height={itemHeight * itemsToShow}
              itemHeight={itemHeight}
              itemKey={(token) => token.address}
              onScroll={onScroll}
            >
              {(token) => <TokenListItem {...{ token }} />}
            </VirtualList>
          </List>
        </>
      ) : (
        <Alert
          message="Unsupported chain. Please select another chain."
          type="error"
          showIcon
        />
      )}
    </Space>
  ) : (
    <div></div>
  );
}

export default AssetsBalance;
