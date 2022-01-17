import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import Numeric from './index';
import F from '../Filter';

test('should render to screen', () => {
  const { result } = renderHook(() => F.useFilter());
  const { Filter } = result.current;

  const label = 'numeric label';

  render(
    <Filter>
      <Numeric label={label} rest={{ controls: true }} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
