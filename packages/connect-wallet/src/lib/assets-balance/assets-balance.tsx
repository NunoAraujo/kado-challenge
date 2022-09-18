import { Ref, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import TokenListItem, { itemHeight } from './token-list-item/token-list-item';
import VirtualList from 'rc-virtual-list';
import { Alert, Input, InputRef, List, Space } from 'antd';
import { getTokens, Token } from './tokens';
import { ConnectWalletContext } from '../connect-wallet-provider/connect-wallet-context';

const itemsToLoad = 20;

export const unsupportedChainErrorMsg =
  'Unsupported chain. Please select another chain.';
export const searchTokensPlaceHolder = 'Search tokens';

export function AssetsBalance() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { itemsToShow } = useContext(ConnectWalletContext);

  const [tokens, setTokens] = useState<Token[]>();
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [lastIndex, setLastIndex] = useState(itemsToLoad);
  const [filter, setFilter] = useState('');
  const searchInputRef = useRef<InputRef>();

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
    () =>
      filteredTokens
        .slice(0, filteredTokens.length - 1 < lastIndex ? lastIndex : undefined)
        .sort((a, b) => a.symbol.localeCompare(b.symbol)),
    [lastIndex, filteredTokens]
  );

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLElement, UIEvent>) =>
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
        Math.round(itemHeight * itemsToShow) &&
      setLastIndex(data.length + itemsToLoad),
    [data, itemsToShow]
  );

  useEffect(() => {
    (async () => {
      setLoadingTokens(true);
      setTokens(chain ? await getTokens(chain.name) : []);
      setLoadingTokens(false);
    })();
  }, [chain]);

  return isConnected ? (
    <Space direction="vertical" style={{ width: '100%' }}>
      {chain && !chain.unsupported ? (
        <>
          <Input.Search
            ref={searchInputRef as Ref<InputRef>}
            allowClear
            enterButton
            placeholder={searchTokensPlaceHolder}
            onSearch={(value) => setFilter(value)}
          />
          <List data-testid="assets-balance-list">
            {loadingTokens ? (
              Array.from(Array(itemsToShow).keys()).map((item) => (
                <TokenListItem key={item} />
              ))
            ) : (
              <VirtualList
                height={itemHeight * itemsToShow}
                itemKey={(token) => token.address}
                {...{ data, itemHeight, onScroll }}
              >
                {(token) => <TokenListItem {...{ token }} />}
              </VirtualList>
            )}
          </List>
        </>
      ) : (
        <Alert message={unsupportedChainErrorMsg} type="error" showIcon />
      )}
    </Space>
  ) : null;
}

export default AssetsBalance;
