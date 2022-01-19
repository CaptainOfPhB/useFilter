import React from 'react';
import type { ReactNode } from 'react';
import { Select, SelectProps } from 'antd';
import Field, { FieldProps } from '../Field';

type MutexKeys = 'notFoundContent' | 'disabled' | 'placeholder' | 'onChange' | 'allowClear' | 'labelInValue';

export interface Option {
  label: ReactNode;
  value: number | string | boolean;
}

export interface MutexProps<V> extends Pick<SelectProps<V>, MutexKeys> {
  positive: Option;
  negative: Option;
}

function Mutex<V>(props: MutexProps<V> & FieldProps) {
  return (
    <Field {...props}>
      <Select<V>
        disabled={props.disabled}
        onChange={props.onChange}
        allowClear={props.allowClear}
        placeholder={props.placeholder}
        labelInValue={props.labelInValue}
        notFoundContent={props.notFoundContent}
      >
        <Select.Option value={props.positive.value}>{props.positive.label}</Select.Option>
        <Select.Option value={props.negative.value}>{props.negative.label}</Select.Option>
      </Select>
    </Field>
  );
}

export default Mutex;
