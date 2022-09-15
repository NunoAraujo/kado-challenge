import { useCallback } from 'react';

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: string;
  logoURI: string | null;
  coingeckoId?: string | null;
  listedIn?: string[];
  extensions?: { [key: string]: string };
}

const TOKEN_LISTS = {
  Ethereum:
    'https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/ethereum.json',
  Polygon:
    'https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/polygon.json',
  Optimism: 'https://static.optimism.io/optimism.tokenlist.json',
} as { [key: string]: string };

export default function useTokens() {
  const getTokens = useCallback(async (chain: string): Promise<Token[]> => {
    const tokenSource = TOKEN_LISTS[chain];
    const res = await fetch(tokenSource);
    const json = await res.json();

    return json.tokens || json;
  }, []);

  return { getTokens, tokensList: TOKEN_LISTS };
}
