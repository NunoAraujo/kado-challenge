import { render } from '@testing-library/react';

import ConnectButton from './connection-management';

describe('ConnectButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConnectButton />);
    expect(baseElement).toBeTruthy();
  });
});
