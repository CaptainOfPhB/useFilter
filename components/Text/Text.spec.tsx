import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import Text from './index';
import useFilter from '../Filter/useFilter';

test('should render to screen', () => {
  const label = 'text label';
  const { result } = renderHook(() => useFilter());
  const { Filter } = result.current;

  render(
    <Filter>
      <Text label={label} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
