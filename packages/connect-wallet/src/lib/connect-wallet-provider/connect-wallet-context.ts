import { createContext } from 'react';

export const ConnectWalletContextDefaultValue = {
  condensed: false,
  itemsToShow: 5,
};

export const ConnectWalletContext = createContext(
  ConnectWalletContextDefaultValue
);
