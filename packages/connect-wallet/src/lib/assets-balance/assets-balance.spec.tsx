import { render } from '@testing-library/react';

import AssetsBalance from './assets-balance';

describe('AssetsBalance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AssetsBalance />);
    expect(baseElement).toBeTruthy();
  });
});
