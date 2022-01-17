import useFilter, { FilterHandler, FilterProps } from './useFilter';
import React, { Ref, forwardRef, useImperativeHandle } from 'react';

function Filter<V>(props: FilterProps<V>, ref: Ref<FilterHandler>) {
  const { Filter, ...rest } = useFilter<V>();
  useImperativeHandle(ref, () => rest);
  return <Filter {...props} />;
}

const forwardFilter = forwardRef<FilterHandler, FilterProps>(Filter);

type FilterType = typeof forwardFilter;

export interface FilterInstance extends FilterType {
  useFilter: typeof useFilter;
}

const _Filter = forwardFilter as FilterInstance;

_Filter.useFilter = useFilter;

export default _Filter;
