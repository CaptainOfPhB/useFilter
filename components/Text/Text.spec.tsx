import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';

import Text from './index';
import F from '../Filter';

test('should render to screen', () => {
  const { result } = renderHook(() => F.useFilter());
  const { Filter } = result.current;

  const label = 'text label';

  render(
    <Filter>
      <Text label={label} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
