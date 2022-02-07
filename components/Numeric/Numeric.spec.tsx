import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import Numeric from './index';
import useFilter from '../Filter/useFilter';

test('should render to screen', () => {
  const label = 'numeric label';
  const { result } = renderHook(() => useFilter());
  const { Filter } = result.current;

  render(
    <Filter>
      <Numeric label={label} rest={{ controls: true }} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
