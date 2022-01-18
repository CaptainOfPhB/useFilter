import React from 'react';
import { render, screen } from '@testing-library/react';

import Numeric from './index';
import Filter from '../Filter';

test('should render to screen', () => {
  const label = 'numeric label';

  render(
    <Filter>
      <Numeric label={label} rest={{ controls: true }} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
