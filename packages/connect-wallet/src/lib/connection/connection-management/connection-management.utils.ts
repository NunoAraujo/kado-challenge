import { screen } from '@testing-library/react';

export const getChainButton = () => screen.getByTestId('chain-btn');
export const getAccountButton = () => screen.getByTestId('account-btn');