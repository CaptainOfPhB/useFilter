import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';

import Text from './index';
import useFilter from '../useFilter';

test('should render to screen', () => {
  const { result } = renderHook(() => useFilter());
  const { Filter } = result.current;

  const label = 'text label';

  render(
    <Filter>
      <Text label={label} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
