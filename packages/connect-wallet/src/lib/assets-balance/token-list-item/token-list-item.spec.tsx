import { render } from '@testing-library/react';

import TokenListItem from './token-list-item';

describe('TokenListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenListItem />);
    expect(baseElement).toBeTruthy();
  });
});
