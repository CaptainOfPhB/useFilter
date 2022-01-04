import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import Numeric from './index';
import useFilter from '../useFilter';

test('should render to screen', () => {
  const { result } = renderHook(() => useFilter());
  const { Filter } = result.current;

  const label = 'numeric label';

  render(
    <Filter>
      <Numeric label={label} extras={{ controls: true }} />
    </Filter>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});
