import { render, screen } from '@testing-library/react';
import { Token } from '../tokens';
import TokenListItem from './token-list-item';

const mockData = { formatted: '0.0' };

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('wagmi', () => ({
  useAccount: () => ({}),
  useBalance: () => ({ data: mockData }),
}));

describe('TokenListItem', () => {
  let token: Token | undefined;

  const renderComponent = () => render(<TokenListItem {...{ token }} />);

  describe('when rendering', () => {
    beforeEach(() => renderComponent());

    it('should render skeleton', () =>
      expect(screen.getByTestId('token-list-item-skeleton')).toBeTruthy());
  });

  describe('when token is passed', () => {
    const getListItemMeta = () => screen.getByTestId('token-list-item-meta');
    const getListItemData = () => screen.getByTestId('token-list-item-data');

    beforeEach(() => {
      token = {
        logoURI: 'https://placeholder.com/50',
        symbol: 'TEST',
        name: 'Test Token',
      } as Token;
      renderComponent();
    });

    it('should render token avatar', () =>
      expect(
        getListItemMeta()
          .getElementsByTagName('img')
          .item(0)
          ?.getAttribute('src')
      ).toBe(token?.logoURI));

    it('should render meta info', () => {
      expect(
        getListItemMeta()
          .getElementsByClassName('ant-list-item-meta-title')
          .item(0)?.innerHTML
      ).toBe(token?.symbol);

      expect(
        getListItemMeta()
          .getElementsByClassName('ant-list-item-meta-description')
          .item(0)?.innerHTML
      ).toBe(token?.name);
    });

    it('should render formatted balance', () =>
      expect(
        getListItemData().getElementsByClassName('ant-typography').item(0)
          ?.innerHTML
      ).toBe(mockData.formatted));

    afterEach(() => {
      token = undefined;
    });
  });
});
