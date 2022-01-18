import React from 'react';
import { render, screen } from '@testing-library/react';

import Text from './index';
import Filter from '../Filter';

test('should render to screen', () => {
  const label = 'text label';

  render(
    <Filter>
      <Text label={label} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
