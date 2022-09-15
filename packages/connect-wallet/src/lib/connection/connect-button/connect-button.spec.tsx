import { render } from '@testing-library/react';

import ConnectButton from './connect-button';

describe('ConnectButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ConnectButton openConnectModal={() => undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
