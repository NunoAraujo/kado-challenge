import {
  Ref,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAccount, useNetwork } from 'wagmi';
import TokenListItem, { itemHeight } from './token-list-item/token-list-item';
import VirtualList from 'rc-virtual-list';
import { Alert, AutoComplete, Input, InputRef, List, Space } from 'antd';
import { getTokens, Token } from './tokens';
import { ConnectWalletContext } from '../connect-wallet-provider/connect-wallet-context';

export const unsupportedChainErrorMsg =
  'Unsupported chain. Please select another chain.';
export const searchTokensPlaceHolder = 'Search tokens';

export function AssetsBalance() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { itemsToShow } = useContext(ConnectWalletContext);

  const [tokens, setTokens] = useState<Token[]>();
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [filter, setFilter] = useState('');
  const searchInputRef = useRef<InputRef>();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const onSearch = (searchText: string) => {
    setOptions(
      filterTokens(searchText).map((token) => ({
        label: token.symbol,
        value: token.address,
      }))
    );
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const filterTokens = useCallback(
    (value: string) =>
      value === ''
        ? tokens || []
        : tokens?.filter(
            (token) =>
              token.name.toLowerCase().includes(value.toLowerCase()) ||
              token.symbol.toLowerCase().includes(value.toLowerCase()) ||
              token.address.toLowerCase().includes(value.toLowerCase())
          ) || [],
    [tokens]
  );

  const filteredTokens = useMemo(
    () => filterTokens(filter),
    [filter, filterTokens]
  );

  const data = useMemo(
    () => filteredTokens.sort((a, b) => a.symbol.localeCompare(b.symbol)),
    [filteredTokens]
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
          <AutoComplete
            options={options}
            //dropdownMatchSelectWidth={200}
            style={{ width: '100%' }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder={searchTokensPlaceHolder}
          >
            <Input.Search
              ref={searchInputRef as Ref<InputRef>}
              allowClear
              enterButton
              onSearch={(value) => setFilter(value)}
            />
          </AutoComplete>
          <List data-testid="assets-balance-list">
            {loadingTokens ? (
              Array.from(Array(itemsToShow).keys()).map((item) => (
                <TokenListItem key={item} />
              ))
            ) : (
              <VirtualList
                height={itemHeight * itemsToShow}
                itemKey={(token) => token.address}
                {...{ data, itemHeight }}
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
