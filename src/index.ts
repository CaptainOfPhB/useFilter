import { FormItemProps } from 'antd';

export { default as Text } from './Text';
export { default as Numeric } from './Numeric';

import useFilter from './useFilter';
export default useFilter;

type FieldKeys = 'rules' | 'name' | 'initialValue' | 'required' | 'extra' | 'label' | 'tooltip' | 'normalize';

export type FieldProps<V = unknown> = PruneProps<FormItemProps<V>, FieldKeys, 'fields'> & {
  span?: number;
};

export type PruneProps<T, K extends keyof T, E extends string> = { [X in K]: T[X] } & { [Y in E]?: Omit<T, K> };
